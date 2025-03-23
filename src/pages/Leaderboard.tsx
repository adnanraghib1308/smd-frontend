import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';

const Leaderboard = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const mockBabies = [
    {
      id: 1,
      rank: 1,
      name: "Sophie Anderson",
      age: "8 months",
      votes: 245,
      image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=2940"
    },
    {
      id: 2,
      rank: 2,
      name: "Oliver Smith",
      age: "11 months",
      votes: 198,
      image: "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=2940"
    }
  ];

  const getRankIcon = (rank: number) => {
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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Contest Leaderboard</h1>
        <button
          onClick={() => navigate(`/contest/${contestId}`)}
          className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full font-medium hover:bg-gray-200 transition-colors"
        >
          Back to Contest
        </button>
      </div>

      <div className="space-y-4">
        {mockBabies.map((baby) => (
          <motion.div
            key={baby.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate(`/baby?babyId=${baby.id}&contestId=${contestId}`)}
            className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
          >
            <div className="flex items-center p-4">
              <div className="flex-shrink-0 w-16 flex items-center justify-center">
                {getRankIcon(baby.rank)}
              </div>
              
              <div className="flex-shrink-0">
                <img
                  src={baby.image}
                  alt={baby.name}
                  className="h-16 w-16 rounded-full object-cover"
                />
              </div>
              
              <div className="ml-6 flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{baby.name}</h3>
                <p className="text-gray-600">{baby.age}</p>
              </div>
              
              <div className="flex-shrink-0 ml-6">
                <div className="text-2xl font-bold text-pink-500">{baby.votes}</div>
                <div className="text-sm text-gray-500">votes</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;