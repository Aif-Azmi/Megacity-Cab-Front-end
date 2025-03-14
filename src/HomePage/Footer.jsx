import React from "react";
import { PhoneIcon, MailIcon, MapPinIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              Mega City Cab
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Providing safe and reliable transportation services since 2010. Your
              comfort and safety are our top priorities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Quick Links
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div> {/* Changed to blue */}
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", path: "/" },
                { label: "About Us", path: "/about" },
                { label: "Services", path: "/rides" },
                { label: "Book a Ride", path: "/vehicle" },
                { label: "Contact", path: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-500 transition-colors duration-300 inline-block transform hover:translate-x-2" 
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Our Services
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div> {/* Changed to blue */}
            </h3>
            <ul className="space-y-3">
              {[
                "City Rides",
                "Airport Transfers",
                "Luxury Rides",
                "Wedding Rides",
                "Tuk Tuk Rides",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/rides"
                    className="text-gray-400 hover:text-blue-500 transition-colors duration-300 inline-block transform hover:translate-x-2" 
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative inline-block">
              Contact Us
              <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div> {/* Changed to blue */}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-4">
                <PhoneIcon className="h-6 w-6 text-blue-500" /> {/* Changed to blue */}
                <span className="text-gray-400 hover:text-blue-500 transition-colors duration-300"> {/* Changed to blue */}
                  +94 740103112
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <MailIcon className="h-6 w-6 text-blue-500" /> {/* Changed to blue */}
                <span className="text-gray-400 hover:text-blue-500 transition-colors duration-300"> {/* Changed to blue */}
                  megacity749@gmail.com
                </span>
              </li>
              <li className="flex items-start space-x-4">
                <MapPinIcon className="h-6 w-6 text-blue-500" /> {/* Changed to blue */}
                <span className="text-gray-400 hover:text-blue-500 transition-colors duration-300"> {/* Changed to blue */}
                  241 Bambalapiti Rd, Colombo
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <p className="text-gray-400 text-center text-sm">
            © {new Date().getFullYear()} Mega City Cab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;