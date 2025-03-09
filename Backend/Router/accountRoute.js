import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import { user } from "../Model/sample.js";
import {ticket} from "../Model/sample.js";



const accountRoute = Router();

accountRoute.get("/profile/:email",authenticate, async (req, res) => {
    try {
      const { email } = req.params;
  
      const userProfile = await user.findOne({ eMail: email }, "-password");
      if (userProfile) {
        res.status(200).json(userProfile);
      }
      else{
        res.status(404).json({ message: "Profile not found" });
      }
      
    } catch {
      res.status(500).json({message: "Internal Server Error"});
    }
});
  
accountRoute.patch('/editProfile', authenticate, async (req, res) => {
    try {
      const {Name,Email,PhoneNo} = req.body;
  
        const updatedProfile = await user.findOneAndUpdate(
            {eMail: Email},
            {Name, PhoneNo},
            {new: true}
        );
  
        if (updatedProfile) {
            res.status(200).json({ msg: 'Profile updated successfully', result: updatedProfile });
        }else{
            res.status(404).json({ msg: "Profile not found" });
        }
    }
    catch {
      res.status(500).send("Internal Server Error");
    }
});
  

accountRoute.post('/bookTicket', authenticate, async (req, res) => {
    try {
      const { Name,Email,PhoneNo,EventName,SeatingType,NoOfTicket} = req.body;
  
        const newTicket = new ticket({
            name:Name,
            eMail:Email,
            phoneNo:PhoneNo,
            eventName:EventName,
            seatingType:SeatingType,
            No_OfTicket:NoOfTicket
        });
  
      await newTicket.save();
      res.status(201).send("Your ticket has been booked successfully");
      console.log(newTicket);
    } catch {
      res.status(500).send("Internal Server Error");
    }
});
  

accountRoute.delete('/cancelTicket',authenticate,async(req,res)=>{
    try{
        const {EventName} = req.body;
        console.log(EventName);
        const result = await ticket.findOne({eventName:EventName});
        if(result){
            await ticket.findOneAndDelete({eventName:EventName});
            res.status(200).json({msg:'Ticket deleted successfully'})
        }else{
            res.status(404).json({msg :`Ticket doesn't exist`});
        }
    }
    catch{
        res.status(500).send("Internal Sever Error");
    }

})
accountRoute.get("/filterEvents", async (req, res) => {

  const { date, price, location } = req.query;
  let filter = {};

  if (date) {
      const parsedDate = new Date(date);
      if (!isNaN(parsedDate)) {
          filter.date = parsedDate;
      }
  }
  
  if (price) {
      filter.price = Number(price); // Ensure it's a number
  }
  
  if (location) {
      filter.location = new RegExp(location, "i"); // Case-insensitive search
  }

  try {
    const events = await event.find(filter); 
    res.json(events);
  } catch (error) {
      console.error("Error fetching events:", error);
      res.status(500).json({ error: "Server Error" });
  }
});

export {accountRoute}

