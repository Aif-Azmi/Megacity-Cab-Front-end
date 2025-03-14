import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../Utils/AuthContext'; 

const DriverRequest = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [pendingDrivers, setPendingDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch pending drivers from the backend
  useEffect(() => {
    const fetchPendingDrivers = async () => {
      try {
        const token = localStorage.getItem('jwtToken'); // Retrieve the token
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        const response = await axios.get('http://localhost:8080/admin/pending-drivers', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token to the request
          },
        });

        setPendingDrivers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pending drivers:', err);
        if (err.response) {
          setError(`Failed to fetch pending drivers. Status: ${err.response.status}`);
        } else if (err.request) {
          setError('No response from server. Please check if the backend is running.');
        } else {
          setError('An unexpected error occurred: ' + err.message);
        }
        setLoading(false);
      }
    };

    fetchPendingDrivers();
  }, []);

  // Handle approving a driver registration
  const handleApproveDriver = async (driverId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      const response = await axios.put(
        `http://localhost:8080/admin/approve-driver/${driverId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the approved driver from the list
      setPendingDrivers(pendingDrivers.filter((driver) => driver.driverId !== driverId));
      alert('Driver approved successfully!');
    } catch (err) {
      console.error('Error approving driver:', err);
      alert('Failed to approve driver. Please try again.');
    }
  };

  // Handle rejecting a driver registration
  const handleRejectDriver = async (driverId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) {
        throw new Error('No token found. Please log in.');
      }

      const response = await axios.put(
        `http://localhost:8080/admin/reject-driver/${driverId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove the rejected driver from the list
      setPendingDrivers(pendingDrivers.filter((driver) => driver.driverId !== driverId));
      alert('Driver rejected successfully!');
    } catch (err) {
      console.error('Error rejecting driver:', err);
      alert('Failed to reject driver. Please try again.');
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
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Driver Registration Requests</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <table className="w-full table-auto">
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
            {pendingDrivers.map((driver) => (
              <tr key={driver.driverId} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{driver.driverId}</td>
                <td className="px-4 py-2">{driver.firstName} {driver.lastName}</td>
                <td className="px-4 py-2">{driver.email}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      driver.registrationStatus === 'PENDING'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {driver.registrationStatus}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleApproveDriver(driver.driverId)}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleRejectDriver(driver.driverId)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Reject
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

export default DriverRequest;