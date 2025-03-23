import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Baby, Trophy, Heart, Star } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="inline-block"
        >
          <Baby className="h-20 w-20 text-pink-500 mx-auto" />
        </motion.div>
        
        <h1 className="mt-6 text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
          Welcome to BabyStars Contest
        </h1>
        
        <p className="mt-4 text-xl text-gray-600">
          Celebrate the cuteness and charm of your little ones!
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-xl"
          >
            <Trophy className="h-12 w-12 text-yellow-500 mx-auto" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Join Contests</h3>
            <p className="mt-2 text-gray-600">Enter your baby in our adorable competitions</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-xl"
          >
            <Heart className="h-12 w-12 text-red-500 mx-auto" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Vote & Share</h3>
            <p className="mt-2 text-gray-600">Support your favorites and spread the joy</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-xl shadow-xl"
          >
            <Star className="h-12 w-12 text-purple-500 mx-auto" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Win Prizes</h3>
            <p className="mt-2 text-gray-600">Amazing rewards for the winning babies</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Fixed View Contest Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/contests')}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all z-50"
      >
        View Contests
      </motion.button>
    </div>
  );
};

export default Home;