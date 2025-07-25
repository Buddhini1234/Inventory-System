import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SummarySection from './components/SummarySection';
import AddComputer from './pages/AddComputer';
import AddCPU from './pages/AddCPU';
import AddSwitch from './pages/AddSwitch';
import ViewComputers from './pages/ViewComputers';
import ViewCPUs from './pages/ViewCPUs';
import ViewSwitches from './pages/ViewSwitches';
import EditSwitch from './pages/EditSwitch';
import EditCPU from './pages/EditCPU';
import EditComputer from './pages/EditComputer'; //
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer position="top-center" autoClose={2500} />
      <Routes>
        {/* 🏠 Home Route Shows Hero */}
        <Route path="/" element={
          <>
            <HeroSection />
            <SummarySection />
          </>
        } />

        {/* ✅ Add Item Pages */}
        <Route path="/add/computer" element={<AddComputer />} />
        <Route path="/add/cpu" element={<AddCPU />} />
        <Route path="/add/switch" element={<AddSwitch />} />

        {/* ✅ Details Pages */}
        <Route path="/details/computer" element={<ViewComputers />} />
        <Route path="/details/cpu" element={<ViewCPUs />} />
        <Route path="/details/switch" element={<ViewSwitches />} />

        {/* ✅ Edit Page for Switch */}
        <Route path="/edit-switch/:id" element={<EditSwitch />} />
        <Route path="/edit-cpu/:id" element={<EditCPU />} />
        <Route path="/edit-computer/:id" element={<EditComputer />} />
      </Routes>
    </Router>
  );
}

export default App;
