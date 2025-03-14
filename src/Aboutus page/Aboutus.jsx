import React from 'react';
import { Shield, Clock, Users, Award, CheckCircle, Star } from 'lucide-react';
import Navbar from '../HomePage/Navbar';
import Footer from '../HomePage/Footer';

const Aboutus = () => {
  const stats = [
    {
      number: '10+',
      label: 'Years Experience',
      icon: Clock,
    },
    {
      number: '15k+',
      label: 'Happy Customers',
      icon: Users,
    },
    {
      number: '500+',
      label: 'Expert Drivers',
      icon: Award,
    },
    {
      number: '100%',
      label: 'Safety Record',
      icon: Shield,
    },
  ];

  const values = [
    {
      title: 'Safety First',
      description: 'Regular vehicle maintenance and professional drivers ensure your safety.',
      icon: Shield,
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: 'Reliability',
      description: 'Punctual service and consistent performance you can count on.',
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
    },
    {
      title: 'Customer Focus',
      description: 'Dedicated to exceeding your expectations with premium service.',
      icon: Star,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="bg-white">
        <div className="relative pt-24 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white"></div> 
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute -top-24 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div> 
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div> 
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-6">
              <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full"> 
                <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase"> 
                  Our Journey
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8">
                About{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500"> 
                  Mega City Cab
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your trusted transportation partner since 2010, delivering safe and reliable rides across the city.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <stat.icon className="h-8 w-8 text-blue-500 mb-4" /> 
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">Our Story</h2>
                <p className="text-gray-600 leading-relaxed">
                  Founded with a vision to revolutionize urban transportation, Mega City Cab has grown from a small fleet of cars to become one of the most trusted names in Sri Lanka. Our journey has been driven by our commitment to safety, reliability, and customer satisfaction.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  We take pride in our team of professional drivers who undergo rigorous training and background checks to ensure your safety and comfort. Our fleet is regularly maintained and equipped with the latest safety features.
                </p>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"> 
                  Learn More
                </button>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-2xl"></div> 
                <img
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Our office"
                  className="relative rounded-2xl shadow-2xl w-full h-auto transform transition-transform duration-500 hover:scale-[1.02]"
                />
              </div>
            </div>
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  These principles guide everything we do at Mega City Cab
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className={`bg-gradient-to-r ${value.color} w-12 h-12 rounded-xl flex items-center justify-center mb-6`}>
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Aboutus;