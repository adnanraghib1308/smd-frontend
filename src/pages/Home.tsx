import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import HowItWorksCard from "../components/HowItWorks";
import axiosClient from "../axios-client";
import { logPageView } from "../analytics";
import AboutContest from "../components/AboutContet";

const Home = () => {
  const navigate = useNavigate();

  const [contestId, setContestId] = useState<string | undefined>();
  const [contestName, setContestName] = useState<string | undefined>();
  const [contestStatus, setContestStatus] = useState<string | undefined>();

  useEffect(() => {
    (async () => {
      const data: { id: string; name: string; status: string } = await axiosClient.get("/contests/active");
      setContestId(data.id);
      setContestName(data.name);
      setContestStatus(data.status);
    })();
  }, []);

  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-95" style={{ backgroundImage: "url('/background.jpeg')" }}></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Square Poster Image */}
          <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
            <img
              src="/title.jpeg" // Change this to your actual poster image path
              alt="BabyStars Contest Poster"
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto rounded-lg shadow-xl"
            />
          </motion.div>

          <br />
          <HowItWorksCard contestId={contestId} contestName={contestName} contestStatus={contestStatus} />

          <AboutContest contestId={contestId} contestName={contestName} contestStatus={contestStatus} />
        </motion.div>
      </div>

      {/* Fixed View Contest Button */}
      {/* <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/contests")}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all z-50"
      >
        View Contests
      </motion.button> */}
    </div>
  );
};

export default Home;
