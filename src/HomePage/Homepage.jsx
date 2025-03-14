import React from "react";
import { ChevronRightIcon } from "lucide-react";

const serviceData = [
  {
    id: 1,
    title: "City Rides",
    description: "Comfortable and quick rides within the city limits at affordable rates.",
    image: "https://i.pinimg.com/736x/26/2e/de/262edec40eb9b35a6876b8c12c25363f.jpg",
  },
  {
    id: 2,
    title: "Airport Transfers",
    description: "Reliable airport pickup and drop-off services with flight tracking.",
    image: "https://images.unsplash.com/photo-1529074963764-98f45c47344b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Luxury Rides",
    description: "Premium vehicles with professional chauffeurs for special occasions.",
    image: "https://i.pinimg.com/736x/20/24/4c/20244cfb80fcb6c5fb2a4e18c8357df8.jpg",
  },
  {
    id: 4,
    title: "Wedding Rides",
    description: "Elegant transportation solutions for your special day.",
    image: "https://idak.lk/wp-content/uploads/classified-listing/2024/09/WhatsApp-Image-2024-08-15-at-11.39.17_5548b38e.jpg",
  },
  {
    id: 5,
    title: "Own Rides",
    description: "Drive your own luxury vehicle with confidence and style.",
    image: "https://i.pinimg.com/736x/7f/86/95/7f86953f66fd9f7a7077f07abca4e355.jpg",
  },
  {
    id: 6,
    title: "Tuk Tuk Rides",
    description: "Experience the local culture with our authentic tuk tuk services.",
    image: "https://i.pinimg.com/736x/8a/d3/51/8ad3513832f8a07ba016a4ca4784b35a.jpg",
  },
];

const ServiceCard = ({ service }) => {
  return (
    <div className="group bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2"> {/* Changed to blue */}
      <div className="h-56 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-500 transition-colors duration-300"> {/* Changed to blue */}
          {service.title}
        </h3>
        <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
        <button className="flex items-center text-blue-500 font-medium transition-all duration-300 group-hover:translate-x-2"> {/* Changed to blue */}
          Learn More <ChevronRightIcon className="h-5 w-5 ml-1" />
        </button>
      </div>
    </div>
  );
};

const Services = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from our wide range of professional transportation services
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-6 rounded-full"></div> {/* Changed to blue */}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceData.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;