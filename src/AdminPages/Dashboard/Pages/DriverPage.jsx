import React from "react";
import { Search, Filter, MoreVertical } from "lucide-react";

const drivers = [
  {
    id: "1",
    name: "Mike Smith",
    photo: "https://i.pravatar.cc/40?img=1",
    vehicle: "Toyota Camry",
    status: "Active",
    rating: "4.8",
    rides: "156",
    pending: false,
  },
  {
    id: "2",
    name: "David Wilson",
    photo: "https://i.pravatar.cc/40?img=2",
    vehicle: "Honda Civic",
    status: "Blocked",
    rating: "4.5",
    rides: "98",
    pending: false,
  },
  {
    id: "3",
    name: "Sarah Johnson",
    photo: "https://i.pravatar.cc/40?img=3",
    vehicle: "Pending",
    status: "Pending",
    rating: "-",
    rides: "0",
    pending: true,
  },
];

const DriverPage = () => {
  return (
    <div className="p-6 mt-16">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Drivers Management</h1>
        <div className="flex space-x-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search drivers..."
              className="pl-10 pr-4 py-2 border rounded-lg w-64"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter size={20} />
            <span>Filter</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Driver
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Vehicle
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Rating
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Total Rides
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={driver.photo}
                      alt={driver.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium">{driver.name}</p>
                      <p className="text-sm text-gray-500">ID: #{driver.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{driver.vehicle}</td>
                <td className="px-6 py-4 text-sm">{driver.rating}</td>
                <td className="px-6 py-4 text-sm">{driver.rides}</td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-3 py-1 rounded-full text-xs ${driver.status === "Active" ? "bg-green-100 text-green-600" : driver.status === "Blocked" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"}`}
                  >
                    {driver.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">
                  {driver.pending ? (
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600">
                        Approve
                      </button>
                      <button className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600">
                        Decline
                      </button>
                    </div>
                  ) : (
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={20} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverPage;
