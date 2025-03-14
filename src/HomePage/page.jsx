import React from 'react'

const page = () => {
    return (
        <div>
          {/* Hero Section */}
          {/* Services Section */}
          <section className="py-16 bg-gray-100">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">Our Services</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8">
                We provide safe, reliable, and comfortable rides with experienced drivers and well-maintained vehicles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold">City Rides</h3>
                  <p className="text-gray-600">Enjoy smooth and secure rides around the city with our premium service.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold">Airport Transfers</h3>
                  <p className="text-gray-600">Reliable pick-up and drop-off service for all major airports.</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-2xl font-semibold">Luxury Rides</h3>
                  <p className="text-gray-600">Experience top-tier comfort and style in our luxury fleet.</p>
                </div>
              </div>
            </div>
          </section>
    
          {/* Testimonials Section */}
          <section className="py-16">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6">What Our Customers Say</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8">
                Hear from our satisfied customers who trust us for their daily travel needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600">
                    "The best ride service! Always punctual and professional."
                  </p>
                  <h4 className="text-xl font-semibold mt-4">- John Doe</h4>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <p className="text-gray-600">
                    "Very safe and comfortable rides. Highly recommended!"
                  </p>
                  <h4 className="text-xl font-semibold mt-4">- Jane Smith</h4>
                </div>
              </div>
            </div>
          </section>
    
          {/* Contact Section */}
          <section className="bg-yellow-400 text-white py-16 text-center">
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Have questions? Contact us today and book your next ride with confidence.
            </p>
            <button className="bg-white text-yellow-500 py-3 px-8 rounded-full font-semibold text-lg shadow-lg hover:bg-gray-200 transition-all duration-300">
              Contact Us
            </button>
          </section>
        </div>
      );
    };
    

export default page