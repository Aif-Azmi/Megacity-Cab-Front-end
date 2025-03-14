import React from 'react';
import { Check, Clock, FileCheck, ShieldCheck, Car } from 'lucide-react';

const DriverRequirementsSection = () => {
  const requirements = [
    {
      icon: <Clock className="w-6 h-6 text-green-500" />,
      title: "Age Requirement",
      description: "Must be at least 21 years old",
    },
    {
      icon: <FileCheck className="w-6 h-6 text-green-500" />,
      title: "Valid License",
      description: "Clean driving record for past 3 years",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      title: "Background Check",
      description: "Must pass background verification",
    },
    {
      icon: <Car className="w-6 h-6 text-green-500" />,
      title: "Vehicle Requirements",
      description: "4-door vehicle, 10 years old or newer",
    },
  ];

  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Driver Requirements
          </h2>
          <p className="text-xl text-gray-600">
            Here's what you need to get started
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {requirements.map((req, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl border border-gray-100"
            >
              <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mb-4 shadow-sm">
                {req.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {req.title}
              </h3>
              <p className="text-gray-600">{req.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DriverRequirementsSection;
