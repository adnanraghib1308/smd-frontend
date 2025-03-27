import React from "react";
import { Link } from "react-router-dom";
import { Crown, Home } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Image */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.jpeg" // Replace with correct path
              alt="BabyStars Logo"
              className="h-auto max-h-12 sm:max-h-14 md:max-h-16 w-auto"
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-2 sm:space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              <Home className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Home</span>
            </Link>

            <Link
              to="/contests"
              className="flex items-center space-x-1 px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              <Crown className="h-4 w-4 sm:h-5 sm:w-5" />
              <span>Contests</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
