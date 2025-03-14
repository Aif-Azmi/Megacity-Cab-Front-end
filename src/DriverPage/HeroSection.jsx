import React from "react";
import { ArrowRight } from "lucide-react"; // Import ArrowRight icon

const HeroSection = () => {
  return (
    <div className="relative w-full bg-gradient-to-r from-black via-gray-800 to-navy-900 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzbpb4eis/image/upload/v1740479486/driving-at-night-1920x774px_vadcpq.jpg')] bg-cover bg-center opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Side - Text Content */}
          <div className="text-left lg:w-1/2">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Drive Your Future Forward
              <span className="block text-gray-300 mt-2">Be Your Own Boss</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl">
              Join thousands of successful drivers who are making great income
              on their own schedule. Start your journey today.
            </p>
            <button className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 shadow-lg">
              Start Earning Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="lg:w-1/2">
            <img
              src="https://res.cloudinary.com/dzbpb4eis/image/upload/v1740479807/360_F_123522493_qV0XZfz5gH3zeWFq1YiNCwpDT8HPfvZL_sus0ty.jpg"
              alt="Happy driver with car"
              className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
