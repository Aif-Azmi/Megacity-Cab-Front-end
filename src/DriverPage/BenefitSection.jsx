import React from 'react';
import { Clock, DollarSign, Calendar, Shield } from 'lucide-react';

const BenefitSection = () => {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-amber-500" />,
      title: "Flexible Hours",
      description: "Work when you want, as much as you want",
    },
    {
      icon: <DollarSign className="w-8 h-8 text-amber-500" />,
      title: "Competitive Earnings",
      description: "Earn great income with competitive rates",
    },
    {
      icon: <Calendar className="w-8 h-8 text-amber-500" />,
      title: "Weekly Payments",
      description: "Get paid weekly, directly to your account",
    },
    {
      icon: <Shield className="w-8 h-8 text-amber-500" />,
      title: "Insurance Coverage",
      description: "Comprehensive insurance while on duty",
    },
  ];

  return (
    <div className="w-full bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Why Drive With Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg hover:bg-amber-50 transition-colors"
            >
              <div className="inline-block mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BenefitSection;
