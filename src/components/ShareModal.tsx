import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, Instagram } from 'lucide-react';
import { WhatsappShareButton, WhatsappIcon } from 'react-share';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  title: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, shareUrl, title }) => {
  const handleInstagramShare = () => {
    // Open Instagram with pre-filled story
    window.open(`instagram://story-camera`, '_blank');
    // Copy text to clipboard for story
    navigator.clipboard.writeText(`${title}\n${shareUrl}`);
  };

  const handleInstagramFeed = () => {
    window.open(`https://instagram.com`, '_blank');
    navigator.clipboard.writeText(`${title}\n${shareUrl}`);
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
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <WhatsappShareButton
                url={shareUrl}
                title={title}
                className="w-full"
              >
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <WhatsappIcon size={32} round />
                  <span className="text-gray-700">Share on WhatsApp</span>
                </div>
              </WhatsappShareButton>

              <button
                onClick={handleInstagramFeed}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1.5 rounded-full">
                  <Instagram className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-700">Share on Instagram Feed</span>
              </button>

              <button
                onClick={handleInstagramShare}
                className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-1.5 rounded-full">
                  <Share2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-700">Share to Instagram Story</span>
              </button>
            </div>

            <p className="mt-4 text-sm text-gray-500 text-center">
              Link and text will be copied to clipboard for Instagram sharing
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;