import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, Clock, ArrowLeft } from "lucide-react";
import axiosClient from "../axios-client";

const Leaderboard = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const contestEndTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000; // Mock 7-day countdown

  const [timeLeft, setTimeLeft] = useState(contestEndTime - new Date().getTime());
  const [babies, setBabies] = useState([]);
  const [contestDetail, setContestDetail] = useState();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await axiosClient.get(`/participants/leaderboard/${contestId}`);
      setBabies(response.leaderboard);
      setContestDetail(response.contest);
    };
    fetchLeaderboard();
  }, [contestId]);

  useEffect(() => {
    if(contestDetail && contestDetail.endDate) {
      const ed = new Date(contestDetail.endDate)
      const timer = setInterval(() => {
      setTimeLeft(ed - new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
    }
  }, [contestDetail]);

  const formatTime = (ms) => {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header with countdown */}
      <div className="flex justify-between items-center mb-6 p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-white">🏆 Contest Leaderboard</h1>
        {contestDetail && contestDetail.status === "active" && <div className="flex items-center text-white">
          <Clock className="h-6 w-6 mr-2" />
          <span className="text-lg font-semibold">{formatTime(timeLeft)}</span>
        </div>}
      </div>

      {/* Back to Contest Button */}
      {<button
        onClick={() => {
          if(contestDetail && contestDetail.status === "active" ) {
            navigate(`/contest/${contestId}`)
          } else {
            navigate('/contests')
          }
        }}
        className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors mb-6"
      >
        <ArrowLeft className="h-5 w-5" /> Back to Contest
      </button>}

      {/* Leaderboard List */}
      <div className="space-y-4">
        {babies.map((baby) => (
          <motion.div
            key={baby.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(`/baby?babyId=${baby.id}&contestId=${contestId}`)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer flex items-center p-4 transition-transform"
          >
            <div className="flex-shrink-0 w-16 flex items-center justify-center">{getRankIcon(baby.rank)}</div>

            <div className="flex-shrink-0">
              <img src={baby.image} alt={baby.name} className="h-16 w-16 rounded-full object-cover" />
            </div>

            <div className="ml-6 flex-1">
              <h3 className="text-xl font-semibold text-gray-800">{baby.name}</h3>
              <p className="text-gray-600">{baby.age}</p>
            </div>

            <div className="flex-shrink-0 ml-6">
              <div className="text-2xl font-bold text-pink-500">{baby.votes}</div>
              <div className="text-sm text-gray-500">votes</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
