const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, unique: true },
  name: String,
  address: String,
  age: Number,
  department: String,
  status: String,
  auditTrail: [{
    oldData: Object,
    newData: Object,
    dateChanged: { type: Date, default: Date.now }
  }]
},{timestamps: true});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
