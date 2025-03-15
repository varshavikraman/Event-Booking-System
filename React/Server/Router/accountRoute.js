import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import { user } from "../Model/sample.js";
import {ticket} from "../Model/sample.js";
import { event } from "../Model/sample.js";
import { booking } from "../Model/sample.js";

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
        console.log("Received Request Body:", req.body);

        const { Name, Email, PhoneNo, EventName, SeatingType, NoOfTicket, Price } = req.body;
        const userId = req.user_id;

        console.log("User ID:", userId); // Debug user ID

        if (!EventName) {
            return res.status(400).json({ msg: "Event Name is required" });
        }

        const eventData = await event.findOne({ eventName: EventName });
        if (!eventData) {
            return res.status(404).json({ msg: "Event not found" });
        }

        let seatField = SeatingType === "VIP" ? "vipSeats" : "standardSeats";

        if (eventData.No_of_Tickets < NoOfTicket || eventData[seatField] < NoOfTicket) {
            return res.status(400).json({ msg: "Not enough tickets available" });
        }

        const eventBookings = await ticket.find({ eMail: Email, eventName: EventName });
        const totalTicketsForEvent = eventBookings.reduce((sum, ticket) => sum + ticket.No_OfTicket, 0);
        const remainingTicketsForEvent = 6 - totalTicketsForEvent;

        if (remainingTicketsForEvent <= 0) {
            return res.status(400).json({ msg: "You have reached the maximum limit of 6 tickets for this event." });
        }

        if (NoOfTicket > remainingTicketsForEvent) {
            return res.status(400).json({ msg: `You can only book ${remainingTicketsForEvent} more ticket(s) for this event.` });
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

        let userBooking = await booking.findOne({ userId, eventId: eventData._id });

        if (!userBooking) {
            userBooking = new booking({
                userId: userId,
                eventId: eventData._id,
                tickets: [],
                status: "Confirm"
            });

            await userBooking.save(); // Ensure it's saved
        }

        userBooking.tickets.push(newTicket._id);
        console.log("Booking Data:", { userId, eventId: eventData?._id });

        await userBooking.save();

        const updatedEvent = await event.findOneAndUpdate(
            { eventName: EventName },
            { $inc: { No_of_Tickets: -NoOfTicket, [seatField]: -NoOfTicket } },
            { new: true }
        );

        console.log("Updated Event Data:", updatedEvent);

        res.status(200).json({
            message: "Your ticket is booked successfully!",
            booking: newTicket
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

const UserBookings = async (req, res) => {
    try {
        const userId = req.user_id; // Assuming user is authenticated

        const bookings = await booking.find({ userId })
            .populate("eventId", "eventName image venue location date time") // Get event details
            .populate("tickets", "seatingType No_OfTicket") // Get seat details
            .lean();

        // Format response
        const formattedBookings = bookings.map(booking => ({
            eventName: booking.eventId.eventName,
            eventInfo: {
                image: booking.eventId.image,
                venue: booking.eventId.venue,
                location: booking.eventId.location,
                date: booking.eventId.date,
                time: booking.eventId.time
            },
            seatDetails: booking.tickets.map(ticket => ({
                seatType: ticket.seatingType,
                count: ticket.No_OfTicket
            })),
            status: booking.status 
        }));

        res.status(200).json({ bookings: formattedBookings });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

accountRoute.get("/getUserTickets", authenticate, UserBookings);

accountRoute.delete('/cancelTicket', authenticate, async (req, res) => {
    try {
        const { EventName, cancelSeats } = req.body;  // cancelSeats = [{ SeatType: "vip", cancelCount: 2 }, { SeatType: "standard", cancelCount: 3 }]
        console.log("Cancel request received:", req.body);
        const userEmail = req.Email;

        if (!EventName || !Array.isArray(cancelSeats) || cancelSeats.length === 0) {
            return res.status(400).json({ msg: "Invalid cancellation request." });
        }

        // Step 1: Fetch user ID
        const userData = await user.findOne({ eMail: userEmail });
        if (!userData) {
            return res.status(404).json({ msg: "User not found." });
        }
        const userId = userData._id;

        // Step 2: Find the user's booking
        const userBooking = await booking.findOne({ userId }).populate("tickets");

        if (!userBooking || userBooking.tickets.length === 0) {
            return res.status(404).json({ msg: "No matching booking found." });
        }

        let totalCanceledTickets = 0; // Track total canceled tickets for updating event

        // Step 3: Process each seat type cancellation
        for (const { SeatType, cancelCount } of cancelSeats) {
            if (!SeatType || cancelCount <= 0) continue;

            // Find the ticket for the specific seat type
            const userTicket = userBooking.tickets.find(ticket =>
                ticket.eventName === EventName && ticket.seatingType === SeatType
            );

            if (!userTicket) {
                console.warn(`No ticket found for ${SeatType}, skipping.`);
                continue;
            }

            if (cancelCount > userTicket.No_OfTicket) {
                return res.status(400).json({ msg: `Cannot cancel more tickets than booked for ${SeatType}.` });
            }

            totalCanceledTickets += cancelCount; // Track for event update

            if (cancelCount === userTicket.No_OfTicket) {
                // Remove the ticket from booking
                await ticket.deleteOne({ _id: userTicket._id });
                userBooking.tickets = userBooking.tickets.filter(t => t._id.toString() !== userTicket._id.toString());
            } else {
                // Reduce ticket count
                userTicket.No_OfTicket -= cancelCount;
                await userTicket.save();
            }
        }

        // Step 4: Remove booking if no tickets remain
        if (userBooking.tickets.length === 0) {
            userBooking.status = "Cancelled"; // Mark as cancelled
            await userBooking.save();
        }

        // Step 5: Update event details (seat counts & total tickets)
        const eventData = await event.findOne({ eventName: EventName });
        if (!eventData) {
            return res.status(404).json({ msg: "Event not found." });
        }

        cancelSeats.forEach(({ SeatType, cancelCount }) => {
            if (SeatType.toLowerCase() === "vip") {
                eventData.vipSeats += cancelCount;
            } else {
                eventData.standardSeats += cancelCount;
            }
        });

        eventData.No_of_Tickets += totalCanceledTickets; // Restore total available tickets
        await eventData.save();

        res.status(200).json({ msg: `Successfully canceled tickets. Event seat count updated.` });

    } catch (error) {
        console.error("Error canceling ticket:", error);
        res.status(500).json({ msg: "Internal Server Error" });
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

