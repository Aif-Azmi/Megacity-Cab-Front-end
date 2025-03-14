import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./HomePage/Header";
import Hero from "./HomePage/Hero";
import Login from "./LoginPage/Login";
import Navbar from "./HomePage/Navbar";
import Homepage from "./HomePage/Homepage";
import Register from "./LoginPage/Register";
import VehicleRegister from "./VehiclePage/VehicleRegister/VehicleRegister";
import CustomerProfile from "./Customer/CustomerProfile";
import AdminRoutes from "./AdminPages/AdminRoutes";
import VehicleSelect from "./BookingPage/VehicleSelect";
import BookingPage from "./Bookings/Bookingpage";
import Footer from "./HomePage/Footer";
import VehicleHomepage from "./VehiclePage/vehiclehomepage";
import Aboutus from "./Aboutus page/Aboutus";
import Testimonials from "./HomePage/Testimonials";
import Contact from "./HomePage/contact";



function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Navbar />
              <Header />
              <Hero />
              <Homepage />
              <Testimonials/>
              <Footer/>
            </main>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="vehicle" element={<VehicleHomepage/>} />
        <Route path="about" element={<Aboutus/>} />
        <Route path="rides" element={<VehicleSelect/>} />
        <Route path="/contact" element={<Contact/>} />

        
        <Route path="/vehicle-register" element={<VehicleRegister/>} />
        <Route path="profile" element={<CustomerProfile/>} />
        <Route path="map" element={<BookingPage/>} />
        
          

        {/* ✅ Corrected Admin Route */}
        <Route path="/admin/*" element={<AdminRoutes />} />


       
      </Routes>
    </>
  );
}

export default App;
