
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Home from "./components/pages/Home";
import Login from "./components/pages/Login"; 
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Residents from "./components/pages/dashboard/Residents";
import Complaints from "./components/pages/dashboard/Complaints";
import Maintenance from "./components/pages/dashboard/Maintenance";
import Visitors from "./components/pages/dashboard/Visitors";
import Notices from "./components/pages/dashboard/Notices";
import Amenities from "./components/pages/dashboard/Amenities";
import Staff from "./components/pages/dashboard/Staff";
import Reports from "./components/pages/dashboard/Reports";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import AdminResidents from "./components/pages/admin/Residents";
import AdminComplaints from "./components/pages/admin/Complaints";
import AdminMaintenance from "./components/pages/admin/Maintenance";
import AdminNotices from "./components/pages/admin/Notices";
import AdminVisitors from "./components/pages/admin/Visitors";
import AdminAmenities from "./components/pages/admin/Amenities";
import AdminReports from "./components/pages/admin/Reports";
import AdminStaff from "./components/pages/admin/Staff";





   function App() { return (
     <BrowserRouter> 
      <Routes> 
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/residents"
  element={
    <ProtectedRoute>
      <Residents />
    </ProtectedRoute>
  }
/>

<Route
  path="/complaints"
  element={
    <ProtectedRoute>
      <Complaints />
    </ProtectedRoute>
  }
/>

<Route
  path="/maintenance"
  element={
    <ProtectedRoute>
      <Maintenance />
    </ProtectedRoute>
  }
/>

<Route
  path="/visitors"
  element={
    <ProtectedRoute>
      <Visitors />
    </ProtectedRoute>
  }
/>

<Route
  path="/notices"
  element={
    <ProtectedRoute>
      <Notices />
    </ProtectedRoute>
  }
/>

<Route
  path="/amenities"
  element={
    <ProtectedRoute>
      <Amenities />
    </ProtectedRoute>
  }
/>

<Route
  path="/staff"
  element={
    <ProtectedRoute>
      <Staff />
    </ProtectedRoute>
  }
/>

<Route
  path="/reports"
  element={
    <ProtectedRoute>
      <Reports />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/residents"
  element={
    <ProtectedRoute>
      <AdminResidents />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/complaints"
  element={
    <ProtectedRoute>
      <AdminComplaints />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/maintenance"
  element={
    <ProtectedRoute>
      <AdminMaintenance />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/notices"
  element={
    <ProtectedRoute>
      <AdminNotices />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/visitors"
  element={
    <ProtectedRoute>
      <AdminVisitors />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/amenities"
  element={
    <ProtectedRoute>
      <AdminAmenities />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/reports"
  element={
    <ProtectedRoute>
      <AdminReports />
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/Staff"
  element={
    <ProtectedRoute>
      <AdminStaff />
    </ProtectedRoute>
  }
/>
      </Routes> 
      </BrowserRouter> 
          ); } 
          
export default App;