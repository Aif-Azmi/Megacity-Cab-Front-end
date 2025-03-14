import React from "react";
import Navbar from "../HomePage/Navbar";
import HeroSection from "./HeroSection";
import BenefitSection from "./BenefitSection";
import DriverRequirementsSection from "./DriverRequirmentsSection";
import ReviewSection from "./ReviewSection";
import VehicleOptionSection from "./VehicleOptionsSection";

 // ✅ Added Footer

const DriverPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <VehicleOptionSection />
        <BenefitSection />
        <DriverRequirementsSection />
        <ReviewSection />

        {/* ✅ Call-to-Action Section */}
        <div className="bg-gray-800 text-white text-center py-12 px-4">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg mb-6">
            Join us and start earning with your vehicle or rent one to get
            started.
          </p>
          <a
            href="/driver-register"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Register Now
          </a>
        </div>
      </main>
      <Footer /> {/* ✅ Added Footer */}
    </div>
  );
};

export default DriverPage;
