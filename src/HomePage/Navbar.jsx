import React, { useState, useEffect } from "react";
import { Menu, X, Car, User } from "lucide-react"; // Import User icon
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [user, setUser] = useState(null); // Holds user data when logged in

  // Check if the user is logged in by checking localStorage
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (token && username && role) {
      setUser({
        username,
        role,
      });
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    setUser(null);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white bg-opacity-90 backdrop-blur-md shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Car size={32} className="text-blue-500" /> 
          <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent"> {/* Changed to blue */}
            Mega City Cab
          </h1>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 flex justify-center">
          <ul className="hidden md:flex space-x-8 text-lg font-normal font-sans text-gray-900">
            <li>
              <Link to="/" className="hover:text-blue-500">Home</Link> 
            </li>
            <li>
              <Link to="/rides" className="hover:text-blue-500">Rides</Link> 
            </li>
            <li>
              <Link to="/vehicle" className="hover:text-blue-500">Vehicle</Link> 
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-500">About</Link> 
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-500">Contact</Link> 
            </li>
          </ul>
        </div>

        {/* Login Button or User Profile (Right Side) */}
        <div className="flex items-center">
          {user ? (
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                {/* Replace image with User icon */}
                <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center"> 
                  <User size={24} className="text-blue-500" /> 
                </div>
                <span className="text-gray-900">{user.username}</span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">My Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                  <Link to="/help" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Help</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-300"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            className="ml-4 md:hidden focus:outline-none transition-all duration-300 hover:scale-110"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={32} className="text-blue-500" /> : <Menu size={32} className="text-blue-500" />} {/* Changed to blue */}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white text-gray-900 flex flex-col items-center space-y-6 py-6 shadow-lg"
          >
            <Link to="/" onClick={() => setIsOpen(false)} className="text-lg hover:text-blue-500">Home</Link> {/* Changed to blue */}
            <Link to="/rides" onClick={() => setIsOpen(false)} className="text-lg hover:text-blue-500">Rides</Link> {/* Changed to blue */}
            <Link to="/driver" onClick={() => setIsOpen(false)} className="text-lg hover:text-blue-500">Drive</Link> {/* Changed to blue */}
            <Link to="/vehicle" onClick={() => setIsOpen(false)} className="text-lg hover:text-blue-500">Vehicle</Link> {/* Changed to blue */}
            <Link to="/about" onClick={() => setIsOpen(false)} className="text-lg hover:text-blue-500">About</Link> {/* Changed to blue */}
            <Link to="/contact" onClick={() => setIsOpen(false)} className="text-lg hover:text-blue-500">Contact</Link> {/* Changed to blue */}

            {/* Show Login or User Profile in Mobile Menu */}
            {user ? (
              <Link to="/customerprofile" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                {/* Replace image with User icon */}
                <div className="w-10 h-10 rounded-full border-2 border-blue-500 flex items-center justify-center"> {/* Changed to blue */}
                  <User size={24} className="text-blue-500" /> {/* Changed to blue */}
                </div>
                <span className="text-gray-900">{user.username}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded-lg transition-all duration-300" 
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;