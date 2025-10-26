import React, { useEffect, useState } from 'react';
import { Gem, Sparkles, Crown } from 'lucide-react';
import { Protect } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creation, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

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

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6 bg-gradient-to-br from-gray-900 to-black">
      {/* Stats Cards */}
      <div className="flex justify-start gap-4 flex-wrap">
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
      </div>

      {/* Recent Creations Section */}
      {!loading ? (
        <div className="space-y-3 mt-6">
          <p className="text-xl font-semibold text-yellow-100 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Recent Creations
          </p>
          {creation.length > 0 ? (
            creation.map((item) => (
              <CreationItem item={item} key={item.id} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400">
              <Sparkles className="w-16 h-16 mb-4 text-gray-600" />
              <p className="text-lg">No creations yet</p>
              <p className="text-sm mt-2">Start creating amazing content with our AI tools!</p>
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