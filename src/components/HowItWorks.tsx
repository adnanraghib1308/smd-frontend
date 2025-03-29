import { motion } from "framer-motion";
import { Trophy, Heart, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const HowItWorksCard = ({ contestId, contestName }) => {
  const navigate = useNavigate();
  const steps = [
    {
      Icon: Trophy,
      title: "Join Contests",
      desc: "Enter your baby in our adorable competitions",
      color: "text-yellow-500",
      onClick: () => {
        if (!contestId || !contestName) {
          toast.error("No ongoing contest right now. Check previous contest!!");
          return;
        }
        navigate(`/submit?contestId=${contestId}&contestName=${contestName}`);
      },
    },
    {
      Icon: Heart,
      title: "Vote & Share",
      desc: "Support your favorites and spread the joy",
      color: "text-red-500",
      onClick: () => {
        if (!contestId) {
          toast.error("No ongoing contest right now. Check previous contest!!");
          return;
        }
        navigate(`/contest/${contestId}`);
      },
    },
    {
      Icon: Star,
      title: "About Us",
      desc: "Learn more about us!!",
      color: "text-purple-500",
      onClick: () => {
        navigate(`/about`);
      },
    },
  ];

  return (
    <div className="bg-white p-5 my-5 rounded-xl shadow-xl backdrop-blur-md bg-opacity-80 max-w-3xl mx-auto text-center">
      {/* Steps */}
      <div className=" space-y-6">
        {steps.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="flex items-center justify-between px-6 py-3 bg-gray-150 rounded-lg shadow-sm cursor-pointer hover:bg-gray-300 transition"
            onClick={item.onClick}
          >
            <item.Icon className={`h-8 w-8 ${item.color}`} />
            <div className="text-left flex-1 ml-4">
              <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorksCard;
