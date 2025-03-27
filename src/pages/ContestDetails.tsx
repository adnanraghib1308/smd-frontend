import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Share2, Trophy, Check, Search } from "lucide-react";
import toast from "react-hot-toast";
import ShareModal from "../components/ShareModal";
import axiosClient from "../axios-client";

const ContestDetails = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [votedBabies, setVotedBabies] = useState<number[]>([]);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedBaby, setSelectedBaby] = useState<any>(null);
  const [babies, setBabies] = useState<any[]>([]);
  const [searchParams] = useSearchParams();
  const contestName = searchParams.get('contestName');

  const fetchParticipants = async () => {
    const response = await axiosClient.get(`/participants/${contestId}`);
    setBabies(response);
  };

  useEffect(() => {
    fetchParticipants();
  }, [contestId]);

  const handleVote = async (baby) => {
    if (!baby.isVote) {
      await axiosClient.post('/vote', {
        participantId: baby.id
      })
      toast.success("You have voted successfully!!");
      fetchParticipants();
    }
  };

  const handleShare = (baby: any) => {
    setSelectedBaby(baby);
    setShareModalOpen(true);
  };

  const handleCardClick = (babyId: number) => {
    navigate(`/baby?babyId=${babyId}&contestId=${contestId}`);
  };

  const filteredBabies = babies.filter((baby) => new RegExp(searchQuery, "i").test(baby.name));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <motion.h1
          className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text animate-fadeIn"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {contestName || "Baby Contest"}
        </motion.h1>
        <motion.button
          onClick={() => navigate(`/leaderboard/${contestId}`)}
          className="flex items-center space-x-3 px-6 py-3 mt-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-semibold text-lg shadow-md hover:scale-105 transition-transform"
          whileHover={{ scale: 1.05 }}
        >
          <Trophy className="h-6 w-6" />
          <span>View Leaderboard</span>
        </motion.button>
      </div>

      <div className="relative mb-6 max-w-md mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search babies..."
          className="w-full px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:ring focus:ring-purple-300"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredBabies.length > 0 ? (
          filteredBabies.map((baby) => (
            <motion.div
              key={baby.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all cursor-pointer"
              onClick={() => handleCardClick(baby.id)}
            >
              <div className="h-64 overflow-hidden">
                <img src={baby.image} alt={baby.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{baby.name}</h3>
                <p className="text-gray-600 mt-1">{baby.age}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-pink-500 font-medium">{baby.votes} votes</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleVote(baby);
                      }}
                      disabled={baby.isVote}
                      className={`p-3 rounded-full transition-all ${
                        votedBabies.includes(baby.id) ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-500 hover:bg-pink-200"
                      }`}
                    >
                      {baby.isVote ? <Check className="h-6 w-6" /> : <Heart className="h-6 w-6" />}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleShare(baby);
                      }}
                      className="p-3 bg-purple-100 text-purple-500 rounded-full hover:bg-purple-200 transition-all"
                    >
                      <Share2 className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No babies found.</p>
        )}
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
