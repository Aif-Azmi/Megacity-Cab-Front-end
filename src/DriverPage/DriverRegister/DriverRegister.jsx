import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Home, FileText, Calendar, Clock, Lock, Image } from "lucide-react";
import axios from "axios";

const DriverRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    nic: "",
    phone: "",
    emergencyPhone: "",
    address: "",
    licenseNumber: "",
    licenseExpiry: "",
    experienceYears: "",
    userName: "",
    password: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [licenseImage, setLicenseImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          [type]: "Only JPG, PNG, and GIF files are allowed",
        }));
        if (type === "profileImage") setProfileImage(null);
        else setLicenseImage(null);
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [type]: "File size must be less than 10MB",
        }));
        if (type === "profileImage") setProfileImage(null);
        else setLicenseImage(null);
        return;
      }
      setErrors((prev) => ({ ...prev, [type]: "" }));
      if (type === "profileImage") setProfileImage(file);
      else setLicenseImage(file);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName.trim()) tempErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Email is invalid";
    if (!formData.nic.trim()) tempErrors.nic = "NIC is required";
    if (!formData.phone.trim()) tempErrors.phone = "Phone number is required";
    if (!formData.licenseNumber.trim()) tempErrors.licenseNumber = "License number is required";
    if (!formData.licenseExpiry) tempErrors.licenseExpiry = "License expiry date is required";
    if (!formData.userName.trim()) tempErrors.userName = "Username is required";
    if (!formData.password.trim()) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) return;

    setIsLoading(true);

    try {
      const data = new FormData();

      // Append driver details as JSON
      data.append(
        "driver",
        JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          nic: formData.nic,
          phone: formData.phone,
          emergencyPhone: formData.emergencyPhone,
          address: formData.address,
          licenseNumber: formData.licenseNumber,
          licenseExpiry: formData.licenseExpiry,
          experienceYears: parseInt(formData.experienceYears) || 0,
          userName: formData.userName,
          password: formData.password,
          registrationStatus: "PENDING",
        })
      );

      // Append profile image if provided
      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      // Append license image if provided
      if (licenseImage) {
        data.append("licenseImage", licenseImage);
      }

      // Make API call to register driver
      const response = await axios.post(
        "http://localhost:8080/auth/registerwithoutvehicle",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Let axios handle the content type
          },
        }
      );

      if (response.status === 201) {
        alert("Registration successful! Awaiting approval.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrorMessage(
        error.response?.data?.message || "Registration failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full flex">
      {/* Left Side Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://res.cloudinary.com/dzbpb4eis/image/upload/v1740406730/depositphotos_227882802-stock-photo-driver-opening-car-door-young_kdldb1.webp"
          alt="Driver registration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Registration Form */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-sm p-6 space-y-6">
          <h1 className="text-2xl font-semibold text-center">Driver Registration</h1>

          {errorMessage && <p className="text-red-500 text-sm text-center">{errorMessage}</p>}

          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            {/* Profile Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Profile Image (Optional)</label>
              <div className="relative">
                <Image className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="file"
                  name="profileImage"
                  onChange={(e) => handleFileChange(e, "profileImage")}
                  className="pl-10 w-full py-2 border rounded-md"
                  accept="image/jpeg,image/png,image/gif"
                />
              </div>
              {errors.profileImage && <p className="text-red-500 text-xs">{errors.profileImage}</p>}
            </div>

            {/* License Image */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">License Image (Optional)</label>
              <div className="relative">
                <Image className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="file"
                  name="licenseImage"
                  onChange={(e) => handleFileChange(e, "licenseImage")}
                  className="pl-10 w-full py-2 border rounded-md"
                  accept="image/jpeg,image/png,image/gif"
                />
              </div>
              {errors.licenseImage && <p className="text-red-500 text-xs">{errors.licenseImage}</p>}
            </div>

            {/* First Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter first name"
                />
              </div>
              {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter last name"
                />
              </div>
              {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter email"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
            </div>

            {/* NIC */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">NIC</label>
              <div className="relative">
                <FileText className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter NIC"
                />
              </div>
              {errors.nic && <p className="text-red-500 text-xs">{errors.nic}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter phone number"
                />
              </div>
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
            </div>

            {/* Emergency Phone */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Emergency Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="text"
                  name="emergencyPhone"
                  value={formData.emergencyPhone}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter emergency phone"
                />
              </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Address</label>
              <div className="relative">
                <Home className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter address"
                />
              </div>
            </div>

            {/* License Number */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">License Number</label>
              <div className="relative">
                <FileText className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter license number"
                />
              </div>
              {errors.licenseNumber && <p className="text-red-500 text-xs">{errors.licenseNumber}</p>}
            </div>

            {/* License Expiry Date */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">License Expiry Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="date"
                  name="licenseExpiry"
                  value={formData.licenseExpiry}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                />
              </div>
              {errors.licenseExpiry && <p className="text-red-500 text-xs">{errors.licenseExpiry}</p>}
            </div>

            {/* Experience (Years) */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Experience (Years)</label>
              <div className="relative">
                <Clock className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="number"
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter years of experience"
                  min="0"
                />
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter username"
                />
              </div>
              {errors.userName && <p className="text-red-500 text-xs">{errors.userName}</p>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2 h-5 w-5 text-yellow-600" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 w-full py-2 border rounded-md"
                  placeholder="Enter password"
                />
              </div>
              {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-yellow-600 text-white rounded-md disabled:bg-yellow-400 hover:bg-yellow-700 transition-all"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-yellow-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default DriverRegister;