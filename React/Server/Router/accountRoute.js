import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import { user } from "../Model/sample.js";
import {ticket} from "../Model/sample.js";
import { event } from "../Model/sample.js";


accountRoute.get("/profile", authenticate, async (req, res) => {
  try {
      const email = req.user.email; 
      const userProfile = await user.findOne({ eMail: email }, "-password");

      if (!userProfile) {
          return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json(userProfile);
  } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
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
      const { Name, Email, PhoneNo, EventName, SeatingType, NoOfTicket } = req.body;

      const eventData = await event.findOne({ eventName: EventName });
      if (!eventData) {
          return res.status(404).json({ msg: "Event not found" });
      }

      if (eventData.No_of_Tickets < NoOfTicket) { // Correct condition (not <=)
          return res.status(400).json({ msg: "Not enough tickets available" });
      }

      const newTicket = new ticket({
          name: Name,
          eMail: Email,
          phoneNo: PhoneNo,
          eventName: EventName,
          seatingType: SeatingType,
          No_OfTicket: NoOfTicket
      });

      await newTicket.save();

      // Corrected: Decrease available tickets
      await event.updateOne({ eventName: EventName }, { $inc: { No_of_Tickets: -NoOfTicket } });

      res.status(201).send("Your ticket has been booked successfully");
      console.log(newTicket);

  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});


accountRoute.delete('/cancelTicket', authenticate, async (req, res) => {
  try {
      const { EventName } = req.body;
      console.log(EventName);

      // Find the ticket
      const ticketData = await ticket.findOne({ eventName: EventName });

      if (!ticketData) {
          return res.status(404).json({ msg: "Ticket doesn't exist" });
      }

      const noOfCanceledTickets = ticketData.No_OfTicket; // Get the number of tickets booked

      // Delete the ticket
      await ticket.findOneAndDelete({ eventName: EventName });

      // Increase the available tickets in event details
      await event.updateOne({ eventName: EventName }, { $inc: { No_of_Tickets: noOfCanceledTickets } });

      res.status(200).json({ msg: "Ticket canceled successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});


export {accountRoute}

