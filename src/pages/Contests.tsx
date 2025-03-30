import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Timer, Trophy, History } from "lucide-react";
import axiosClient from "../axios-client";
import { logPageView } from "../analytics";
import Countdown from "react-countdown";

const Contests = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "ongoing" | "past">("upcoming");
  const [contests, setContests] = useState({ upcoming: [], ongoing: [], past: [] });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  useEffect(() => {
    axiosClient.get("/contests/list").then((response) => {
      setContests(response);
    });
  }, []);

  const renderer = ({ days, hours, minutes, seconds }) => (
    <span className="font-medium">
      {days}d {hours}h {minutes}m {seconds}s
    </span>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-center space-x-2 mb-6">
        {[
          { key: "upcoming", label: "Upcoming", icon: Timer },
          { key: "ongoing", label: "Ongoing", icon: Timer },
          { key: "past", label: "Past", icon: History },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-2 py-1 text-xs rounded-full font-medium transition-all ${
              activeTab === key ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center space-x-1">
              <Icon className="h-3 w-3" />
              <span>{label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contests[activeTab].length > 0 ? (
          contests[activeTab].map((contest) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="h-48 overflow-hidden">
                <img src={contest.image} alt={contest.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{contest.title}</h3>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-gray-600">{contest.participants} participants</span>
                  <span className={activeTab === "upcoming" ? "text-blue-500 font-medium" : "text-red-500 font-medium"}>
                    {activeTab === "upcoming" ? (
                      <>
                        Starts In: <Countdown date={new Date(contest.startDate)} renderer={renderer} />
                      </>
                    ) : activeTab === "ongoing" ? (
                      <>
                        Ends In: <Countdown date={new Date(contest.endDate)} renderer={renderer} />
                      </>
                    ) : null}
                  </span>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    onClick={() => navigate(`/contest/${contest.id}?contestName=${contest.title}`)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
                  >
                    View Contest
                  </button>
                  {activeTab === "upcoming" && (
                    <button
                      onClick={() => navigate(`/submit?contestId=${contest.id}&contestName=${encodeURIComponent(contest.title)}`)}
                      className="flex-1 px-4 py-2 border-2 border-purple-500 text-purple-500 rounded-full font-medium hover:bg-purple-50 transition-colors"
                    >
                      Join Contest
                    </button>
                  )}
                </div>
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
