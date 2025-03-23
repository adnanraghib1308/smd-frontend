import React from 'react';
import { Link } from 'react-router-dom';
import { Baby, Crown, Home } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Baby className="h-8 w-8 text-pink-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              BabyStars
            </span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/contests"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-pink-500 transition-colors"
            >
              <Crown className="h-4 w-4" />
              <span>Contests</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;