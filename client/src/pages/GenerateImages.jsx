import { useState } from 'react';
import { Hash, Image, Sparkles, Crown, Download, CheckCircle } from 'lucide-react';
import axios from 'axios';
import { useAuth, Protect } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {
  const ImageStyle = [
    'Realistic',
    'Ghibli',
    'Anime',
    'Cartoon',
    'Fantasy',
    '3D',
    'Portrait',
  ];

  const [selectedStyle, setSelectedStyle] = useState('Realistic');
  const [input, setInput] = useState('');
  const [publish, setPublish] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) {
      toast.error('Please enter an image description');
      return;
    }

    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;
      const { data } = await axios.post(
        '/api/ai/generate-image',
        { prompt, publish },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );
      
      if (data.success) {
        setContent(data.content);
        setDownloaded(false);
        toast.success('Image generated successfully!');
      } else {
        // Remove the alert and use toast instead
        toast.error(data.message || 'Failed to generate image');
      }
    } catch (error) {
      console.error('Image generation error:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.message) {
        toast.error(error.message);
      } else {
        toast.error('Failed to generate image. Please try again.');
      }
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
      link.download = `ai-generated-image-${Date.now()}.png`;
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
            <span className="text-yellow-400 font-medium">PREMIUM IMAGE GENERATOR</span>
          </div>
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            AI Image Generator
          </h1>
          <p className="text-sm text-gray-400">
            Create stunning images with AI
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Left Panel */}
          <div className="space-y-4">
            {/* Image Description Input */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Describe Your Image</h2>
                  <p className="text-xs text-gray-400">What do you want to see?</p>
                </div>
              </div>
              <textarea
                onChange={(e) => setInput(e.target.value)}
                value={input}
                rows={4}
                className="w-full p-3 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/20 transition-all resize-none"
                placeholder="Describe what you want to see in the image..."
                required
              />
            </div>

            {/* Style Selection */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Image className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Style</h2>
                  <p className="text-xs text-gray-400">Choose image style</p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                {ImageStyle.map((item) => (
                  <span
                    onClick={() => setSelectedStyle(item)}
                    className={`text-xs px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                      selectedStyle === item
                        ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-300'
                        : 'bg-gray-700/30 border-gray-600 text-gray-400 hover:border-yellow-500/30 hover:text-yellow-200'
                    }`}
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Public Toggle */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 flex-1">
                  <label className="relative cursor-pointer">
                    <input
                      className="sr-only peer"
                      type="checkbox"
                      checked={publish}
                      onChange={(e) => setPublish(e.target.checked)}
                    />
                    <div className="w-9 h-5 bg-gray-600 rounded-full peer-checked:bg-yellow-500 transition"></div>
                    <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
                  </label>
                  <div>
                    <p className="text-sm font-medium text-white">Make this image public</p>
                    <p className="text-xs text-gray-400">Share your creation with others</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button - Now visible for all users */}
            <button
              type="submit"
              onClick={onSubmitHandler}
              disabled={loading || !input.trim()}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-black animate-spin"></div>
                  Generating...
                </>
              ) : (
                <>
                  <Image className="w-4 h-4" />
                  Generate Image
                </>
              )}
            </button>
          </div>

          {/* Right Panel */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Image className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Generated Image</h2>
                  <p className="text-xs text-gray-400">AI-powered creation</p>
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
                <h3 className="text-lg font-semibold text-white mb-2">Creating Your Image</h3>
                <p className="text-sm text-gray-400 mb-4">We are generating your image, please wait...</p>
                <div className="w-48 bg-gray-700 rounded-full h-1.5 mb-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-1.5 rounded-full animate-pulse w-2/3"></div>
                </div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <div className="text-center">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce mx-auto mb-1"></div>
                    <span>Processing</span>
                  </div>
                  <div className="text-center">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce mx-auto mb-1 delay-100"></div>
                    <span>Generating</span>
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
                  <Image className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">No Image Generated</h3>
                <p className="text-xs text-gray-400 text-center max-w-xs">
                  Enter a description, select style, and generate your image.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Generated Image */}
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                  <img 
                    src={content} 
                    alt="AI generated" 
                    className="w-full h-auto rounded-lg max-h-80 object-contain"
                  />
                </div>
                
                {/* Image Info */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-gray-700/30 rounded border border-gray-600/30">
                    <div className="text-sm font-bold text-yellow-400">{selectedStyle}</div>
                    <div className="text-xs text-gray-400">Style</div>
                  </div>
                  <div className="text-center p-2 bg-gray-700/30 rounded border border-gray-600/30">
                    <div className="text-sm font-bold text-yellow-400">
                      {publish ? 'Public' : 'Private'}
                    </div>
                    <div className="text-xs text-gray-400">Visibility</div>
                  </div>
                  <div className="text-center p-2 bg-gray-700/30 rounded border border-gray-600/30">
                    <div className="text-sm font-bold text-yellow-400">AI</div>
                    <div className="text-xs text-gray-400">Generated</div>
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

export default GenerateImages;