import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import { user } from "../Model/sample.js";
import {ticket} from "../Model/sample.js";
import { event } from "../Model/sample.js";

const accountRoute = Router();

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

// Route to retrieve user details
accountRoute.get('/getUser', authenticate, async (req, res) => {
    try {
        console.log("Decoded User ID:", req.user_id);
        // Get user ID from the authentication middleware
        const userId = req.user_id;

        // Find the user in the database without returning the password
        const userData = await user.findById(userId).select("-password");

        // If no user found, return error
        if (!userData) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Send user data
        res.status(200).json(userData);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

accountRoute.post('/bookTicket', authenticate, async (req, res) => {
    try {
        const { Name, Email, PhoneNo, EventName, SeatingType, NoOfTicket, Price } = req.body;

        // Find the event
        const eventData = await event.findOne({ eventName: EventName });
        if (!eventData) {
            return res.status(404).json({ msg: "Event not found" });
        }

        // Determine which seat type to update
        let seatField = SeatingType === "VIP" ? "vipSeats" : "standardSeats";

        // Check ticket availability
        if (eventData.No_of_Tickets < NoOfTicket || eventData[seatField] < NoOfTicket) {
            return res.status(400).json({ msg: "Not enough tickets available" });
        }

        // Create a new ticket booking
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

        // Update event ticket counts (total and seat type)
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

        // Send structured response
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
      const userEmail = req.Email; // Extracting email from authenticated user
        
      console.log("useremail:",userEmail);
      
      const bookings = await ticket.find({ eMail: userEmail }); // Fetch bookings
      console.log("Fetched Bookings:", bookings);    
      if (!bookings.length) {
          return res.status(404).json({ msg: "No bookings found" });
      }

      res.status(200).json(bookings[0]); // ✅ Send only the latest booking
  } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
});

accountRoute.get("/getUserTickets", authenticate, async (req, res) => {
    try {
        const userEmail = req.Email; // Get user email from the authentication token
        console.log("User Email:", userEmail); // Debugging

        const tickets = await ticket.aggregate([
            {
                $match: { eMail: userEmail } // Find user's tickets
            },
            {
                $lookup: {
                    from: "eventdetails", // MongoDB collection name (ensure lowercase & pluralized correctly)
                    localField: "eventName",
                    foreignField: "eventName",
                    as: "eventDetails"
                }
            },
            {
                $unwind: {
                    path: "$eventDetails",
                    preserveNullAndEmptyArrays: true // Ensure tickets without matching events don't break the response
                }
            }
        ]);

        console.log("Tickets Found:", tickets); // Debugging

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

      // Find the ticket
      const ticketData = await ticket.findOne({ eventName: EventName, eMail: userEmail });

      if (!ticketData) {
          return res.status(404).json({ msg: "Ticket doesn't exist" });
      }

      const noOfCanceledTickets = ticketData.No_OfTicket; // Get the number of tickets booked

      // Delete the ticket
      await ticket.findOneAndDelete({ eventName: EventName, eMail: userEmail });

      // Increase the available tickets in event details
      await event.updateOne({ eventName: EventName }, { $inc: { No_of_Tickets: noOfCanceledTickets } });

      res.status(200).json({ msg: "Ticket canceled successfully" });
  } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
  }
});


export {accountRoute}

