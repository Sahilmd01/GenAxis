import React, { useEffect, useState } from 'react';
import { Gem, Sparkles, Crown, MessageSquare } from 'lucide-react';
import { Protect, useUser } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creation, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  const getDashboardData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const handleFeedbackClick = () => {
    navigate('/feedback');
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6 bg-gradient-to-br from-gray-900 to-black">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Here's your creative workspace
          </p>
        </div>
        
        {/* Feedback Button */}
        <button
          onClick={handleFeedbackClick}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30"
        >
          <MessageSquare className="w-4 h-4" />
          Send Feedback
        </button>
      </div>

      {/* Stats Cards */}
      <div className="flex justify-start gap-4 flex-wrap mb-6">
        {/* Total Creations Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 shadow-lg shadow-yellow-500/10">
          <div className="text-gray-300">
            <p className="text-sm">Total Creations:</p>
            <h2 className="text-xl font-semibold text-white">{creation.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 text-white flex justify-center items-center shadow-lg shadow-yellow-500/30">
            <Sparkles className="w-5 text-white drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
          </div>
        </div>

        {/* Active Plan Card */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 shadow-lg shadow-yellow-500/10">
          <div className="text-gray-300">
            <p className="text-sm">Active Plan:</p>
            <h2 className="text-xl font-semibold text-white">
              <Protect plan="premium" fallback={
                <span className="text-gray-400">Free</span>
              }>
                <span className="text-yellow-300">Premium</span>
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 text-white flex justify-center items-center shadow-lg shadow-yellow-500/30">
            <Protect plan="premium" fallback={
              <Gem className="w-5 text-gray-400" />
            }>
              <Crown className="w-5 text-white fill-yellow-300 drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
            </Protect>
          </div>
        </div>

        {/* Feedback Quick Card */}
        <div 
          onClick={handleFeedbackClick}
          className="flex justify-between items-center w-72 p-4 px-6 bg-gradient-to-br from-purple-800/50 to-pink-800/50 rounded-xl border border-purple-500/20 shadow-lg shadow-purple-500/10 cursor-pointer hover:border-purple-400/40 transition-all group"
        >
          <div className="text-gray-300">
            <p className="text-sm">Share Feedback:</p>
            <h2 className="text-xl font-semibold text-white group-hover:text-purple-200 transition-colors">
              Help us improve
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white flex justify-center items-center shadow-lg shadow-purple-500/30 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Recent Creations Section */}
      {!loading ? (
        <div className="space-y-3 mt-6">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold text-yellow-100 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Recent Creations
            </p>
            
            {/* Mobile Feedback Button */}
            <button
              onClick={handleFeedbackClick}
              className="sm:hidden flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Feedback
            </button>
          </div>
          
          {creation.length > 0 ? (
            creation.map((item) => (
              <CreationItem item={item} key={item.id} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Sparkles className="w-16 h-16 mb-4 text-gray-600" />
              <p className="text-lg">No creations yet</p>
              <p className="text-sm mt-2 text-center max-w-md">
                Start creating amazing content with our AI tools! Your creations will appear here.
              </p>
              <button
                onClick={handleFeedbackClick}
                className="mt-4 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all"
              >
                <MessageSquare className="w-4 h-4" />
                Share Your Thoughts
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-yellow-500/30 animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-t-yellow-400 border-transparent animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;