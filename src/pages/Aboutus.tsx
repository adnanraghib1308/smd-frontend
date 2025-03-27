import React, { useEffect } from "react";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { logPageView } from "../analytics";

const AboutUs = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-pink-500">About Supr Mommy Daddy</h1>
      <p className="mt-4 text-gray-600 text-lg">
        Welcome to <span className="text-pink-500 font-semibold">Supr Mommy Daddy</span>, the cutest platform where baby contests bring joy to
        families and spread smiles worldwide! 🌎✨
      </p>

      {/* Image Section */}
      <div className="mt-6 flex justify-center">
        <img src="/baby.jpeg" alt="Cute Baby" className="h-40 w-auto rounded-xl shadow-lg" />
      </div>

      {/* Contest Details */}
      <motion.div whileHover={{ scale: 1.05 }} className="mt-8 bg-white p-6 rounded-xl shadow-md backdrop-blur-md bg-opacity-80">
        <h2 className="text-2xl font-semibold text-gray-800">How Our Baby Contest Works?</h2>
        <p className="mt-3 text-gray-600">
          ✨ Upload your baby's cutest photo 📸 ✨ Share the unique contest link with friends & family ✨ Each person can vote only once 🗳️ ✨ Top 3
          winners receive amazing gifts! 🎁🎉
        </p>
      </motion.div>

      {/* Gifts Description */}
      <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800">🎁 Prizes for Winners</h2>
        <ul className="mt-4 text-gray-600 space-y-3">
          <li>🥇 1st Prize – A premium baby care gift hamper 🍼🎀</li>
          <li>🥈 2nd Prize – A personalized baby outfit 👶👕</li>
          <li>🥉 3rd Prize – A cute soft toy & goodies 🧸🎊</li>
        </ul>
      </div>

      {/* Instagram Follow Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800">Follow Us on Instagram! 📸</h2>
        <p className="mt-2 text-gray-600">Stay updated with our latest contests, winners & adorable baby moments. 💕</p>

        <a
          href="https://www.instagram.com/suprmommydaddy"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 transition"
        >
          <Instagram className="h-6 w-6" />
          <span>@suprmommydaddy</span>
        </a>
      </div>
    </div>
  );
};

export default AboutUs;
