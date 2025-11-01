import { useState } from 'react';
import { FileText, Sparkles, Crown, Eye } from 'lucide-react';
import axios from 'axios';
import { useAuth, Protect } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [resumePreview, setResumePreview] = useState('');
  const { getToken } = useAuth();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput(file);
      // Create preview URL for PDF
      if (file.type === 'application/pdf') {
        const previewUrl = URL.createObjectURL(file);
        setResumePreview(previewUrl);
      }
      setContent('');
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) {
      toast.error('Please select a resume file first');
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('resume', input);

      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        setContent(data.content);
        toast.success('Resume analyzed successfully!');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 bg-gradient-to-br from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-xs mb-3">
            <Crown className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-yellow-400 font-medium">PREMIUM RESUME REVIEW</span>
          </div>
          <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            AI Resume Review
          </h1>
          <p className="text-sm text-gray-400">
            Get professional resume analysis and feedback
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Left Panel */}
          <div className="space-y-4">
            {/* Upload Resume Card */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Upload Resume</h2>
                  <p className="text-xs text-gray-400">Upload your PDF resume</p>
                </div>
              </div>
              
              <input
                onChange={handleFileChange}
                accept="application/pdf"
                type="file"
                className="w-full p-3 text-sm bg-gray-700/50 border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-500 file:text-black hover:file:bg-yellow-600 transition-all mb-3"
                required
              />
              
              {resumePreview && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="w-4 h-4 text-yellow-400" />
                    <h3 className="text-sm font-medium text-white">Resume Preview</h3>
                  </div>
                  <div className="bg-gray-700/30 rounded-lg p-3 border border-gray-600/30">
                    <div className="flex items-center justify-center gap-2 p-4">
                      <FileText className="w-8 h-8 text-yellow-400" />
                      <div className="text-center">
                        <p className="text-sm text-white font-medium">{input?.name}</p>
                        <p className="text-xs text-gray-400">
                          {(input?.size / 1024 / 1024).toFixed(2)} MB • PDF Document
                        </p>
                      </div>
                    </div>
                    <a
                      href={resumePreview}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 py-2 rounded-lg hover:bg-yellow-500/20 transition-all text-xs mt-2"
                    >
                      <Eye className="w-3 h-3" />
                      View Original PDF
                    </a>
                  </div>
                </div>
              )}
              
              <p className="text-xs text-gray-400 mt-3">
                Supports PDF format only
              </p>
            </div>

            {/* Analyze Button - Now visible for all users */}
            <button
              onClick={onSubmitHandler}
              disabled={loading || !input}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-black font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-t-transparent border-black animate-spin"></div>
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Analyze Resume
                </>
              )}
            </button>
          </div>

          {/* Right Panel */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-yellow-500/20 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Analysis Results</h2>
                  <p className="text-xs text-gray-400">Detailed resume feedback</p>
                </div>
              </div>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full border-2 border-t-transparent border-black animate-spin"></div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Analyzing Your Resume</h3>
                <p className="text-sm text-gray-400 mb-4">We are reviewing your resume, please wait...</p>
                <div className="w-48 bg-gray-700 rounded-full h-1.5 mb-2">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-500 h-1.5 rounded-full animate-pulse w-2/3"></div>
                </div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <div className="text-center">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce mx-auto mb-1"></div>
                    <span>Reading</span>
                  </div>
                  <div className="text-center">
                    <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce mx-auto mb-1 delay-100"></div>
                    <span>Analyzing</span>
                  </div>
                  <div className="text-center">
                    <div className="w-1.5 h-1.5 bg-orange-400 rounded-full animate-bounce mx-auto mb-1 delay-200"></div>
                    <span>Generating</span>
                  </div>
                </div>
              </div>
            ) : !content ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 rounded-lg border border-gray-600 flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">No Analysis Yet</h3>
                <p className="text-xs text-gray-400 text-center max-w-xs">
                  Upload your resume and click "Analyze Resume" to get detailed feedback
                </p>
              </div>
            ) : (
              <div className="max-h-[500px] overflow-y-auto">
                <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                  <div className="text-white">
                    <Markdown
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-white text-lg font-bold mb-3" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-white text-base font-bold mb-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-white text-sm font-bold mb-2" {...props} />,
                        p: ({node, ...props}) => <p className="text-white mb-3 leading-relaxed text-sm" {...props} />,
                        li: ({node, ...props}) => <li className="text-white mb-2 text-sm" {...props} />,
                        strong: ({node, ...props}) => <strong className="text-yellow-300 font-bold" {...props} />,
                        em: ({node, ...props}) => <em className="text-amber-300 italic" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-inside space-y-1" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal list-inside space-y-1" {...props} />,
                      }}
                    >
                      {content}
                    </Markdown>
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

export default ReviewResume;