import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../Utils/AuthContext'; // Adjust the import path as needed

const DriverManage = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDriver, setNewDriver] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    nic: '',
    phone: '',
    emergencyPhone: '',
    address: '',
    licenseNumber: '',
    licenseExpiry: '',
    experienceYears: 0,
    profilePicture: null, // For file upload
    licenseImage: null,   // For file upload
  });

  // Fetch approved drivers from the backend
  useEffect(() => {
    const fetchApprovedDrivers = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await axios.get('http://localhost:8080/drivers/admin/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { page: 0, size: 100 },
        });

        const approvedDrivers = response.data.filter((driver) => driver.registrationStatus === 'APPROVED');
        setDrivers(approvedDrivers);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching drivers:', err);
        if (err.response) {
          setError(`Failed to fetch drivers. Status: ${err.response.status}`);
        } else if (err.request) {
          setError('No response from server. Please check if the backend is running.');
        } else {
          setError('An unexpected error occurred: ' + err.message);
        }
        setLoading(false);
      }
    };

    fetchApprovedDrivers();
  }, []);

  // Handle adding a new driver
  const handleAddDriver = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      // Create FormData for multipart file upload
      const formData = new FormData();
      formData.append('driver', JSON.stringify({
        firstName: newDriver.firstName,
        lastName: newDriver.lastName,
        email: newDriver.email,
        userName: newDriver.userName,
        password: newDriver.password,
        nic: newDriver.nic,
        phone: newDriver.phone,
        emergencyPhone: newDriver.emergencyPhone,
        address: newDriver.address,
        licenseNumber: newDriver.licenseNumber,
        licenseExpiry: newDriver.licenseExpiry,
        experienceYears: newDriver.experienceYears,
        registrationStatus: 'PENDING',
      }));
      
      if (newDriver.profilePicture) {
        formData.append('driverImage', newDriver.profilePicture);
      }
      if (newDriver.licenseImage) {
        formData.append('licenseImage', newDriver.licenseImage);
      }

      // Assuming you have a vehicle object to send (optional)
      formData.append('vehicle', JSON.stringify({})); // Add vehicle data if needed

      const response = await axios.post(
        'http://localhost:8080/drivers/auth/register-with-vehicle',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('Driver added successfully! Awaiting approval.');
      setShowAddModal(false);
      setNewDriver({
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: '',
        nic: '',
        phone: '',
        emergencyPhone: '',
        address: '',
        licenseNumber: '',
        licenseExpiry: '',
        experienceYears: 0,
        profilePicture: null,
        licenseImage: null,
      });
    } catch (err) {
      console.error('Error adding driver:', err);
      alert('Failed to add driver: ' + (err.response?.data || err.message));
    }
  };

  // Handle toggling driver status (active/blocked)
  const handleToggleStatus = async (driverId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      const response = await axios.put(
        `http://localhost:8080/drivers/${driverId}/toggle-status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDrivers(
        drivers.map((driver) =>
          driver.driverId === driverId
            ? { ...driver, isActive: response.data.isActive, status: response.data.status }
            : driver
        )
      );

      alert('Driver status updated successfully!');
    } catch (err) {
      console.error('Error toggling driver status:', err);
      alert('Failed to update driver status. Please try again.');
    }
  };

  // Handle deleting a driver with confirmation
  const handleDeleteDriver = async (driverId) => {
    if (!window.confirm('Are you sure you want to delete this driver? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      await axios.delete(`http://localhost:8080/drivers/admin/delete/${driverId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDrivers(drivers.filter((driver) => driver.driverId !== driverId));
      alert('Driver deleted successfully!');
    } catch (err) {
      console.error('Error deleting driver:', err);
      alert('Failed to delete driver. Please try again.');
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
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-bold text-gray-800">Manage Approved Drivers</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-all"
        >
          Add Driver
        </button>
      </div>

      {/* Add Driver Modal (Popup) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Driver</h2>
            <form onSubmit={handleAddDriver}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    type="text"
                    value={newDriver.firstName}
                    onChange={(e) => setNewDriver({ ...newDriver, firstName: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    type="text"
                    value={newDriver.lastName}
                    onChange={(e) => setNewDriver({ ...newDriver, lastName: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newDriver.email}
                    onChange={(e) => setNewDriver({ ...newDriver, email: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    value={newDriver.userName}
                    onChange={(e) => setNewDriver({ ...newDriver, userName: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    type="password"
                    value={newDriver.password}
                    onChange={(e) => setNewDriver({ ...newDriver, password: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">NIC</label>
                  <input
                    type="text"
                    value={newDriver.nic}
                    onChange={(e) => setNewDriver({ ...newDriver, nic: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    value={newDriver.phone}
                    onChange={(e) => setNewDriver({ ...newDriver, phone: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Emergency Phone</label>
                  <input
                    type="text"
                    value={newDriver.emergencyPhone}
                    onChange={(e) => setNewDriver({ ...newDriver, emergencyPhone: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    value={newDriver.address}
                    onChange={(e) => setNewDriver({ ...newDriver, address: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    rows="3"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">License Number</label>
                  <input
                    type="text"
                    value={newDriver.licenseNumber}
                    onChange={(e) => setNewDriver({ ...newDriver, licenseNumber: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">License Expiry</label>
                  <input
                    type="date"
                    value={newDriver.licenseExpiry}
                    onChange={(e) => setNewDriver({ ...newDriver, licenseExpiry: e.target.value })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Experience (Years)</label>
                  <input
                    type="number"
                    value={newDriver.experienceYears}
                    onChange={(e) => setNewDriver({ ...newDriver, experienceYears: parseInt(e.target.value) })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    min="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewDriver({ ...newDriver, profilePicture: e.target.files[0] })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">License Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setNewDriver({ ...newDriver, licenseImage: e.target.files[0] })}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-all"
                >
                  Add Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Driver Table */}
      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg p-6">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.driverId} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{driver.driverId}</td>
                <td className="px-4 py-2">{driver.firstName} {driver.lastName}</td>
                <td className="px-4 py-2">{driver.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      driver.status === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {driver.status}
                  </span>
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => handleToggleStatus(driver.driverId)}
                    className={`${
                      driver.status === 'ACTIVE'
                        ? 'bg-red-500 hover:bg-red-600'
                        : 'bg-green-500 hover:bg-green-600'
                    } text-white px-3 py-1 rounded-md transition-all`}
                  >
                    {driver.status === 'ACTIVE' ? 'Block' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDeleteDriver(driver.driverId)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-all"
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

export default DriverManage;