// components/EmployeeForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const EmployeeForm = () => {
  const initialFormData = {
    name: '',
    address: '',
    age: '',
    department: '',
    status: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEmployee = await axios.post('/api/employees', formData);
      console.log('Employee created:', newEmployee.data);
      setFormData(initialFormData); // Reset the form data
    } catch (err) {
      console.error('Error creating employee:', err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="w-full max-w-lg p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Create Employee</h2>
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
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
