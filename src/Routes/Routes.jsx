// import React from "react";
import { Route, Routes } from "react-router-dom";
import UserDashboard from "../components/UserDashboard";
import UserAttendance from "../components/UserAttendance";
import LeadsTable from "../components/LeadTable";

const AllRoutes = () => {
  


  return (
    <Routes>
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/attendance" element={<UserAttendance />} />
        <Route path="/leadsTable" element={<LeadsTable />} />
   
    </Routes>
  );
};

export default AllRoutes;
