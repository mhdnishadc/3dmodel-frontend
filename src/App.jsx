import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ModelViewer from './components/ModelViewer';
import UploadForms from './components/UploadForms';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadForms />} />
            <Route path="/view/:id" element={<ModelViewer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;