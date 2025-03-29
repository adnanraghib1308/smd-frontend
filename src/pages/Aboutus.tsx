import React, { useEffect } from "react";
import { Instagram } from "lucide-react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { logPageView } from "../analytics";
import AboutSuprMommyDaddy from "../components/AboutSMD";

const AboutUs = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname);
  }, [location]);
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-center">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-pink-500">About Supr Mommy Daddy</h1>
      <p className="mt-4 text-gray-600 text-lg text-left">
        Welcome to <span className="text-pink-500 font-semibold">Supr Mommy Daddy</span>, a vibrant parenting community where love, learning, and
        little moments of joy come together! ❤️ We understand that parenting is a beautiful journey filled with challenges, laughter, and endless
        love, and we’re here to make that journey smoother, more exciting, and incredibly rewarding.
      </p>

      {/* Image Section */}
      {/* <div className="mt-6 flex justify-center">
        <img src="/baby.jpeg" alt="Cute Baby" className="h-40 w-auto rounded-xl shadow-lg" />
      </div> */}

      <AboutSuprMommyDaddy />
    </div>
  );
};

export default AboutUs;
