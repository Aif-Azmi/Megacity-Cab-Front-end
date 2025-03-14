import React from 'react';
import { motion } from 'framer-motion';
import {
  DollarSignIcon,
  ClockIcon,
  ShieldCheckIcon,
  MapIcon,
  BellIcon,
  UserPlusIcon,
  ChevronRightIcon,
  CheckCircleIcon,
  CarIcon,
  FileTextIcon,
  ShieldIcon,
  CalendarIcon,
} from 'lucide-react';
import Navbar from '../HomePage/Navbar';
import Footer from '../HomePage/Footer';

const Hero = () => {
  return (
    <div className="relative w-full bg-gradient-to-r from-blue-600 to-blue-800 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <img
          src="https://i.pinimg.com/736x/74/7b/f5/747bf51bccd7725a3bb19d9d4a242ed2.jpg"
          className="w-full h-full object-cover"
          alt="Taxi cab on city street"
        />
      </div>
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10 flex items-center justify-center text-center">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
          }}
          className="max-w-3xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Partner Your Vehicle With Us
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Join our fleet of professional drivers and maximize your vehicle's
            earning potential with our trusted cab service network.
          </p>
          <a href="/vehicle-register" className="inline-block">
            <motion.button
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg flex items-center transition-all shadow-lg hover:shadow-xl mx-auto"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Register Now
              <ChevronRightIcon className="ml-2 h-5 w-5" />
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

const Benefits = () => {
  const benefits = [
    {
      icon: <DollarSignIcon className="h-8 w-8" />,
      title: 'Competitive Earnings',
      description:
        'Earn more with our competitive rates, weekly bonuses, and surge pricing during peak hours.',
    },
    {
      icon: <ClockIcon className="h-8 w-8" />,
      title: 'Flexible Schedule',
      description:
        'Work when you want. Set your own hours and maintain complete control of your schedule.',
    },
    {
      icon: <ShieldCheckIcon className="h-8 w-8" />,
      title: 'Insurance Coverage',
      description:
        'Comprehensive insurance coverage for you and your vehicle while on duty with our service.',
    },
    {
      icon: <MapIcon className="h-8 w-8" />,
      title: 'Smart Routing',
      description:
        'Our advanced algorithm ensures optimal routes, minimizing idle time and maximizing earnings.',
    },
    {
      icon: <BellIcon className="h-8 w-8" />,
      title: 'Instant Notifications',
      description:
        'Receive real-time alerts for nearby ride requests to keep you on the move.',
    },
    {
      icon: <UserPlusIcon className="h-8 w-8" />,
      title: 'Growing Customer Base',
      description:
        'Access to our rapidly expanding customer network ensures consistent ride requests.',
    },
  ];
  return (
    <div className="w-full bg-gray-900 text-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: 1,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{
            once: true,
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Partner Your Vehicle With Us
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover the advantages of joining our cab service network and how
            it can transform your vehicle into a consistent source of income.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              viewport={{
                once: true,
              }}
              className="bg-gray-800 p-6 rounded-lg hover:bg-gray-750 transition-colors"
            >
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          viewport={{
            once: true,
          }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">
            Ready to Maximize Your Vehicle's Potential?
          </h3>
          <a href="/register" className="inline-block">
            <motion.button
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg text-lg transition-all shadow-lg"
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Register Your Vehicle Now
            </motion.button>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

const Requirements = () => {
  const requirements = [
    {
      icon: <CarIcon className="h-6 w-6" />,
      title: 'Vehicle Requirements',
      description:
        'Your vehicle must be no more than 7 years old with a minimum 4-door sedan and in excellent condition.',
    },
    {
      icon: <FileTextIcon className="h-6 w-6" />,
      title: 'Documentation',
      description:
        'Valid vehicle registration, comprehensive insurance policy, and commercial permit are required.',
    },
    {
      icon: <ShieldIcon className="h-6 w-6" />,
      title: 'Safety Standards',
      description:
        'Your vehicle must pass our comprehensive safety inspection conducted by certified mechanics.',
    },
    {
      icon: <CalendarIcon className="h-6 w-6" />,
      title: 'Availability',
      description:
        'Minimum commitment of 20 hours per week with flexibility to choose your working hours.',
    },
  ];
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  return (
    <div className="bg-white w-full py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2
            initial={{
              opacity: 0,
              y: -20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            viewport={{
              once: true,
            }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Registration Requirements
          </motion.h2>
          <motion.p
            initial={{
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
            }}
            transition={{
              duration: 0.5,
              delay: 0.2,
            }}
            viewport={{
              once: true,
            }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            To ensure the highest quality service for our customers, we have the
            following requirements for all partner vehicles.
          </motion.p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
          }}
        >
          {requirements.map((req, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex hover:shadow-md transition-shadow"
            >
              <div className="mr-4 text-blue-600">{req.icon}</div>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 mb-2">
                  {req.title}
                </h3>
                <p className="text-gray-600">{req.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          viewport={{
            once: true,
          }}
          className="mt-12 bg-blue-50 p-6 rounded-lg border border-blue-100 flex items-start"
        >
          <div className="mr-4 text-blue-600 mt-1">
            <CheckCircleIcon className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-xl text-gray-900 mb-2">
              Ready to Register?
            </h3>
            <p className="text-gray-600 mb-4">
              If your vehicle meets these requirements, you're ready to join our
              network of professional drivers. Click the Register Now button to
              begin the application process.
            </p>
            <a href="/vehicle-register" className="inline-block">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
              >
                Register Now
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const VehicleHomepage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Benefits />
      <Requirements />
      <Footer />
    </div>
  );
};

export default VehicleHomepage;