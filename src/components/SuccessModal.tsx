import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Instagram } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  babyName: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, babyName }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition">
              <X className="h-5 w-5 text-gray-500" />
            </button>

            {/* Check Icon */}
            <div className="flex justify-center">
              <CheckCircle className="h-20 w-20 text-pink-500" />
            </div>

            {/* Success Message */}
            <h3 className="text-xl font-semibold text-gray-800 mt-4">Vote Successful! 🎉</h3>
            <p className="text-gray-600 mt-2">
              Thank you for voting for <span className="font-bold text-pink-500">{babyName}</span>. Your support means a lot!
            </p>

            {/* Support Message */}
            <p className="text-gray-500 mt-4">Join our community and follow us on Instagram to get update and result of this contest!</p>

            {/* Instagram Button */}
            <button
              onClick={() => window.open("https://www.instagram.com/suprmommydaddy", "_blank")}
              className="mt-4 w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-pink-500 to-red-500 text-white py-2 px-4 rounded-lg font-medium shadow-md hover:opacity-90 transition"
            >
              <Instagram className="h-5 w-5" />
              <span>Follow Us</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
