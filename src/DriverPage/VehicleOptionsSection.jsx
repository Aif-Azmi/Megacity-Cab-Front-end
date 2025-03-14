import React from "react";
import { Car, Users } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const VehicleOptionsSection = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Choose Your Path
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* I Have a Vehicle */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex justify-center">
              <Car className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-semibold text-center mb-4">
              I Have a Vehicle
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Start earning immediately with your own vehicle. We accept
              vehicles up to 10 years old.
            </p>
            <button className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors">
              Register with Your Vehicle
            </button>
          </div>

          {/* I Need a Vehicle */}
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-4 flex justify-center">
              <Users className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-2xl font-semibold text-center mb-4">
              I Need a Vehicle
            </h3>
            <p className="text-gray-600 text-center mb-6">
              Don't have a vehicle? We'll connect you with our vehicle partners
              for affordable options.
            </p>
            <button
              className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              onClick={() => navigate("/driver-register")} // ✅ Navigate to driver-register page
            >
              Register without Vehicle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleOptionsSection;
