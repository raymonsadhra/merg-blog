import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.rout.js'; 
import authRoutes from './routes/auth.route.js';  
import cookieParser from 'cookie-parser';
import postRoutes from './routes/post.route.js';
dotenv.config(); 

mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('MongoDB is connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

const app = express();

app.use(express.json()); //stops from being undefined
app.use(cookieParser());
app.use('/api/post',postRoutes);

app.listen(3000, () =>{    
    console.log('Server is running on port 3000');

});

app.use('/api/user', userRoutes);  
app.use('/api/auth', authRoutes);
