import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Share2, Trophy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import ShareModal from '../components/ShareModal';

const ContestDetails = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [votedBabies, setVotedBabies] = useState<number[]>([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedBaby, setSelectedBaby] = useState<any>(null);

  const mockBabies = [
    {
      id: 1,
      name: "Sophie",
      age: "8 months",
      votes: 245,
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=2940"
    },
    {
      id: 2,
      name: "Oliver",
      age: "11 months",
      votes: 198,
      image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=2940"
    }
  ];

  const handleVote = (babyId: number) => {
    if (!votedBabies.includes(babyId)) {
      setVotedBabies([...votedBabies, babyId]);
      toast.success('Vote submitted successfully!');
    }
  };

  const handleShare = (baby: any) => {
    setSelectedBaby(baby);
    setShareModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Spring Baby Stars 2024</h1>
        <button
          onClick={() => navigate(`/leaderboard/${contestId}`)}
          className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
        >
          <Trophy className="h-5 w-5" />
          <span>View Leaderboard</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBabies.map((baby) => (
          <motion.div
            key={baby.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <div className="h-64 overflow-hidden">
              <img
                src={baby.image}
                alt={baby.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">{baby.name}</h3>
              <p className="text-gray-600 mt-1">{baby.age}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-pink-500 font-medium">{baby.votes} votes</span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleVote(baby.id)}
                    disabled={votedBabies.includes(baby.id)}
                    className={`p-2 rounded-full transition-colors ${
                      votedBabies.includes(baby.id)
                        ? 'bg-pink-500 text-white'
                        : 'bg-pink-100 text-pink-500 hover:bg-pink-200'
                    }`}
                  >
                    {votedBabies.includes(baby.id) ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Heart className="h-5 w-5" />
                    )}
                  </button>
                  <button
                    onClick={() => handleShare(baby)}
                    className="p-2 bg-purple-100 text-purple-500 rounded-full hover:bg-purple-200 transition-colors"
                  >
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedBaby && (
        <ShareModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          shareUrl={`${window.location.origin}/baby?babyId=${selectedBaby.id}&contestId=${contestId}`}
          title={`Vote for ${selectedBaby.name} in the Baby Stars Contest! 🌟`}
        />
      )}
    </div>
  );
};

export default ContestDetails;