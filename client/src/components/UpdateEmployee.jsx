// components/UpdateEmployee.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    age: '',
    department: '',
    status: '',
  });
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`/api/employees/${id}`);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/employees/${id}`, formData);
      console.log(res.data);
      navigate(`/`); // Redirect to the employee details page
    } catch (err) {
      console.error('Error updating employee:', err.message);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-100">Loading...</div>;
  }

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Update Employee</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          placeholder="Age"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          name="status"
          value={formData.status}
          onChange={handleChange}
          placeholder="Status"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded">
          Update Employee
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
