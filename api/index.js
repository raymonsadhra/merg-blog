import express from 'express';
import mongoose from 'mongoose';
import configDotenv from 'dotenv';

configDotenv.config();

mongoose.connect(process.env.MONGO).then( () => { console.log('MongoDb is connected') }, )

const app = express();
app.listen(3000, () =>{    
    console.log('Server is running on port 3000');

}); 