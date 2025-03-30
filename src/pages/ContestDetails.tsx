import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Share2, Trophy, Check, Search, ArrowLeft, Clock, Sparkles } from "lucide-react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import ShareModal from "../components/ShareModal";
import SuccessModal from "../components/SuccessModal";
import axiosClient from "../axios-client";
import { generateVoteMessage } from "../utils";
import { logPageView } from "../analytics";
import Countdown from "react-countdown";
import ContestCountdown from "./ContestCountdown";

const ContestDetails = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [selectedBaby, setSelectedBaby] = useState<any>(null);
  const [babies, setBabies] = useState<any[]>([]);
  const [contest, setContest] = useState<any>({});
  const [searchParams] = useSearchParams();
  const [fingerprintId, setFingerprintId] = useState();
  const contestName = searchParams.get("contestName");

  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  const fetchParticipants = async () => {
    const response = await axiosClient.get(`/participants/${contestId}?fingerprintId=${fingerprintId}`);
    setBabies(response.participants);
    setContest(response.contest);
  };

  useEffect(() => {
    if (fingerprintId) fetchParticipants();
  }, [contestId, fingerprintId]);

  useEffect(() => {
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprintId(result.visitorId);
    };
    loadFingerprint();
  }, []);

  const handleVote = async (baby) => {
    if (!baby.isVote) {
      await axiosClient.post("/vote", {
        participantId: baby.id,
        fingerprintId,
      });
      setSelectedBaby(baby);
      setSuccessModalOpen(true);
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
      <button
        onClick={() => navigate(`/contests`)}
        className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" /> Back to Contest
      </button>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <motion.h1
          className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text animate-fadeIn"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {contestName || "Baby Contest"}
        </motion.h1>

        {contest?.status === "active" && (
          <motion.div
            className="bg-yellow-100 border-l-4 border-yellow-500 mt-8 text-yellow-800 p-6 rounded-lg shadow-md flex items-center gap-4 mb-6 animate-bounce"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="text-yellow-600 h-8 w-8 animate-spin" />
            <h2 className="text-lg font-bold">Contest is Live! Vote now and support your favorite baby.</h2>
          </motion.div>
        )}

        {/* Show Leaderboard button if contest is active, otherwise show countdown */}
        {contest?.status === "active" ? (
          <motion.button
            onClick={() => navigate(`/leaderboard/${contestId}`)}
            className="flex items-center space-x-3 px-6 py-3 mt-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-full font-semibold text-lg shadow-md hover:scale-105 transition-transform"
            whileHover={{ scale: 1.05 }}
          >
            <Trophy className="h-6 w-6" />
            <span>View Leaderboard</span>
          </motion.button>
        ) : (
          <ContestCountdown startDate={contest.startDate} />
        )}
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
                      className="p-3 bg-pink-100 text-pink-500 rounded-full hover:bg-pink-200 transition-all"
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
    </div>
  );
};

export default ContestDetails;
