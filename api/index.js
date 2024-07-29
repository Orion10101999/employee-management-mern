
import express from 'express'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import path from 'path'
import mongoDB from './config/db.js'
import authRoutes from './routes/user.route.js';
import employeeRoutes from './routes/employeeRoute.js';

mongoDB()
.then(()=>{
  app.listen(process.env.PORT || 3000, () => console.log('Server running on port 3000'));
})
.catch((err)=>{
  console.log(err);
})

const app = express();

const dirname = path.resolve();

app.use(express.static(path.join(dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(dirname, 'client', 'dist', 'index.html'));
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

