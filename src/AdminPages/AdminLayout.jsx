import React, { useState } from 'react';

import Sidebar from '../AdminPages/Dashboard/Sidebar';
import { Outlet } from 'react-router-dom';
import Header from './Dashboard/Header';


const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      {/* Fixed Sidebar */}

       
       <Header/>
        <Sidebar/>


      {/* Main Content */}
      <div>
        <Outlet/>{/* This will render the nested routes */}
      </div>
    </div>
  );
};

export default AdminLayout;