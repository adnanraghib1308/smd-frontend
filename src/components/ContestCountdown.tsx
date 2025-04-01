import { Clock } from "lucide-react";
import Countdown from "react-countdown";
import { motion } from "framer-motion";

// Countdown Timer Renderer
const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <p className="text-pink-600 font-extrabold text-lg animate-pulse">🎉 Contest has started!</p>;
  } else {
    return (
      <div className="text-center text-lg font-semibold text-gray-800">
        <span className="bg-pink-300 text-white px-4 py-2 rounded-full shadow-md text-xl font-bold">
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      </div>
    );
  }
};

const ContestCountdown = ({ startDate }) => {
  return (
    <motion.div
      className="relative bg-gradient-to-r from-pink-200 to-yellow-100 shadow-lg rounded-3xl p-6 mt-4 flex items-center space-x-6 border-l-8 border-pink-300 overflow-hidden"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Decorative Clouds for a Baby Theme */}
      <div className="absolute inset-0 bg-white opacity-30 blur-3xl rounded-full"></div>

      {/* Clock Icon with Bouncy Animation */}
      <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
        <Clock className="text-pink-500 h-12 w-12" />
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Voting Begins In:</h2>
        {startDate && <Countdown date={new Date(startDate)} renderer={countdownRenderer} />}
      </div>
    </motion.div>
  );
};

export default ContestCountdown;
