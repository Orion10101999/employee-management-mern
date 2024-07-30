// components/EmployeeList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/api/employees');
        const reverseData = (response.data).reverse()
        setEmployees(reverseData);
      } catch (err) {
        console.error('Error fetching employees:', err.message);
      }
    };

    fetchEmployees();
  }, [employees]);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`/api/employees/${id}`);
      console.log(res.data);
      setEmployees(employees.filter(employee => employee.employeeId !== id));
    } catch (err) {
      console.error('Error deleting employee:', err.message);
    }
  };

  const handleEdit = (id) => {
    console.log(`Edit employee with ID: ${id}`);
    navigate(`/edit/${id}`)
  };
  
  const handleShowDetails = (id) => {
    
    console.log(`Show details of employee with ID: ${id}`);
    navigate(`/details/${id}`)

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Employee List</h2>
        {employees.length > 0 ? (
          <ul>
            {employees.map((employee,i) => (
              <li key={employee.employeeId} className="p-4 border-b border-gray-200">
                <p><strong>EmployeeId:</strong> {employee.employeeId}</p>
                <p><strong>Name:</strong> {employee.name}</p>
                <p><strong>Address:</strong> {employee.address}</p>
                <p><strong>Age:</strong> {employee.age}</p>
                <p><strong>Department:</strong> {employee.department}</p>
                <p><strong>Status:</strong> {employee.status}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleShowDetails(employee.employeeId)}
                    className="px-4 py-2 text-white bg-green-500 rounded"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleEdit(employee.employeeId)}
                    className="px-4 py-2 text-white bg-blue-500 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(employee.employeeId)}
                    className="px-4 py-2 text-white bg-red-500 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500">No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
