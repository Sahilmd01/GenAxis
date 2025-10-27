import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Heart, Crown, Users, Eye, X, Download, Share2, ChevronLeft, ChevronRight, User, Clock } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user: currentUser } = useUser();
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const [selectedCreation, setSelectedCreation] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchCreations = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/user/get-published-creations', {
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

  const imageLikeToggle = async (creationId) => {
    // Find the creation to get current state
    const creation = creations.find(c => c.id === creationId);
    if (!creation) return;

    const wasLiked = creation.likes.includes(currentUser?.id);
    const currentLikeCount = creation.likes.length;

    // Optimistic update - update local state immediately
    setCreations(prevCreations => 
      prevCreations.map(creation => {
        if (creation.id === creationId) {
          if (wasLiked) {
            // Remove like
            return {
              ...creation,
              likes: creation.likes.filter(id => id !== currentUser?.id)
            };
          } else {
            // Add like
            return {
              ...creation,
              likes: [...creation.likes, currentUser?.id]
            };
          }
        }
        return creation;
      })
    );

    // Also update selected creation if it's the one being liked
    if (selectedCreation && selectedCreation.id === creationId) {
      setSelectedCreation(prev => {
        if (!prev) return prev;
        if (wasLiked) {
          return {
            ...prev,
            likes: prev.likes.filter(id => id !== currentUser?.id)
          };
        } else {
          return {
            ...prev,
            likes: [...prev.likes, currentUser?.id]
          };
        }
      });
    }

    try {
      await axios.post('/api/user/toggle-like-creation', { id: creationId }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      // No need to refetch - we've already updated locally
    } catch (error) {
      // Revert optimistic update on error
      setCreations(prevCreations => 
        prevCreations.map(creation => {
          if (creation.id === creationId) {
            return {
              ...creation,
              likes: creation.likes // revert to original
            };
          }
          return creation;
        })
      );
      
      if (selectedCreation && selectedCreation.id === creationId) {
        setSelectedCreation(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            likes: creation.likes // revert to original
          };
        });
      }
      
      toast.error('Failed to update like');
    }
  };

  const openFullscreen = (creation, index) => {
    setSelectedCreation(creation);
    setCurrentIndex(index);
  };

  const closeFullscreen = () => {
    setSelectedCreation(null);
    setCurrentIndex(0);
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % creations.length;
    } else {
      newIndex = (currentIndex - 1 + creations.length) % creations.length;
    }
    setCurrentIndex(newIndex);
    setSelectedCreation(creations[newIndex]);
  };

  const downloadImage = async (imageUrl, filename) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename || 'ai-creation.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Image downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const shareImage = async () => {
    if (navigator.share) {
      try {
        const response = await fetch(selectedCreation.content);
        const blob = await response.blob();
        const file = new File([blob], 'ai-creation.jpg', { type: 'image/jpeg' });
        
        await navigator.share({
          title: 'AI Creation',
          text: selectedCreation.prompt,
          files: [file],
        });
      } catch (error) {
        console.log('Sharing failed:', error);
      }
    } else {
      navigator.clipboard.writeText(selectedCreation.content);
      toast.success('Image URL copied to clipboard!');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedCreation) return;
      
      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          navigateImage('prev');
          break;
        case 'ArrowRight':
          navigateImage('next');
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCreation, currentIndex]);

  useEffect(() => {
    if (currentUser) {
      fetchCreations();
    }
  }, [currentUser]);

  if (loading) {
    return (
      <div className="h-full overflow-y-scroll p-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-4">
              <div className="w-6 h-6 rounded-full border-2 border-t-transparent border-black animate-spin"></div>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Loading Community</h3>
            <p className="text-sm text-gray-400">Fetching amazing creations from the community...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-full overflow-y-scroll p-6 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-xs mb-3">
              <Users className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span className="text-yellow-400 font-medium">COMMUNITY GALLERY</span>
            </div>
            <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              AI Creations Gallery
            </h1>
            <p className="text-sm text-gray-400">
              Discover and interact with amazing AI-generated content from our community
            </p>
          </div>

          {/* Creations Grid */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                <Eye className="w-5 h-5 text-black" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white">Community Creations</h2>
                <p className="text-xs text-gray-400">{creations.length} amazing creations</p>
              </div>
            </div>

            {creations.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-lg border border-gray-600 flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">No Creations Yet</h3>
                <p className="text-xs text-gray-400 text-center max-w-xs">
                  Be the first to share your AI creations with the community!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {creations.map((creation, index) => (
                  <div
                    key={creation.id}
                    className="group relative bg-gradient-to-br from-gray-700/50 to-gray-800/50 rounded-xl border border-gray-600/30 overflow-hidden hover:border-yellow-500/30 transition-all duration-300 cursor-pointer"
                    onClick={() => openFullscreen(creation, index)}
                  >
                    <img
                      src={creation.content}
                      alt="AI creation"
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-xs text-white mb-2 line-clamp-2">
                          {creation.prompt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div 
                            className="flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Heart
                              onClick={() => imageLikeToggle(creation.id)}
                              className={`w-4 h-4 hover:scale-110 cursor-pointer transition-all ${
                                creation.likes.includes(currentUser?.id)
                                  ? 'fill-red-500 text-red-600'
                                  : 'text-white hover:text-red-400'
                              }`}
                            />
                            <span className="text-xs text-white">
                              {creation.likes.length}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 text-xs text-gray-300">
                              <User className="w-3 h-3" />
                              {creation.user?.firstName || 'Anonymous'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Always visible info */}
                    <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full p-1">
                      <div className="flex items-center gap-1 px-2 py-1">
                        <Heart
                          className={`w-3 h-3 ${
                            creation.likes.includes(currentUser?.id)
                              ? 'fill-red-500 text-red-600'
                              : 'text-white'
                          }`}
                        />
                        <span className="text-xs text-white">{creation.likes.length}</span>
                      </div>
                    </div>

                    {/* Creator badge */}
                    <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-white">
                          {creation.user?.firstName || 'Anonymous'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Card */}
          <div className="mt-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-yellow-400" />
              <div>
                <h3 className="text-sm font-semibold text-white">Community Guidelines</h3>
                <p className="text-xs text-gray-400">
                  Click on any creation to view it in full screen. Like creations you enjoy!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {selectedCreation && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeFullscreen}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 border border-gray-600/50 rounded-full flex items-center justify-center text-white hover:text-yellow-400 transition-all duration-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Buttons */}
            {creations.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 border border-gray-600/50 rounded-full flex items-center justify-center text-white hover:text-yellow-400 transition-all duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 border border-gray-600/50 rounded-full flex items-center justify-center text-white hover:text-yellow-400 transition-all duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Image Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={selectedCreation.content}
                alt="AI creation"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                <div className="max-w-4xl mx-auto">
                  {/* Creator Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">
                        {selectedCreation.user?.firstName || 'Anonymous'}
                      </p>
                      <p className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatDate(selectedCreation.createdAt)}
                      </p>
                    </div>
                  </div>

                  <p className="text-white text-lg mb-3">{selectedCreation.prompt}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Heart
                          onClick={() => imageLikeToggle(selectedCreation.id)}
                          className={`w-6 h-6 hover:scale-110 cursor-pointer transition-all ${
                            selectedCreation.likes.includes(currentUser?.id)
                              ? 'fill-red-500 text-red-600'
                              : 'text-white hover:text-red-400'
                          }`}
                        />
                        <span className="text-white text-sm">
                          {selectedCreation.likes.length} likes
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => downloadImage(selectedCreation.content, `ai-creation-${currentIndex + 1}.jpg`)}
                        className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold rounded-lg transition-all flex items-center gap-2 text-xs"
                      >
                        <Download className="w-3 h-3" />
                        Download
                      </button>
                      <button
                        onClick={shareImage}
                        className="px-3 py-1 bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-semibold rounded-lg transition-all flex items-center gap-2 text-xs"
                      >
                        <Share2 className="w-3 h-3" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Community;