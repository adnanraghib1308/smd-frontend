import { Clock } from "lucide-react";
import Countdown from "react-countdown";
import { motion } from "framer-motion";

// Countdown Timer Renderer
const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
  if (completed) {
    return <p className="text-green-600 font-bold text-lg">Contest has started!</p>;
  } else {
    return (
      <div className="text-center text-lg font-semibold text-gray-700">
        Starts in:{" "}
        <span className="text-purple-500 font-bold text-xl">
          {days}d {hours}h {minutes}m {seconds}s
        </span>
      </div>
    );
  }
};

const ContestCountdown = ({ startDate }) => {
  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg p-6 mt-3 flex items-center space-x-4 border-l-4 border-purple-500"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Clock className="text-purple-500 h-10 w-10" />
      <div>
        <h2 className="text-xl font-bold text-gray-800">Contest Not Started:</h2>
        {startDate && <Countdown date={new Date(startDate)} renderer={countdownRenderer} />}
      </div>
    </motion.div>
  );
};

export default ContestCountdown;
