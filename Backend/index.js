import express, {json} from 'express';
import dotenv from 'dotenv';
import { userRoute } from './Router/userRoute.js';
import { adminRoute } from './Router/adminRoute.js';
import { accountRoute } from './Router/accountRoute.js';
import mongoose from 'mongoose';


dotenv.config();

const app=express();

app.use(json());

app.use('/',userRoute);
app.use('/',adminRoute);
app.use('/',accountRoute);

mongoose.connect('mongodb://localhost:27017/DancingLeaf').then(()=>{
    console.log('mongoDB is connected successfully to Dancing Leaf');
    })
    .catch((error)=>{
        console.error('MongoDB connection failed',error);
    });
    

app.listen(process.env.PORT,function(){
     console.log(`server is listening at ${process.env.PORT}`);
     
})