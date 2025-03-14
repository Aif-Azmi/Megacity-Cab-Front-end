import React, { useState } from "react";
import { Mail, Lock } from "lucide-react";
import Navbar from "../HomePage/Navbar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Utils/AuthContext"; // Import useAuth

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.username.trim()) tempErrors.username = "Username is required";
    if (!formData.password.trim()) tempErrors.password = "Password is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validate()) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: formData.username,
          password: formData.password,
        }),
      });

      const result = await response.json();
      console.log("Login Response:", result); // Detailed logging

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      // Store the token, role, user ID, and username in local storage
      localStorage.setItem("jwtToken", result.token);
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("role", result.role);
      localStorage.setItem("username", formData.username);

      // Call the login function from AuthContext
      login(result.token);

      // Redirect based on role
      switch (result.role) {
        case "ROLE_CUSTOMER":
          navigate("/");
          break;
        case "ROLE_DRIVER":
          navigate("/driver-dashboard");
          break;
        case "ROLE_ADMIN":
          navigate("/admin");
          break;
        case "ROLE_VEHICLE":
          navigate("/vehicle-dashboard");
          break;
        default:
          setErrorMessage("Unknown role received");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setErrorMessage(error.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen w-full flex">
        <div className="hidden lg:flex lg:w-1/2 relative">
          <img
            src="https://res.cloudinary.com/dzbpb4eis/image/upload/v1740408070/hotel-chauffeur-service_iiwaho.jpg"
            alt="Driver opening car door"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full lg:w-1/2 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <h1 className="text-2xl font-semibold text-gray-900 text-center">
                Welcome to Mega City Cab
              </h1>
              {errorMessage && (
                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-blue-500" /> {/* Changed to blue */}
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      className={`block w-full pl-10 px-3 py-2 border rounded-md ${
                        errors.username ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your username"
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-blue-500" /> {/* Changed to blue */}
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`block w-full pl-10 px-3 py-2 border rounded-md ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter your password"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition disabled:opacity-50" 
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/register"
                    className="text-blue-500 hover:text-blue-600 font-semibold" 
                  >
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;