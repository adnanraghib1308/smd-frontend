import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Contests from "./pages/Contests";
import ContestDetails from "./pages/ContestDetails";
import Submit from "./pages/Submit";
import BabyProfile from "./pages/BabyProfile";
import Leaderboard from "./pages/Leaderboard";
import AboutUs from "./pages/Aboutus";
import { LoaderProvider } from "./LoaderContext";
import Loader from "./Loader";
import axiosClient from "./axios-client";
import { initGA } from "./analytics";

function App() {
  useEffect(() => {
    // Call set-cookie API when app loads
    (async () => {
      await axiosClient.get("/auth/set-cookie");
    })();
    initGA();
  }, []);

  return (
    <LoaderProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
          <Navbar />
          <Loader /> {/* Global Loader */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/contest/:contestId" element={<ContestDetails />} />
            <Route path="/submit" element={<Submit />} />
            <Route path="/baby" element={<BabyProfile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/leaderboard/:contestId" element={<Leaderboard />} />
          </Routes>
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </LoaderProvider>
  );
}

export default App;
