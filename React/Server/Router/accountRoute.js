import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import { user } from "../Model/sample.js";
import {ticket} from "../Model/sample.js";
import { event } from "../Model/sample.js";

const accountRoute = Router();

accountRoute.get("/profile", authenticate, async (req, res) => {
  try {
      const Email = req.Email; 
      const userProfile = await user.findOne({ eMail: Email }).select("-password");

      if (!userProfile) {
          return res.status(404).json({ message: "Profile not found" });
      }

      res.status(200).json({
        Name: userProfile.name,  
        Email: userProfile.eMail, 
        PhoneNo: userProfile.phoneNo || "",
        UserRole: userProfile.userRole
    });
  } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});
  
accountRoute.patch('/editProfile', authenticate, async (req, res) => {
    try {
        const { Name, PhoneNo, Email } = req.body;

        const updatedProfile = await user.findOneAndUpdate(
            { eMail: Email }, 
            { $set: { name: Name, phoneNo: PhoneNo } },
            { new: true }
        );

        if (!updatedProfile) {
            return res.status(404).json({ msg: "Profile not found" });
        }

        res.status(200).json({ 
            msg: 'Profile updated successfully', 
            result: {
                Name: updatedProfile.name,  
                Email: updatedProfile.eMail, 
                PhoneNo: updatedProfile.phoneNo, 
                UserRole: updatedProfile.userRole
            }
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).send("Internal Server Error");
    }
});


accountRoute.get('/getUser', authenticate, async (req, res) => {
    try {
        console.log("Decoded User ID:", req.user_id);

        const userId = req.user_id;

        const userData = await user.findById(userId).select("-password");

        if (!userData) {
            return res.status(404).json({ msg: "User not found" });
        }

        res.status(200).json(userData);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

accountRoute.post('/bookTicket', authenticate, async (req, res) => {
    try {
        const { Name, Email, PhoneNo, EventName, SeatingType, NoOfTicket, Price } = req.body;

        const eventData = await event.findOne({ eventName: EventName });
        if (!eventData) {
            return res.status(404).json({ msg: "Event not found" });
        }

        let seatField = SeatingType === "VIP" ? "vipSeats" : "standardSeats";

        if (eventData.No_of_Tickets < NoOfTicket || eventData[seatField] < NoOfTicket) {
            return res.status(400).json({ msg: "Not enough tickets available" });
        }

        const newTicket = new ticket({
            name: Name,
            eMail: Email,
            phoneNo: PhoneNo,
            eventName: EventName,
            seatingType: SeatingType,
            No_OfTicket: NoOfTicket,
            price: Price
        });

        await newTicket.save();

        const updatedEvent = await event.findOneAndUpdate(
            { 
                eventName: EventName, 
                No_of_Tickets: { $gte: NoOfTicket }, 
                [seatField]: { $gte: NoOfTicket } 
            },
            { 
                $inc: { 
                    No_of_Tickets: -NoOfTicket,  
                    [seatField]: -NoOfTicket 
                } 
            },
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(400).json({ msg: "Not enough tickets available" });
        }

        res.status(200).json({ 
            message: "Your ticket is booked successfully!", 
            booking: {
                Name: newTicket.name,
                Email: newTicket.eMail,
                PhoneNo: newTicket.phoneNo,
                EventName: newTicket.eventName,
                SeatingType: newTicket.seatingType,
                NoOfTicket: newTicket.No_OfTicket,
                Price: newTicket.price
            }
        });

        console.log("Booking Confirmed:", newTicket);

    } catch (error) {
        console.error("Booking Error:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});

accountRoute.get('/getEventPrice/:eventName', authenticate, async (req, res) => {
    try {
        const eName = req.params.eventName;
        console.log("Searching for event:", eName);
        
        const eventData = await event.findOne({ eventName: eName });
        console.log("Event found:", eventData);
        if (!eventData.price) {
            return res.status(404).json({ message: "Price not available" });
        }        

        return res.status(200).json({ standardPrice: eventData.price });
    } catch (error) {
        console.error("Error fetching event price:", error);
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
});

accountRoute.get('/getBooking', authenticate, async (req, res) => {
  try {
    console.log("hi")
      const userEmail = req.Email;
        
      console.log("useremail:",userEmail);
      
      const bookings = await ticket.find({ eMail: userEmail });
      console.log("Fetched Bookings:", bookings);    
      if (!bookings.length) {
          return res.status(404).json({ msg: "No bookings found" });
      }

      res.status(200).json(bookings[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
});

accountRoute.get("/getUserTickets", authenticate, async (req, res) => {
    try {
        const userEmail = req.Email;
        console.log("User Email:", userEmail);

        const tickets = await ticket.aggregate([
            {
                $match: { eMail: userEmail } 
            },
            {
                $lookup: {
                    from: "eventdetails",
                    localField: "eventName",
                    foreignField: "eventName",
                    as: "eventDetails"
                }
            },
            {
                $unwind: {
                    path: "$eventDetails",
                    preserveNullAndEmptyArrays: true 
                }
            }
        ]);

        console.log("Tickets Found:", tickets); 

        res.status(200).json(tickets);
    } catch (error) {
        console.error("Error retrieving tickets:", error);
        res.status(500).json({ message: "Error retrieving tickets" });
    }
});


accountRoute.delete('/cancelTicket', authenticate, async (req, res) => {

    try {
        const { EventName } = req.body;
        const userEmail = req.Email;
        console.log("Cancel Request:",{EventName,userEmail});

      
        const ticketData = await ticket.findOne({ eventName: EventName, eMail: userEmail });

        if (!ticketData) {
          return res.status(404).json({ msg: "Ticket doesn't exist" });
        }

        const noOfCanceledTickets = ticketData.No_OfTicket;

    
        await ticket.findOneAndDelete({ eventName: EventName, eMail: userEmail });

    
        await event.updateOne({ eventName: EventName }, { $inc: { No_of_Tickets: noOfCanceledTickets } });

        res.status(200).json({ msg: "Ticket canceled successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
});

accountRoute.get('/searchEvent', async (req, res) => {
    try {
        const { searchValue } = req.query;
        if (!searchValue) {
            return res.status(400).json({ message: "Query parameter is required" });
        }

        const searchResults = await event.find({
            $or: [
                { eventName: { $regex: searchValue, $options: "i" } },
                { location: { $regex: searchValue, $options: "i" } },
                { organizer: { $regex: searchValue, $options: "i" } }
            ]
        });

        if (searchResults.length === 0) {
            return res.status(404).json({ message: "No events found." });
        }

        res.status(200).json(searchResults);
    } catch (error) {
        console.error("Error searching events:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});



export {accountRoute}

