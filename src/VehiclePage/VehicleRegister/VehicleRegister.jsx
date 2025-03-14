import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Car, Image, Fuel, Settings, User, Lock } from "lucide-react";

const VehicleRegister = () => {
  const [formData, setFormData] = useState({
    vehicleImage: null,
    driverName: "",
    userName: "",
    password: "",
    email: "",
    manufactureYear: "",
    vehicleNo: "",
    category: "",
    model: "",
    color: "",
    fuelType: "",
    transmission: "",
    licenseExpireDate: "",
    licenseImage: null,
    insuranceExpireDate: "",
    insuranceImage: null,
    driverlicenseImage: null,
    registrationStatus: "PENDING",
    isActive: "true",
  });

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/allcategory");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setErrorMessage(error.message || "Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [e.target.name]: file });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.driverName.trim()) tempErrors.driverName = "Driver name is required";
    if (!formData.userName.trim()) tempErrors.userName = "Username is required";
    if (!formData.password.trim()) tempErrors.password = "Password is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.vehicleNo.trim()) tempErrors.vehicleNo = "Vehicle number is required";
    if (!formData.category) tempErrors.category = "Category is required";
    if (!formData.model.trim()) tempErrors.model = "Model is required";
    if (!formData.color) tempErrors.color = "Color is required";
    if (!formData.fuelType) tempErrors.fuelType = "Fuel type is required";
    if (!formData.transmission) tempErrors.transmission = "Transmission type is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) return;

    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("vehicleImage", formData.vehicleImage);
    formDataToSend.append("driverName", formData.driverName);
    formDataToSend.append("userName", formData.userName);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("manufactureYear", formData.manufactureYear);
    formDataToSend.append("vehicleNo", formData.vehicleNo);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("color", formData.color);
    formDataToSend.append("fuelType", formData.fuelType);
    formDataToSend.append("transmission", formData.transmission);
    formDataToSend.append("licenseExpireDate", formData.licenseExpireDate);
    formDataToSend.append("licenseImage", formData.licenseImage);
    formDataToSend.append("insuranceExpireDate", formData.insuranceExpireDate);
    formDataToSend.append("insuranceImage", formData.insuranceImage);
    formDataToSend.append("driverlicenseImage", formData.driverlicenseImage);
    formDataToSend.append("registrationStatus", formData.registrationStatus);
    formDataToSend.append("isActive", formData.isActive);

    try {
      const response = await fetch("http://localhost:8080/auth/vehicleregister", {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Vehicle registration failed");
      }

      navigate("/dashboard");
    } catch (error) {
      setErrorMessage(error.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-100">
      {/* Left Side Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-800 relative overflow-hidden">
        <img
          src="https://i.pinimg.com/736x/de/4c/ff/de4cff9451fecfa90035e22cf41c69c5.jpg"
          alt="Vehicle registration"
          className="object-cover w-full h-full opacity-80 hover:opacity-100 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
      </div>

      {/* Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-lg bg-white rounded-xl shadow-xl p-8 space-y-6 border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-gray-800">Vehicle Registration</h1>

          {errorMessage && <p className="text-red-600 text-sm text-center bg-red-100 p-2 rounded">{errorMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Vehicle Image */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Vehicle Image</label>
              <div className="relative">
                <Image className="absolute left-3 top-2.5 h-5 w-5 text-blue-600" />
                <input
                  type="file"
                  name="vehicleImage"
                  onChange={handleFileUpload}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Driver Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Driver Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-blue-600" />
                <input
                  type="text"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter driver name"
                />
              </div>
              {errors.driverName && <p className="text-red-600 text-xs">{errors.driverName}</p>}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-blue-600" />
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter username"
                />
              </div>
              {errors.userName && <p className="text-red-600 text-xs">{errors.userName}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-blue-600" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter password"
                />
              </div>
              {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Email</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-blue-600" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email"
                />
              </div>
              {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
            </div>

            {/* Vehicle Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Vehicle Number</label>
              <div className="relative">
                <Car className="absolute left-3 top-2.5 h-5 w-5 text-blue-600" />
                <input
                  type="text"
                  name="vehicleNo"
                  value={formData.vehicleNo}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter vehicle number"
                />
              </div>
              {errors.vehicleNo && <p className="text-red-600 text-xs">{errors.vehicleNo}</p>}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Category</label>
              <div className="relative">
                <Car className="absolute left-3 top-2.5 h-5 w-5 text-blue-600" />
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.categoryId} value={category.categoryname}>
                      {category.categoryname}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && <p className="text-red-600 text-xs">{errors.category}</p>}
            </div>

            {/* Model */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Model</label>
              <div className="relative">
                <Car className="absolute left-3 top-2.5 h-5 w-5 text-blue-600" />
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter vehicle model"
                />
              </div>
              {errors.model && <p className="text-red-600 text-xs">{errors.model}</p>}
            </div>

            {/* Color */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Color</label>
              <div className="relative">
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter color"
                />
              </div>
              {errors.color && <p className="text-red-600 text-xs">{errors.color}</p>}
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Fuel Type</label>
              <div className="relative">
                <Fuel className="absolute left-3 top-2.5 h-5 w-5 text-blue-600" />
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                >
                  <option value="">Select fuel type</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>
              {errors.fuelType && <p className="text-red-600 text-xs">{errors.fuelType}</p>}
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Transmission Type</label>
              <div className="relative">
                <Settings className="absolute left-3 top-2.5 h-5 w-5 text-blue-600" />
                <input
                  type="text"
                  name="transmission"
                  value={formData.transmission}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter transmission type"
                />
              </div>
              {errors.transmission && <p className="text-red-600 text-xs">{errors.transmission}</p>}
            </div>

            {/* License Expire Date */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">License Expire Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="licenseExpireDate"
                  value={formData.licenseExpireDate}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* License Image */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">License Image</label>
              <div className="relative">
                <input
                  type="file"
                  name="licenseImage"
                  onChange={handleFileUpload}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Insurance Expire Date */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Insurance Expire Date</label>
              <div className="relative">
                <input
                  type="date"
                  name="insuranceExpireDate"
                  value={formData.insuranceExpireDate}
                  onChange={handleChange}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Insurance Image */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Insurance Image</label>
              <div className="relative">
                <input
                  type="file"
                  name="insuranceImage"
                  onChange={handleFileUpload}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Driver License Image */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Driver License Image</label>
              <div className="relative">
                <input
                  type="file"
                  name="driverlicenseImage"
                  onChange={handleFileUpload}
                  className="pl-10 w-full py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default VehicleRegister;