// Logout.jsx
import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteUserFailure, deleteUserSuccess, signOutUserStart, } from '../redux/user/userSlice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(signOutUserStart());
      const data = await axios.get('/api/auth/logout');
      console.log(data.data);
      dispatch(deleteUserSuccess(data));
      navigate('/log-in');
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Logout</h2>
        <p className="text-center mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-5">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-200"
          >
            Logout
          </button>
          <button
            onClick={() => navigate('/employees')}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Stay Logged In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
