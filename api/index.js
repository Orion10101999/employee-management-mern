const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()


const mongoDB = require('./src/config/db.js')
const authRoutes = require('./src/routes/user.route.js');
const employeeRoutes = require('./src/routes/employeeRoute.js');

const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ extended: false }));
app.use(cookieParser());
// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req,res)=>{
  res.json({message : "Employee Management App"})
});

mongoDB()
.then(()=>{
  app.listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));
})
.catch((err)=>{
  console.log(err);
})


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.json({
    success: false,
    statusCode,
    message,
  });
});

