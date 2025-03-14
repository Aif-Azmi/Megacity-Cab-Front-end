import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboardIcon,
  CarIcon,
  UsersIcon,
  SettingsIcon,
  LogOutIcon,
  PackageIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MenuIcon,
  FolderIcon,
  BriefcaseIcon,
} from 'lucide-react';

const Sidebar = () => {
  const [expandDrivers, setExpandDrivers] = useState(false);
  const [expandVehicles, setExpandVehicles] = useState(false);
  const [expandAdmins, setExpandAdmins] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    setTimeout(() => {
      navigate('/', { replace: true });
      setIsLoggingOut(false);
    }, 500);
  };

  const isActive = (path) => location.pathname.startsWith(path);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isCollapsed && !event.target.closest('.sidebar')) {
        setIsCollapsed(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCollapsed]);

  const renderExpandableSection = (
    title,
    icon,
    expandState,
    setExpandState,
    paths
  ) => {
    const isSectionActive = paths.some((path) => isActive(path));
    return (
      <div className="mb-1">
        <div
          className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 cursor-pointer
            ${isSectionActive ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-gray-700/40 text-gray-200'}`}
          onClick={() => setExpandState(!expandState)}
          aria-expanded={expandState}
        >
          <div className="flex items-center gap-3">
            {icon}
            {!isCollapsed && <span className="font-medium">{title}</span>}
          </div>
          {!isCollapsed && (
            <div className="transition-transform duration-200">
              {expandState ? (
                <ChevronUpIcon size={18} />
              ) : (
                <ChevronDownIcon size={18} />
              )}
            </div>
          )}
        </div>
        {expandState && !isCollapsed && (
          <div className="mt-1 ml-6 space-y-1 animate-fadeIn">
            {paths.map((path, index) => (
              <Link
                key={index}
                to={path}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200
                  ${isActive(path) ? 'bg-indigo-500/30 text-white' : 'text-gray-300 hover:bg-gray-700/30 hover:text-white'}`}
              >
                <div className="w-1 h-1 rounded-full bg-gray-400 mr-2"></div>
                <span className="capitalize">
                  {path.split('/').pop().replace(/-/g, ' ')}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`sidebar h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white fixed left-0 top-0 
        transition-all duration-300 ease-in-out z-20 shadow-xl
        ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
          <div
            className={`flex items-center ${isCollapsed ? 'justify-center w-full' : ''}`}
          >
            {!isCollapsed && (
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                CabAdmin
              </span>
            )}
            {isCollapsed && (
              <BriefcaseIcon size={24} className="text-indigo-400" />
            )}
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg hover:bg-gray-700/50 focus:outline-none transition-colors
              ${isCollapsed ? 'w-full flex justify-center mt-2' : ''}`}
            aria-label="Toggle sidebar"
          >
            <MenuIcon size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-thin">
          {/* Dashboard Link */}
          <Link
            to="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive('/admin/dashboard') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-200 hover:bg-gray-700/40'}`}
          >
            <LayoutDashboardIcon size={20} />
            {!isCollapsed && <span className="font-medium">Dashboard</span>}
          </Link>

          {/* Rides Link */}
          <Link
            to="/admin/rides"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive('/admin/rides') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-200 hover:bg-gray-700/40'}`}
          >
            <PackageIcon size={20} />
            {!isCollapsed && <span className="font-medium">Bookings</span>}
          </Link>

          {/* Vehicles Section */}
          {renderExpandableSection(
            'Vehicles',
            <CarIcon size={20} />,
            expandVehicles,
            setExpandVehicles,
            ['/admin/manage-vehicles', '/admin/add-vehicle']
          )}

          {/* Categories Link */}
          <Link
            to="/admin/manage-categories"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive('/admin/manage-categories') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-200 hover:bg-gray-700/40'}`}
          >
            <FolderIcon size={20} />
            {!isCollapsed && <span className="font-medium">Categories</span>}
          </Link>

          {/* Admins Section */}
          {renderExpandableSection(
            'Admins',
            <UsersIcon size={20} />,
            expandAdmins,
            setExpandAdmins,
            ['/admin/manage-admins', '/admin/add-admin']
          )}

          {/* Settings Link */}
          <Link
            to="/admin/settings"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive('/admin/settings') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-200 hover:bg-gray-700/40'}`}
          >
            <SettingsIcon size={20} />
            {!isCollapsed && <span className="font-medium">Settings</span>}
          </Link>

          {/* Profile Link */}
          <Link
            to="/admin/profile"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
              ${isActive('/admin/profile') ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-200 hover:bg-gray-700/40'}`}
          >
            <UsersIcon size={20} />
            {!isCollapsed && <span className="font-medium">Profile</span>}
          </Link>
        </nav>

        {/* Logout Section */}
        <div className="p-4 border-t border-gray-700/50">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200
              text-red-400 hover:bg-red-400/10 hover:text-red-300
              ${isLoggingOut ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOutIcon size={20} />
            {!isCollapsed && (
              <span>{isLoggingOut ? 'Logging out...' : 'Logout'}</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; // Default export