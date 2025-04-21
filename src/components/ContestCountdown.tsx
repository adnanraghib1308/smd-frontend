import { Clock } from "lucide-react";
import Countdown from "react-countdown";
import { motion } from "framer-motion";

// Countdown Timer Renderer
const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <p className="text-pink-600 font-semibold text-lg text-center">🎉 Contest has started!</p>;
  } else {
    return (
      <div className="text-center text-base font-medium text-gray-700">
        <span className="bg-pink-100 text-pink-700 px-4 py-1 rounded-full shadow-sm text-lg inline-block">
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      </div>
    );
  }
};

const ContestCountdown = ({ startDate }) => {
  return (
    <motion.div
      className="relative bg-pink-50 border border-pink-200 rounded-2xl p-6 mt-4 flex items-center gap-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Clock Icon on the Left */}
      <div className="flex-shrink-0">
        <Clock className="text-pink-400 h-10 w-10" />
      </div>

      {/* Centered Text Content */}
      <div className="flex-1 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Voting Begins In:</h2>
        {startDate && <Countdown date={new Date(startDate)} renderer={countdownRenderer} />}
      </div>
    </motion.div>
  );
};

export default ContestCountdown;
