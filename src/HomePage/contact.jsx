import React from "react";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-white">
        <div className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
                Get in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500"> 
                  Touch
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Have questions? We're here to help. Send us a message and we'll
                respond as soon as possible.
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300" 
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300" 
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300" 
                      placeholder="Enter your message"
                    ></textarea>
                  </div>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.98]"> 
                    Send Message
                  </button>
                </form>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <PhoneIcon className="h-6 w-6 text-blue-500 mt-1" /> 
                      <div>
                        <p className="font-medium text-gray-900">Phone</p>
                        <p className="text-gray-600">+94 74 0103112</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <MailIcon className="h-6 w-6 text-blue-500 mt-1" /> 
                      <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">megacity749@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <MapPinIcon className="h-6 w-6 text-blue-500 mt-1" /> 
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">241 Bambalapiti Rd, Colombo</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Business Hours
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-600">Monday - Friday: 24/7</p>
                    <p className="text-gray-600">Saturday: 24/7</p>
                    <p className="text-gray-600">Sunday: 24/7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;