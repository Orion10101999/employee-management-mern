// components/SingleEmployeeDetails.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SingleEmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employees/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Error: {error}</div>;
  }

  if (!employee) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Employee not found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Employee Details</h2>
        <p><strong>Name:</strong> {employee.name}</p>
        <p><strong>Address:</strong> {employee.address}</p>
        <p><strong>Age:</strong> {employee.age}</p>
        <p><strong>Department:</strong> {employee.department}</p>
        <p><strong>Status:</strong> {employee.status}</p>
      </div>
    </div>
  );
};

export default SingleEmployeeDetails;
