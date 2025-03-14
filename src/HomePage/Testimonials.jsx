import React from "react";
import { StarIcon, QuoteIcon } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Aif Azmi",
    role: "Regular Customer",
    content: "The best cab service I've ever used! Professional drivers and always on time.",
    rating: 5,
    image: "https://media.licdn.com/dms/image/v2/D4D03AQE5TKsAEsirgQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1709180484464?e=1747267200&v=beta&t=f1yMYCbXjq0EZeNCffW0MnNlplVOESQ6iCE73v_MphI",
  },
  {
    id: 2,
    name: "Manoda Gunesekara",
    role: "Business Traveler",
    content: "Reliable airport transfers and excellent customer service. Highly recommended!",
    rating: 5,
    image: "https://i.pinimg.com/736x/ce/6b/3e/ce6b3ebfff49692e47be9f4722d6fff9.jpg",
  },
  {
    id: 3,
    name: "Dilmina Prabashwara",
    role: "Event Planner",
    content: "Their wedding transportation services are exceptional. Made our special day perfect!",
    rating: 5,
    image: "https://media.licdn.com/dms/image/v2/D5603AQG_iGiYCncb1Q/profile-displayphoto-shrink_200_200/B56ZQTYPElG4AY-/0/1735491909443?e=2147483647&v=beta&t=SBKPhNK8J8QnyVs5UOQHyvFiY3ARIAwTCEDFOj7q_WY",
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied customers
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-6 rounded-full"></div> {/* Changed to blue */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-gray-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <QuoteIcon className="h-10 w-10 text-blue-500 mb-6" /> {/* Changed to blue */}
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 text-blue-500 fill-blue-500" // Changed to blue
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;