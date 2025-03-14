import React, { useEffect, useState, useMemo } from "react";
import { FilterIcon, AlertCircleIcon, SearchIcon, GaugeIcon, CalendarIcon } from "lucide-react";
import Navbar from "../HomePage/Navbar";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast for notifications
import Footer from "../HomePage/Footer";

// Helper function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem("jwtToken"); // Use consistent token key
};

// VehicleCard Component
const VehicleCard = ({ vehicle }) => {
  const navigate = useNavigate();

  const handleBookNowClick = (vehicle) => {
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      // Show error toast if not logged in
      toast.error("You must be logged in to book a taxi.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      navigate("/login");
    } else {
      // Navigate to map (booking form) if authenticated
      navigate("/map", {
        state: { vehicle },
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]">
      <div className="relative">
        <div className="h-56 overflow-hidden">
          <img src={vehicle.vehicleImage} alt={vehicle.model} className="w-full h-full object-cover object-center" loading="lazy" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-8">
          <h3 className="text-xl font-bold text-white">{vehicle.model}</h3>
        </div>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center text-gray-700">
            <GaugeIcon className="w-4 h-4 mr-2 text-blue-500" /> 
            <span className="text-sm">{vehicle.transmission}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <div className="w-4 h-4 mr-2 rounded-full bg-blue-500 flex items-center justify-center"> 
              <span className="text-xs text-white font-bold">F</span>
            </div>
            <span className="text-sm">{vehicle.fuelType}</span>
          </div>
          <div className="flex items-center text-gray-700">
            <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" /> 
            <span className="text-sm">{vehicle.year}</span>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-600">Price per km</div>
          <div className="font-bold text-lg text-blue-600">LKR {vehicle.pricePerKm}.00</div> 
        </div>
        <button
          onClick={() => handleBookNowClick(vehicle)}
          className="w-full py-2.5 rounded-lg cursor-pointer transition-all duration-200 font-medium bg-blue-500 text-white hover:bg-blue-600" 
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

VehicleCard.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    transmission: PropTypes.string.isRequired,
    fuelType: PropTypes.string.isRequired,
    pricePerKm: PropTypes.string.isRequired,
    vehicleImage: PropTypes.string.isRequired,
    seats: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
};

// VehicleSelect Component
const VehicleSelect = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ transmission: "all", fuelType: "all" });
  const [vehicles, setVehicles] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Redirect to login if not authenticated (optional, depending on your requirements)
  useEffect(() => {
    if (!isAuthenticated()) {
      // Uncomment if you want to redirect immediately when accessing this page
      // toast.warn("Please log in to access vehicle selection.", {
      //   position: "top-right",
      //   autoClose: 3000,
      // });
      // navigate("/login");
    }
  }, [navigate]);

  // Fetch vehicles from API
  useEffect(() => {
    const fetchApprovedVehicles = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/approvedvehicles");
        if (!response.ok) {
          throw new Error("Failed to fetch approved vehicles");
        }
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching approved vehicles:", error);
        setError("Failed to load vehicles. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchApprovedVehicles();
  }, []);

  const filteredVehicles = useMemo(() => {
    let result = [...vehicles];
    if (filter.transmission !== "all") result = result.filter((v) => v.transmission === filter.transmission);
    if (filter.fuelType !== "all") result = result.filter((v) => v.fuelType === filter.fuelType);
    return result;
  }, [vehicles, filter]);

  const activeFilterCount = Object.values(filter).filter((value) => value !== "all").length;

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="pt-8 pb-6">
          <h1 className="text-3xl font-bold text-gray-900">Choose Your Vehicle</h1>
          <p className="mt-2 text-gray-600">Select from our premium fleet of vehicles</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SearchIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search vehicles..."
                className="pl-10 pr-4 py-2.5 block w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FilterIcon className="h-5 w-5 text-gray-700 mr-2" />
              <span className="font-medium">Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"> 
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "Automatic", "Manual"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilter((prev) => ({ ...prev, transmission: type }))}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          filter.transmission === type ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200" 
                        }`}
                      >
                        {type === "all" ? "All Types" : type}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "Petrol", "Diesel", "Electric", "Hybrid"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setFilter((prev) => ({ ...prev, fuelType: type }))}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          filter.fuelType === type ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200" 
                        }`}
                      >
                        {type === "all" ? "All Types" : type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center">
            <AlertCircleIcon className="h-5 w-5 text-red-500 mr-3" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center items-center h-64 flex-col space-y-6">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="w-16 h-16 border-4 border-t-blue-500 animate-spin rounded-full absolute top-0 left-0"></div> 
            </div>
            <p className="text-gray-600 font-medium">Loading available vehicles...</p>
          </div>
        ) : (
          <>
            {filteredVehicles.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-blue-100 mb-4"> 
                  <FilterIcon className="h-8 w-8 text-blue-500" /> 
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No vehicles match your filters</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filter criteria to see more options.</p>
                <button
                  onClick={() => setFilter({ transmission: "all", fuelType: "all" })}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors" 
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-gray-600">{filteredVehicles.length} vehicles available</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              </>
            )}
         
            //
          </>
          
        )}
      </div>
    </div>
  );
};

export default VehicleSelect;