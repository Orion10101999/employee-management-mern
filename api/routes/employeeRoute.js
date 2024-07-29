const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel.js');
const verifyToken = require('../middlewares/authenticate.js');


router.use(verifyToken)
// Create a new employee
router.post('/', async (req, res) => {
  try {
    const { name, address, age, department, status } = req.body;
    let employeeId = (await Employee.countDocuments()) + 1;
    let notUniqueEmpId = await Employee.findOne({employeeId})
    while(notUniqueEmpId){
      employeeId += 1
      notUniqueEmpId = await Employee.findOne({employeeId})
    }
    const employee = new Employee({ employeeId, name, address, age, department, status });
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all employees
router.get('/', async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get an employee by ID
router.get('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an employee
router.put('/:id', async (req, res) => {
  try {
    const { name, address, age, department, status } = req.body;
    const employee = await Employee.findOne({ employeeId: req.params.id });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    // Save old data to audit trail
    const oldData = {
      name: employee.name,
      address: employee.address,
      age: employee.age,
      department: employee.department,
      status: employee.status
    };
    employee.auditTrail.push({ oldData, newData: req.body });

    // Update employee data
    employee.name = name;
    employee.address = address;
    employee.age = age;
    employee.department = department;
    employee.status = status;

    await employee.save();
    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete an employee
router.delete('/:id', async (req, res) => {
  try {
    const employee = await Employee.findOneAndDelete({ employeeId: req.params.id });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
