import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Timer, Trophy, History } from 'lucide-react';
import axiosClient from '../axios-client';

const Contests = () => {
  const [activeTab, setActiveTab] = useState<'ongoing' | 'past'>('ongoing');
  const [contests, setContests] = useState({ ongoing: [], past: [] });
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/contests/list').then((response) => {
      console.log("res", response);
      
      setContests(response);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeTab === 'ongoing'
              ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <Timer className="h-4 w-4" />
            <span>Ongoing Contests</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-6 py-2 rounded-full font-medium transition-all ${
            activeTab === 'past'
              ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center space-x-2">
            <History className="h-4 w-4" />
            <span>Past Contests</span>
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeTab === 'ongoing' && contests.ongoing.length > 0 ? (
          contests.ongoing.map((contest) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={contest.image}
                  alt={contest.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{contest.title}</h3>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-600">{contest.participants} participants</span>
                  <span className="text-pink-500 font-medium">Ends in {contest.endsIn}</span>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => navigate(`/contest/${contest.id}?contestName=${contest.title}`)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    View Contest
                  </button>
                  <button
                    onClick={() => navigate(`/submit?contestId=${contest.id}&contestName=${encodeURIComponent(contest.title)}`)}
                    className="flex-1 px-4 py-2 border-2 border-purple-500 text-purple-500 rounded-full font-medium hover:bg-purple-50 transition-colors"
                  >
                    Join Contest
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        ) : activeTab === 'past' && contests.past.length > 0 ? (
          contests.past.map((contest) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={contest.image}
                  alt={contest.title}
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute top-4 right-4">
                  <Trophy className="h-8 w-8 text-yellow-400" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{contest.title}</h3>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-600">{contest.participants} participants</span>
                  <span className="text-yellow-500 font-medium">Winner: {contest.winner}</span>
                </div>
                <button
                  onClick={() => navigate(`/leaderboard/${contest.id}`)}
                  className="mt-6 w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                >
                  View Results
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-600 col-span-3">No contests available</p>
        )}
      </div>
    </div>
  );
};

export default Contests;