import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleIcon,
  XCircleIcon,
  InfoIcon,
  FilterIcon,
  CarIcon,
  CalendarIcon,
  UserIcon,
  MailIcon,
  PaletteIcon,
  GaugeIcon,
  KeyIcon,
  ShieldIcon,
  BadgeCheckIcon,
  XIcon,
  PlusIcon,
} from 'lucide-react';

const ManageVehicles = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user.role !== 'ROLE_ADMIN') {
      setError('You do not have permission to access this page.');
      setLoading(false);
    }
  }, [user, navigate]);

  const fetchVehicles = async () => {
    if (!user || user.role !== 'ROLE_ADMIN') return;

    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.get('http://localhost:8080/auth/getallvehicles', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setVehicles(response.data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError('Failed to fetch vehicles. Please try again later.');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (user && user.role === 'ROLE_ADMIN') {
      fetchVehicles();
    }
  }, [user]);

  const handleMoreDetails = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleApprove = async (vehicleId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(
        `http://localhost:8080/admin/approve/${vehicleId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Update the vehicle status in the state
        const updatedVehicles = vehicles.map((vehicle) =>
          vehicle.vehicleId === vehicleId ? { ...vehicle, registrationStatus: 'APPROVED' } : vehicle
        );
        setVehicles(updatedVehicles);

        // Update the selected vehicle if it's the one being approved
        if (selectedVehicle && selectedVehicle.vehicleId === vehicleId) {
          setSelectedVehicle({ ...selectedVehicle, registrationStatus: 'APPROVED' });
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError('Failed to approve vehicle. Please try again later.');
      }
    }
  };

  const handleReject = async (vehicleId) => {
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await axios.put(
        `http://localhost:8080/admin/reject/${vehicleId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        // Update the vehicle status in the state
        const updatedVehicles = vehicles.map((vehicle) =>
          vehicle.vehicleId === vehicleId ? { ...vehicle, registrationStatus: 'REJECTED' } : vehicle
        );
        setVehicles(updatedVehicles);

        // Update the selected vehicle if it's the one being rejected
        if (selectedVehicle && selectedVehicle.vehicleId === vehicleId) {
          setSelectedVehicle({ ...selectedVehicle, registrationStatus: 'REJECTED' });
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        logout();
        navigate('/login');
      } else {
        setError('Failed to reject vehicle. Please try again later.');
      }
    }
  };

  const handleAddVehicle = () => {
    navigate('/add-vehicle');
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    if (filter === 'pending') return vehicle.registrationStatus === 'PENDING';
    if (filter === 'approved') return vehicle.registrationStatus === 'APPROVED';
    return true;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'text-green-500';
      case 'PENDING':
        return 'text-yellow-500';
      case 'REJECTED':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-700">Loading vehicles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white text-gray-900 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-100 border border-red-500 rounded-lg p-6 flex items-center">
            <XCircleIcon className="h-8 w-8 text-red-500 mr-4" />
            <p className="text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 min-h-screen w-full">
      <div className="max-w-7xl mx-auto p-6">
        <header className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold flex items-center">
              <CarIcon className="mr-3 text-yellow-500" />
              <span>Manage Vehicles</span>
            </h2>
            <button
              onClick={handleAddVehicle}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center mt-30"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Vehicle
            </button>
          </div>
          <p className="text-gray-600 mt-2">
            Review and manage vehicle registration requests
          </p>
        </header>

        <div className="flex items-center mb-8 bg-gray-100 p-2 rounded-lg">
          <FilterIcon className="h-5 w-5 text-yellow-500 mr-3 ml-2" />
          {['all', 'pending', 'approved'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md mr-2 transition-all ${
                filter === status
                  ? 'bg-yellow-500 text-white font-medium'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3 bg-white rounded-xl shadow-lg overflow-hidden">
            {filteredVehicles.length === 0 ? (
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <CarIcon className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-gray-600">
                  No vehicles found matching your filter.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      {[
                        'Vehicle No',
                        'Driver',
                        'Category',
                        'Status',
                        'Actions',
                      ].map((head) => (
                        <th
                          key={head}
                          className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                        >
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredVehicles.map((vehicle) => (
                      <tr
                        key={vehicle.vehicleId}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedVehicle?.vehicleId === vehicle.vehicleId
                            ? 'bg-gray-50'
                            : ''
                        }`}
                      >
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {vehicle.vehicleNo}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {vehicle.driverName}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {vehicle.category}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                              vehicle.registrationStatus,
                            )} bg-gray-100`}
                          >
                            {vehicle.registrationStatus === 'APPROVED' && (
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                            )}
                            {vehicle.registrationStatus === 'PENDING' && (
                              <InfoIcon className="w-3 h-3 mr-1" />
                            )}
                            {vehicle.registrationStatus === 'REJECTED' && (
                              <XCircleIcon className="w-3 h-3 mr-1" />
                            )}
                            {vehicle.registrationStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleMoreDetails(vehicle)}
                              className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors flex items-center"
                            >
                              <InfoIcon className="w-3 h-3 mr-1" />
                              Details
                            </button>
                            <button
                              onClick={() => handleApprove(vehicle.vehicleId)}
                              className="px-3 py-1 text-xs font-medium text-white bg-green-600 rounded-md hover:bg-green-500 transition-colors flex items-center"
                              disabled={
                                vehicle.registrationStatus === 'APPROVED'
                              }
                            >
                              <CheckCircleIcon className="w-3 h-3 mr-1" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(vehicle.vehicleId)}
                              className="px-3 py-1 text-xs font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition-colors flex items-center"
                              disabled={
                                vehicle.registrationStatus === 'REJECTED'
                              }
                            >
                              <XCircleIcon className="w-3 h-3 mr-1" />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="lg:w-1/3">
            {selectedVehicle ? (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative">
                  {selectedVehicle.vehicleImage && (
                    <img
                      src={selectedVehicle.vehicleImage}
                      alt="Vehicle"
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <button
                    onClick={() => setSelectedVehicle(null)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/70 hover:bg-gray-100 text-gray-700"
                  >
                    <XIcon className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white">
                      {selectedVehicle.vehicleNo}
                    </h3>
                    <p className="text-gray-300">{selectedVehicle.category}</p>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        selectedVehicle.registrationStatus,
                      )} bg-gray-100`}
                    >
                      {selectedVehicle.registrationStatus === 'APPROVED' && (
                        <CheckCircleIcon className="w-3 h-3 mr-1" />
                      )}
                      {selectedVehicle.registrationStatus === 'PENDING' && (
                        <InfoIcon className="w-3 h-3 mr-1" />
                      )}
                      {selectedVehicle.registrationStatus === 'REJECTED' && (
                        <XCircleIcon className="w-3 h-3 mr-1" />
                      )}
                      {selectedVehicle.registrationStatus}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <UserIcon className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">
                          Driver Information
                        </p>
                        <p className="text-gray-900">
                          {selectedVehicle.driverName}
                        </p>
                        <p className="text-gray-500 text-sm">
                          @{selectedVehicle.userName}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MailIcon className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Email</p>
                        <p className="text-gray-900">{selectedVehicle.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CarIcon className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Vehicle Details</p>
                        <div className="grid grid-cols-2 gap-2 text-gray-900">
                          <p>Year: {selectedVehicle.manufactureYear}</p>
                          <p>Color: {selectedVehicle.color}</p>
                          <p>Fuel: {selectedVehicle.fuelType}</p>
                          <p>Trans: {selectedVehicle.transmission}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CalendarIcon className="h-5 w-5 text-yellow-500 mr-3 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-600">Expiry Dates</p>
                        <p className="text-gray-900">
                          License: {selectedVehicle.licenseExpireDate}
                        </p>
                        <p className="text-gray-900">
                          Insurance: {selectedVehicle.insuranceExpireDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <BadgeCheckIcon className="h-5 w-5 text-yellow-500 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Active Status</p>
                        <p className="text-gray-900">
                          {selectedVehicle.isActive ? 'Active' : 'Inactive'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleApprove(selectedVehicle.vehicleId)}
                      className={`px-4 py-2 rounded-md flex justify-center items-center transition-colors ${
                        selectedVehicle.registrationStatus === 'APPROVED'
                          ? 'bg-green-100 text-green-500 cursor-not-allowed'
                          : 'bg-green-600 hover:bg-green-500 text-white'
                      }`}
                      disabled={
                        selectedVehicle.registrationStatus === 'APPROVED'
                      }
                    >
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(selectedVehicle.vehicleId)}
                      className={`px-4 py-2 rounded-md flex justify-center items-center transition-colors ${
                        selectedVehicle.registrationStatus === 'REJECTED'
                          ? 'bg-red-100 text-red-500 cursor-not-allowed'
                          : 'bg-red-600 hover:bg-red-500 text-white'
                      }`}
                      disabled={
                        selectedVehicle.registrationStatus === 'REJECTED'
                      }
                    >
                      <XCircleIcon className="h-4 w-4 mr-2" />
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center h-64 flex flex-col items-center justify-center">
                <CarIcon className="h-12 w-12 text-yellow-500 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">
                  No Vehicle Selected
                </h3>
                <p className="text-gray-500 mt-2">
                  Click "Details" on a vehicle to view more information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageVehicles;