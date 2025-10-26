import { useState } from 'react';
import { Eraser, Sparkles, Crown, Download, CheckCircle, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import { useAuth, Protect } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const { getToken } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
      // Create preview URL for the uploaded image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) {
      toast.error('Please select an image first');
      return;
    }
    
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', input);

      const { data } = await axios.post(
        '/api/ai/remove-image-background',
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (data.success) {
        setContent(data.content);
        setDownloaded(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(content);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `background-removed-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setDownloaded(true);
      toast.success('Image downloaded successfully!');
      setTimeout(() => setDownloaded(false), 2000);
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-xs mb-3">
            <Crown className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-medium">PREMIUM BACKGROUND REMOVAL</span>
          </div>
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Background Removal
          </h1>
          <p className="text-sm text-gray-400">
            Remove backgrounds from images with AI
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Left Panel */}
          <div className="space-y-4">
            {/* Upload Image Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Upload Image</h2>
                  <p className="text-xs text-gray-400">Select image to process</p>
                </div>
              </div>
              
              {/* File Input */}
              <input
                onChange={handleFileChange}
                accept="image/*"
                type="file"
                className="w-full p-3 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 transition-all mb-3"
                required
              />
              
              {/* Uploaded Image Preview */}
              {imagePreview && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-yellow-400" />
                    <h3 className="text-sm font-medium text-white">Uploaded Image Preview</h3>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
                    <img 
                      src={imagePreview} 
                      alt="Uploaded preview" 
                      className="w-full h-auto rounded-lg max-h-40 object-contain mx-auto"
                    />
                    <p className="text-xs text-gray-400 text-center mt-2">
                      {input?.name} ({(input?.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-400 mt-3">
                Supports JPG, PNG and other image formats
              </p>
            </div>

            {/* Remove Background Button */}
            <Protect
              plan="premium"
              fallback={
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
                  <div className="flex items-center gap-3">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <div>
                      <h3 className="text-sm font-semibold text-white">Premium Feature</h3>
                      <p className="text-xs text-gray-400">Upgrade to unlock</p>
                    </div>
                  </div>
                </div>
              }
            >
              <button
                type="submit"
                onClick={onSubmitHandler}
                disabled={loading || !input}
                className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-black animate-spin"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Eraser className="w-4 h-4" />
                    Remove Background
                  </>
                )}
              </button>
            </Protect>
          </div>

          {/* Right Panel */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Eraser className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Processed Image</h2>
                  <p className="text-xs text-gray-400">Background removed result</p>
                </div>
              </div>
              
              {content && (
                <button
                  onClick={downloadImage}
                  className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 rounded-lg hover:bg-yellow-500/20 transition-all text-xs"
                >
                  {downloaded ? (
                    <CheckCircle className="w-3 h-3 text-green-400" />
                  ) : (
                    <Download className="w-3 h-3" />
                  )}
                  {downloaded ? 'Downloaded!' : 'Download'}
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full border-2 border-t-transparent border-black animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Removing Background</h3>
                <p className="text-sm text-gray-400 mb-4">We are processing your image, please wait...</p>
                <div className="w-48 bg-gray-700 rounded-full h-1.5 mb-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-1.5 rounded-full animate-pulse w-2/3"></div>
                </div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <div className="text-center">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce mx-auto mb-1"></div>
                    <span>Uploading</span>
                  </div>
                  <div className="text-center">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce mx-auto mb-1 delay-100"></div>
                    <span>Processing</span>
                  </div>
                  <div className="text-center">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce mx-auto mb-1 delay-200"></div>
                    <span>Finalizing</span>
                  </div>
                </div>
              </div>
            ) : !content ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-lg border border-gray-600 flex items-center justify-center mb-4">
                  <EyeOff className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">No Image Processed</h3>
                <p className="text-xs text-gray-400 text-center max-w-xs">
                  Upload an image and click "Remove Background" to see the result
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Before/After Comparison */}
                {imagePreview && (
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center mb-2">
                        <Eye className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-400">Original</span>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-2 border border-gray-600/30">
                        <img 
                          src={imagePreview} 
                          alt="Original" 
                          className="w-full h-auto rounded max-h-32 object-contain mx-auto"
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 justify-center mb-2">
                        <Eraser className="w-3 h-3 text-green-400" />
                        <span className="text-xs text-green-400">Processed</span>
                      </div>
                      <div className="bg-gray-700/30 rounded-lg p-2 border border-green-500/30">
                        <img 
                          src={content} 
                          alt="Background removed" 
                          className="w-full h-auto rounded max-h-32 object-contain mx-auto"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Full Size Processed Image */}
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                  <img 
                    src={content} 
                    alt="Background removed" 
                    className="w-full h-auto rounded-lg max-h-80 object-contain mx-auto"
                  />
                </div>
                
                {/* Image Info */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-center p-2 bg-gray-700/30 rounded border border-gray-600/30">
                    <div className="text-sm font-bold text-yellow-400">Background Removed</div>
                    <div className="text-xs text-gray-400">Status</div>
                  </div>
                  <div className="text-center p-2 bg-gray-700/30 rounded border border-gray-600/30">
                    <div className="text-sm font-bold text-yellow-400">AI</div>
                    <div className="text-xs text-gray-400">Processed</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBackground;