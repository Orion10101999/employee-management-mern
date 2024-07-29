const express = require('express');
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path')

const mongoDB = require('./config/db.js')
const authRoutes = require('./routes/user.route.js');
const employeeRoutes = require('./routes/employeeRoute.js');

mongoDB()
.then(()=>{
  app.listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));
})
.catch((err)=>{
  console.log(err);
})

const app = express();
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})


// Middleware

app.use(express.json({ extended: false }));
app.use(cookieParser());
// Routes
app.use('/api/employees', employeeRoutes);
app.use('/api/auth', authRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.json({
    success: false,
    statusCode,
    message,
  });
});

