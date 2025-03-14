import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from './AdminLayout'; // Make sure this exists
import AddCategory from '../AdminPages/Dashboard/Pages/CategorySection/AddCategory'; // Make sure this exists
import ManageCategory from '../AdminPages/Dashboard/Pages/CategorySection/ManageCategory'; // Make sure this exists
import Alladmins from '../AdminPages/Alladmins'; // Make sure this exists
import Dashboard from './Dashboard/AdminDashboard/Dashboard';
import Profile from './Dashboard/Pages/Profile';
import ManageVehicles from './Dashboard/VehicleSection/ManageVehicles';


const AdminRoutes = () => {
  return (
    <div>
      <div className="ml-64">
        <Routes>
          {/* Parent route using AdminLayout as wrapper */}
          <Route path="/" element={<AdminLayout />}>
            {/* Child routes */}
            <Route index element={<Dashboard/>} />
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="manage-vehicles" element={<ManageVehicles/>} />
            <Route path="add-category" element={<AddCategory/>} />
            <Route path="manage-categories" element={<ManageCategory/>} />
            <Route path="manage-admins" element={<Alladmins/>} />
            <Route path="profile" element={<Profile/>} />
            <Route path="manage-vehicles" element={<ManageVehicles/>} />
           
            
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default AdminRoutes;