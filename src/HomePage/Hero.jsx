import React from "react";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div> {/* Changed to blue */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div> {/* Changed to blue */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12">
            <div className="inline-block px-4 py-2 bg-blue-500/10 rounded-full mb-6"> {/* Changed to blue */}
              <span className="text-sm font-semibold text-blue-600 tracking-wide uppercase"> {/* Changed to blue */}
                Your Trusted Ride Partner
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              We Give You{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500"> {/* Changed to blue */}
                Safe Rides
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Professional drivers, comfortable vehicles, and competitive rates.
              Your journey begins with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 py-4 rounded-full font-medium text-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"> {/* Changed to blue */}
                Book a Ride
              </button>
              <button className="bg-white text-gray-800 px-8 py-4 rounded-full font-medium text-lg border-2 border-gray-200 transition-all duration-300 hover:border-blue-500 hover:text-blue-500"> {/* Changed to blue */}
                Learn More
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">15k+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">500+</div>
                <div className="text-sm text-gray-600">Expert Drivers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0">
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-2xl blur-2xl"></div> {/* Changed to blue */}
              <img
                src="https://i.pinimg.com/736x/f0/e8/03/f0e8031c7818fa63be4baa8e0de1f9f7.jpg"
                alt="Professional taxi service"
                className="relative rounded-2xl shadow-2xl w-full h-auto transform transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;