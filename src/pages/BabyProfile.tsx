import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Share2, Timer, Check, Trophy } from "lucide-react";
import toast from "react-hot-toast";
import ShareModal from "../components/ShareModal";
import axiosClient from "../axios-client";
import { generateVoteMessage } from "../utils";
import SuccessModal from "../components/SuccessModal";
import { Helmet } from "react-helmet-async";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { logPageView } from "../analytics";

const BabyProfile = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const babyId = searchParams.get("babyId");
  const contestId = searchParams.get("contestId");
  const [babyData, setBabyData] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [shareModel, setShareModal] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [fingerprintId, setFingerprintId] = useState();

  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
    const loadFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprintId(result.visitorId);
    };
    loadFingerprint();
  }, [location]);

  const fetchParticipant = () => {
    axiosClient.get(`/participants/details/${babyId}?fingerprintId=${fingerprintId}`).then((res) => {
      setBabyData(res);
    });
  };
  useEffect(() => {
    if (babyId && fingerprintId) {
      fetchParticipant();
    }
  }, [babyId, fingerprintId]);

  useEffect(() => {
    if (!babyData || !babyData.contestEndDate) return;

    const updateCountdown = () => {
      const now = new Date();
      const timeDiff = new Date(babyData.contestEndDate) - now;
      if (timeDiff <= 0) {
        setTimeRemaining("Contest ended");
        return;
      }
      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      setTimeRemaining(`${days}d ${hours}h remaining`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000 * 60);
    return () => clearInterval(interval);
  }, [babyData]);

  const handleVote = async () => {
    if (babyData && !babyData.isVoted) {
      await axiosClient.post("/vote", {
        participantId: parseInt(babyId),
        fingerprintId,
      });
      setSuccessModalOpen(true);
      fetchParticipant();
    }
  };

  const handleShare = () => {
    setShareModal(true);
  };

  if (!babyData) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Helmet>
        <meta property="og:title" content={babyData.contestName} />
        <meta property="og:description" content="Join the cutest baby contest and vote for your favorite!" />
        <meta property="og:image" content={babyData.image} />
        <meta property="og:site_name" content="Supr Mommy Daddy" />
      </Helmet>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <motion.h1
          className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text animate-fadeIn"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {babyData.contestName || "Baby Contest"}
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
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2 relative">
            <img src={babyData.image} alt={babyData.name} className="h-full w-full object-cover md:h-full md:w-full" />
          </div>

          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="uppercase tracking-wide text-sm text-pink-500 font-semibold">{babyData.contestName}</div>
              <h1 className="mt-2 text-3xl font-bold text-gray-800">{babyData.name}</h1>
              <p className="mt-1 text-gray-600">
                {babyData.age} | {babyData.gender}
              </p>

              <div className="mt-4 text-gray-700 space-y-2">
                <p>
                  <strong>Position:</strong> #{babyData.position}
                </p>
                <p className="flex items-center space-x-2">
                  <Timer className="h-5 w-5 text-red-500" />
                  <span>{timeRemaining}</span>
                </p>
              </div>

              <div className="mt-6 text-2xl font-bold text-pink-500">{babyData.votes} votes</div>
            </div>

            <div className="mt-6 flex flex-col space-y-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleVote}
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center space-x-2 shadow-lg"
              >
                {babyData.isVoted ? <Check className="h-6 w-6" /> : <Heart className="h-5 w-5" />}
                {babyData.isVoted ? <span>Voted</span> : <span>Vote</span>}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="w-full px-6 py-3 border-2 border-purple-500 text-purple-500 rounded-full font-medium hover:bg-purple-50 transition-colors flex items-center justify-center space-x-2 shadow-md"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </motion.button>
              <button
                onClick={() => navigate(`/contest/${contestId}`)}
                className="mt-2 w-full px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors"
              >
                Back to Contest
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {shareModel && (
        <ShareModal
          isOpen={shareModel}
          onClose={() => setShareModal(false)}
          shareUrl={`${window.location.origin}/baby?babyId=${babyId}&contestId=${contestId}`}
          message={generateVoteMessage(
            babyData.name,
            babyData.contestName,
            "Supr Mommy Daddy",
            `${window.location.origin}/baby?babyId=${babyId}&contestId=${contestId}`
          )}
        />
      )}
      {successModalOpen && <SuccessModal isOpen={successModalOpen} onClose={() => setSuccessModalOpen(false)} babyName={babyData.name} />}
    </div>
  );
};

export default BabyProfile;
