import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const Alladmins = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [updatedAdmin, setUpdatedAdmin] = useState({});

  // Redirect to login if no token is found
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch all admins from the backend
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await axios.get('http://localhost:8080/admin/alladmins', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setAdmins(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admins:', err);
        if (err.response) {
          if (err.response.status === 401) {
            logout();
            navigate('/login');
          } else {
            setError(`Failed to fetch admins. Status: ${err.response.status}`);
          }
        } else if (err.request) {
          setError('No response from server. Please check if the backend is running.');
        } else {
          setError('An unexpected error occurred: ' + err.message);
        }
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [logout, navigate]);

  // Handle deleting an admin
  const handleDeleteAdmin = async (adminId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      await axios.delete(`http://localhost:8080/admin/${adminId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAdmins(admins.filter((admin) => admin.id !== adminId));
      alert('Admin deleted successfully!');
    } catch (err) {
      console.error('Error deleting admin:', err);
      if (err.response && err.response.status === 401) {
        logout();
        navigate('/login');
      } else {
        alert('Failed to delete admin. Please try again.');
      }
    }
  };

  // Handle updating an admin
  const handleUpdateAdmin = async (adminId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      await axios.put(
        `http://localhost:8080/admin/deletea/${id}`,
        updatedAdmin,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAdmins(
        admins.map((admin) =>
          admin.id === adminId ? { ...admin, ...updatedAdmin } : admin
        )
      );

      setEditingAdmin(null);
      alert('Admin updated successfully!');
    } catch (err) {
      console.error('Error updating admin:', err);
      if (err.response && err.response.status === 401) {
        logout();
        navigate('/login');
      } else {
        alert('Failed to update admin. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
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
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">All Admins</h1>
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">ID</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">First Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">Last Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">Username</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">Status</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {admins.map((admin) => (
              <tr key={admin.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-700">{admin.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {editingAdmin === admin.id ? (
                    <input
                      type="text"
                      value={updatedAdmin.firstName || admin.firstName}
                      onChange={(e) =>
                        setUpdatedAdmin({ ...updatedAdmin, firstName: e.target.value })
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    admin.firstName
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {editingAdmin === admin.id ? (
                    <input
                      type="text"
                      value={updatedAdmin.lastName || admin.lastName}
                      onChange={(e) =>
                        setUpdatedAdmin({ ...updatedAdmin, lastName: e.target.value })
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    admin.lastName
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {editingAdmin === admin.id ? (
                    <input
                      type="text"
                      value={updatedAdmin.userName || admin.userName}
                      onChange={(e) =>
                        setUpdatedAdmin({ ...updatedAdmin, userName: e.target.value })
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    admin.userName
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {editingAdmin === admin.id ? (
                    <input
                      type="email"
                      value={updatedAdmin.email || admin.email}
                      onChange={(e) =>
                        setUpdatedAdmin({ ...updatedAdmin, email: e.target.value })
                      }
                      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    admin.email
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {admin.active ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
                  ) : (
                    <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Blocked</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {editingAdmin === admin.id ? (
                    <button
                      onClick={() => handleUpdateAdmin(admin.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingAdmin(admin.id);
                        setUpdatedAdmin({
                          firstName: admin.firstName,
                          lastName: admin.lastName,
                          userName: admin.userName,
                          email: admin.email,
                        });
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteAdmin(admin.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Alladmins;