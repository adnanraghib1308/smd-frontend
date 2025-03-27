import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Instagram } from "lucide-react";
import { WhatsappShareButton, WhatsappIcon, FacebookShareButton, FacebookIcon } from "react-share";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  shareUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, message, shareUrl }) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message);
    alert("Message copied to clipboard!");
  };

  const handleInstagramStoryShare = () => {
    window.open("instagram://story-camera", "_blank");
  };

  const handleInstagramDMShare = () => {
    window.open(`https://www.instagram.com/direct/inbox/`, "_blank");
  };

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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Share</h3>
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Copy to Clipboard */}
              <button
                onClick={handleCopyToClipboard}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Copy className="h-5 w-5 text-gray-700" />
                <span className="text-gray-700">Copy to Clipboard</span>
              </button>

              {/* WhatsApp Share */}
              <WhatsappShareButton url={message} className="w-full">
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <WhatsappIcon size={32} round />
                  <span className="text-gray-700">Share on WhatsApp</span>
                </div>
              </WhatsappShareButton>

              {/* Facebook Share */}
              <FacebookShareButton url={shareUrl} quote={message} className="w-full">
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <FacebookIcon size={32} round />
                  <span className="text-gray-700">Share on Facebook</span>
                </div>
              </FacebookShareButton>

              {/* Instagram Story Share */}
              <button
                onClick={handleInstagramStoryShare}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Instagram className="h-5 w-5 text-pink-500" />
                <span className="text-gray-700">Share on Instagram Story</span>
              </button>

              {/* Instagram DM Share */}
              <button
                onClick={handleInstagramDMShare}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <Instagram className="h-5 w-5 text-pink-500" />
                <span className="text-gray-700">Share via Instagram DM</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;
