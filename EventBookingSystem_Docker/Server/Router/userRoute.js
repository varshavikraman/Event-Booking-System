import { Router } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {user} from "../Model/sample.js";

dotenv.config();

const userRoute = Router();

userRoute.post('/signup', async (req, res) => {
    try {
        const { Name, Email, PhoneNo, UserRole, Password } = req.body;
        console.log(Name);

        const activeUser = await user.findOne({ eMail: Email });
        if (activeUser) {
            return res.status(400).json({ message: "This Email address already exists" });
        }

        if (UserRole === 'Admin') {
            const adminExists = await user.findOne({ userRole: "Admin" });
            if (adminExists) {
                return res.status(403).json({ message: "An Admin already exists. You can only register as a user." });
            }
        }

        const newPassword = await bcrypt.hash(Password, 10);

        const newUser = new user({
            name: Name,
            eMail: Email,
            phoneNo: PhoneNo,
            userRole: UserRole,
            password: newPassword
        });

        await newUser.save();
        res.status(201).json({ message: "Registration completed successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


userRoute.post('/signin',async(req,res)=>{
    try{
        const {Email,Password}=req.body;
        const result = await user.findOne({eMail:Email});
        if(!result){
            res.status(400).send("Enter the valid password")
        }
        else{
            console.log(result.password);
            const valid = await bcrypt.compare(Password,result.password);
            console.log(valid);
            if(valid){
                const token = jwt.sign({ _id: result._id,eMail:Email,userRole:result.userRole},process.env.SECRET_KEY,{expiresIn:'1h'});
                console.log(token);
                res.cookie('authToken',token,
                    {
                        httpOnly:true
                });
                res.status(200).json({message:"You have successfully signed in"});
            }
            else{

                res.status(401).send("Unauthorized access");

            }
        }
    }
    catch{
        res.status(500).send("Internal Server Error")
    }
});



userRoute.get('/signout',(req,res)=>{
    res.clearCookie("authToken");
    res.status(200).json({msg:"Signed off"});
});

export {userRoute}