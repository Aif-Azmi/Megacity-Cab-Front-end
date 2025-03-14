import React, { useState, useEffect, useRef } from "react";
import { Bell, Search } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const username = localStorage.getItem("username") || "Guest";
  const adminId = localStorage.getItem("userId"); // Assuming you store the admin ID in localStorage
  const [profilePicture, setProfilePicture] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  ); // Default placeholder image
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch admin profile picture
  useEffect(() => {
    const fetchAdminProfile = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        if (!token || !adminId) return;

        const response = await axios.get(`http://localhost:8080/admin/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.profilePicture) {
          setProfilePicture(response.data.profilePicture); // Set the admin's profile picture
        }
      } catch (err) {
        console.error("Error fetching admin profile:", err);
      }
    };

    fetchAdminProfile();
  }, [adminId]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goToProfile = () => {
    setIsDropdownOpen(false);
    navigate("/profile-settings");
  };

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-10">
      <div className="flex items-center w-96">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 w-full outline-none text-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="relative flex items-center space-x-4">
        <button className="relative">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <img
            src={profilePicture} // Use the admin's profile picture
            alt="Admin"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium text-gray-800">{username}</span>
        </div>

        {/* Dropdown Menu */}
        <div
          ref={dropdownRef}
          className={`absolute top-12 right-0 bg-white border rounded-lg shadow-lg w-48 z-20 transition-all duration-200 ease-in-out transform ${
            isDropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <ul className="py-2">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              <Link to="/admin/profile-settings" onClick={() => setIsDropdownOpen(false)}>
                Profile
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              <Link to="/chat" onClick={() => setIsDropdownOpen(false)}>
                Chat
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              <Link to="/inbox" onClick={() => setIsDropdownOpen(false)}>
                Inbox
              </Link>
              <span className="ml-2 bg-green-500 text-white text-xs rounded-full px-2 py-1">25</span>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              <Link to="/messages" onClick={() => setIsDropdownOpen(false)}>
                Messages
              </Link>
            </li>
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center">
              <Link to="/settings" onClick={() => setIsDropdownOpen(false)}>
                Settings
              </Link>
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500 flex items-center"
              onClick={handleLogout}
            >
              <span>Sign Out</span>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;