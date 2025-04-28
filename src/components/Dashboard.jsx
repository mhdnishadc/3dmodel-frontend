import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import server_url from '../services/ServerUrl';


const Dashboard = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get(`${server_url}/api/models`);
        setModels(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch models');
        setLoading(false);
        console.error(err);
      }
    };

    fetchModels();
  }, []);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">3D Models Dashboard</h1>
      
      <div className="mb-6">
        <Link to="/upload" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Upload New Model
        </Link>
      </div>
      
      {models.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          No models found. Upload your first 3D model!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map(model => (
            <div key={model._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{model.name}</h2>
                <p className="text-gray-600 mb-4">{model.description || 'No description'}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Uploaded on {new Date(model.uploadDate).toLocaleDateString()}
                </p>
                <div className="flex justify-between">
                  <Link 
                    to={`/view/${model._id}`} 
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  >
                    View Model
                  </Link>
                 
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;