import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

const BabyProfile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const babyId = searchParams.get('babyId');
  const contestId = searchParams.get('contestId');

  // Mock data - in a real app, this would come from an API
  const babyData = {
    name: "Sophie Anderson",
    age: "8 months",
    votes: 245,
    image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=2940",
    contestName: "Spring Baby Stars 2024"
  };

  const handleVote = () => {
    toast.success('Vote submitted successfully!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <img
              src={babyData.image}
              alt={babyData.name}
              className="h-full w-full object-cover md:h-full md:w-full"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-pink-500 font-semibold">
              {babyData.contestName}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-800">{babyData.name}</h1>
            <p className="mt-2 text-gray-600">{babyData.age}</p>
            
            <div className="mt-8">
              <div className="text-2xl font-bold text-pink-500">{babyData.votes} votes</div>
              <div className="mt-6 flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleVote}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>Vote</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex-1 px-6 py-3 border-2 border-purple-500 text-purple-500 rounded-full font-medium hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </motion.button>
              </div>
              
              <button
                onClick={() => navigate(`/contest/${contestId}`)}
                className="mt-4 w-full px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Back to Contest
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BabyProfile;