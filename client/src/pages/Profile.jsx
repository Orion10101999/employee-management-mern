// src/components/Profile.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  if (!currentUser) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>
        <p className="text-lg mb-2"><strong>Name:</strong> {currentUser.rest.name}</p>
        <p className="text-lg mb-2"><strong>Email:</strong> {currentUser.rest.email}</p>
        <p className="text-lg mb-2"><strong>Created At:</strong> {new Date(currentUser.rest.createdAt).toLocaleString()}</p>
        <p className="text-lg mb-2"><strong>Updated At:</strong> {new Date(currentUser.rest.updatedAt).toLocaleString()}</p>
        <p className="text-lg mb-2"><strong>ID:</strong> {currentUser.rest._id}</p>
      </div>
    </div>
  );
};

export default Profile;
