import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to the Employee Management App</h1>
        <p className="text-lg mb-6">Manage your employees efficiently and effectively with our tool.</p>
        <div className="flex justify-center gap-5">
          <button
            onClick={() => navigate('/employees')}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Go to Employee Management
          </button>
          <button
            onClick={() => navigate('/log-in')}
            className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
