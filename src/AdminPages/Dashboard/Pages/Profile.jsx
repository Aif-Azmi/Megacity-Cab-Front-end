import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Edit2,
  Save,
  X,
  ChevronLeft,
  UserCircle,
  Upload,
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeoutReached, setTimeoutReached] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    nic: '',
    phone: '',
  });
  const [profilePictureFile, setProfilePictureFile] = useState(null); // State for the uploaded file

  const adminId = user?.userId || null;

  useEffect(() => {
    if (!user || !adminId) {
      setError('You must be logged in to view this page.');
      setLoading(false);
      navigate('/login');
      return;
    }

    const fetchAdminDetails = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('jwtToken');

        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await axios.get(`http://localhost:8080/admin/${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdmin(response.data);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          userName: response.data.userName,
          email: response.data.email,
          nic: response.data.nic,
          phone: response.data.phone,
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin details:', err);
        if (err.response?.status === 401) {
          logout();
          navigate('/login');
        }
        setError(
          err.response?.data?.message ||
            'Failed to fetch admin details. Please try again.'
        );
        setLoading(false);
      }
    };

    fetchAdminDetails();
  }, [adminId, user, logout, navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setTimeoutReached(true);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [loading]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      firstName: admin.firstName,
      lastName: admin.lastName,
      userName: admin.userName,
      email: admin.email,
      nic: admin.nic,
      phone: admin.phone,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(
        `http://localhost:8080/admin/${adminId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmin(response.data);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating admin details:', err);
      setError('Failed to update profile. Please try again.');
    }
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = async () => {
    if (!profilePictureFile) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      const formData = new FormData();
      formData.append('file', profilePictureFile);

      const response = await axios.post(
        `http://localhost:8080/admin/uploadProfilePicture/${adminId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Update the admin's profile picture in the state
      setAdmin((prevAdmin) => ({
        ...prevAdmin,
        profilePicture: response.data,
      }));
      alert('Profile picture uploaded successfully!');
    } catch (err) {
      console.error('Error uploading profile picture:', err);
      setError('Failed to upload profile picture. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-500"></div>
        {timeoutReached && (
          <p className="ml-4 text-gray-300">
            Taking longer than expected. Please check your connection.
          </p>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center p-4">
      <div className="max-w-4xl w-full">
        <div className="mb-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center text-gray-300 hover:text-yellow-400 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gray-900 px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <h1 className="text-2xl font-bold text-white">Admin Profile</h1>
              <div className="mt-4 md:mt-0">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${admin?.isActive ? 'bg-yellow-400 text-gray-900' : 'bg-gray-600 text-white'}`}
                >
                  {admin?.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image Section */}
              <div className="flex flex-col items-center lg:w-1/3">
                <div className="relative">
                  {admin?.profilePicture ? (
                    <img
                      src={admin.profilePicture}
                      alt="Profile"
                      className="w-40 h-40 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
                    />
                  ) : (
                    <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center border-4 border-yellow-400">
                      <UserCircle className="w-20 h-20 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
                </div>
                <h2 className="mt-4 text-xl font-bold text-gray-800">
                  {admin?.firstName} {admin?.lastName}
                </h2>
                <p className="text-gray-500">@{admin?.userName}</p>
                {/* Profile Picture Upload */}
                <div className="mt-6 w-full">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <h3 className="font-medium text-gray-700 mb-2">
                      Upload Profile Picture
                    </h3>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfilePictureFile(e.target.files[0])}
                      className="w-full mb-2"
                    />
                    <button
                      onClick={handleProfilePictureUpload}
                      className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              {/* Profile Details Section */}
              <div className="flex-1">
                <div className="bg-gray-50 p-6 rounded-xl mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-gray-800">
                      Personal Information
                    </h3>
                    {!isEditing && (
                      <button
                        onClick={handleEditClick}
                        className="flex items-center text-sm font-medium text-yellow-600 hover:text-yellow-500"
                      >
                        <Edit2 className="w-4 h-4 mr-1" />
                        Edit Profile
                      </button>
                    )}
                  </div>
                  {isEditing ? (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            First Name
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Last Name
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                          </label>
                          <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            NIC
                          </label>
                          <input
                            type="text"
                            name="nic"
                            value={formData.nic}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-4 mt-8">
                        <button
                          type="button"
                          onClick={handleCancelClick}
                          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-yellow-500 rounded-lg text-white hover:bg-yellow-600 transition-colors flex items-center"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start">
                          <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                            <User className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">First Name</p>
                            <p className="font-medium text-gray-900">
                              {admin?.firstName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                            <User className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Last Name</p>
                            <p className="font-medium text-gray-900">
                              {admin?.lastName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                            <User className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Username</p>
                            <p className="font-medium text-gray-900">
                              @{admin?.userName}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                            <Mail className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium text-gray-900">
                              {admin?.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                            <CreditCard className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">NIC</p>
                            <p className="font-medium text-gray-900">
                              {admin?.nic}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                            <Phone className="w-5 h-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Phone</p>
                            <p className="font-medium text-gray-900">
                              {admin?.phone}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    Account Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                      <div>
                        <p className="font-medium text-gray-800">Last Login</p>
                        <p className="text-sm text-gray-500">Today, 09:30 AM</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        New York, USA
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white rounded-lg border border-gray-100">
                      <div>
                        <p className="font-medium text-gray-800">
                          Account Created
                        </p>
                        <p className="text-sm text-gray-500">Jan 10, 2023</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                        Admin
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;