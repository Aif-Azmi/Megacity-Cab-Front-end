import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingVehicle = () => {
  const [pendingVehicles, setPendingVehicles] = useState([]); // State to store pending vehicles

  // Fetch pending vehicles from the backend
  useEffect(() => {
    const fetchPendingVehicles = async () => {
      try {
        const response = await axios.get('/admin/pendingvehicles'); // Updated endpoint
        console.log('Pending Vehicles:', response.data); // Log the response for debugging
        if (Array.isArray(response.data)) {
          setPendingVehicles(response.data); // Set pending vehicles if the response is an array
        } else {
          console.error('API response is not an array:', response.data);
          setPendingVehicles([]); // Set to empty array if the response is not an array
        }
      } catch (error) {
        console.error('Error fetching pending vehicles:', error);
        setPendingVehicles([]); // Set to empty array if the API call fails
      }
    };

    fetchPendingVehicles();
  }, []);

  // Function to approve a vehicle
  const handleApprove = async (vehicleId) => {
    try {
      const response = await axios.put(`/admin/approve/${vehicleId}`); // Updated endpoint
      if (response.status === 200) {
        // Remove the approved vehicle from the pending list
        setPendingVehicles((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle.vehicleId !== vehicleId)
        );
        alert('Vehicle approved successfully!');
      }
    } catch (error) {
      console.error('Error approving vehicle:', error);
      alert('Failed to approve vehicle.');
    }
  };

  // Function to reject a vehicle
  const handleReject = async (vehicleId) => {
    try {
      const response = await axios.put(`/admin/reject/${vehicleId}`); // Updated endpoint
      if (response.status === 200) {
        // Remove the rejected vehicle from the pending list
        setPendingVehicles((prevVehicles) =>
          prevVehicles.filter((vehicle) => vehicle.vehicleId !== vehicleId)
        );
        alert('Vehicle rejected successfully!');
      }
    } catch (error) {
      console.error('Error rejecting vehicle:', error);
      alert('Failed to reject vehicle.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pending Vehicles</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vehicle Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Registration Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pendingVehicles.length > 0 ? (
              pendingVehicles.map((vehicle) => (
                <tr key={vehicle.vehicleId}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.vehicleId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.vehicleNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.model}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vehicle.registrationStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <button
                      onClick={() => handleApprove(vehicle.vehicleId)}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(vehicle.vehicleId)}
                      className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                  No pending vehicles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingVehicle;