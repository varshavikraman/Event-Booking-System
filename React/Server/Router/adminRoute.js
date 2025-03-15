import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminAuth.js";
import { event } from "../Model/sample.js";
import upload from "../Middleware/upload.js";
import sharp from "sharp";
import { ticket } from "../Model/sample.js";
import { booking } from "../Model/sample.js";

const convertToBase64 = (buffer) => {
    return buffer.toString('base64');
};

const adminRoute = Router();

adminRoute.post('/addEvent', authenticate, adminCheck, upload.single("EventImage"), async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        const { Eventname, Organizer, Description, Venue, Location, NoOfTickets, VIPSeats, StandardSeats, Date, Time, Price } = req.body;
        
        let ImageFile = "";
        if (req.file) {
            ImageFile = convertToBase64(req.file.buffer);
        }

        const newEvent = new event({
            image: ImageFile,
            eventName: Eventname.trim(),
            organizer: Organizer,
            description: Description,
            venue: Venue,
            location: Location,
            No_of_Tickets: NoOfTickets,
            vipSeats: VIPSeats,
            standardSeats: StandardSeats,
            date: Date,
            time: Time,
            price: Price
        });

        await newEvent.save();
        res.status(201).json({ msg: `${Eventname} added successfully` });

    } catch (error) {
        console.error("Error in addEvent:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});

adminRoute.delete('/deleteEvent', authenticate, adminCheck, async (req, res) => {
    try {
        const { eventName } = req.body; // Ensure the key matches the database field
        if (!eventName) {
            return res.status(400).json({ msg: "Event name is required" });
        }

        const deletedEvent = await event.findOneAndDelete({ eventName });

        if (deletedEvent) {
            return res.status(200).json({ msg: `${eventName} has been deleted successfully` });
        } else {
            return res.status(404).json({ msg: `${eventName} does not exist` });
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

adminRoute.put('/editEvent/:eventName', authenticate, adminCheck, upload.single("EventImage"), async (req, res) => {
    try {
        const { eventName } = req.params;
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        const { Description, Venue, Location, NoOfTickets, VIPSeats, StandardSeats, Date, Time, Price } = req.body;

        let updateFields = {
            description: Description,
            venue: Venue,
            location: Location,
            No_of_Tickets: NoOfTickets,
            vipSeats: VIPSeats,
            standardSeats: StandardSeats,
            date: Date,
            time: Time,
            price: Price
        };

        if (req.file) {
            updateFields.image = convertToBase64(req.file.buffer);
        } else {
            const existingEvent = await event.findOne({ eventName: eventName.trim() });
            if (existingEvent) updateFields.image = existingEvent.image; // Keep the old image
        }

        const updatedEvent = await event.findOneAndUpdate(
            { eventName: eventName.trim() }, 
            updateFields, 
            { new: true }
        );

        if (!updatedEvent) {
            return res.status(404).json({ msg: "Event not found" });
        }

        res.status(200).json({ msg: "Event updated successfully", updatedEvent });
    } catch (error) {
        console.error("Error in editEvent:", error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});


adminRoute.get('/getAllEvents', async (req, res) => {
    try {
        const events = await event.find();
        console.log("Fetched Events:", events); 
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

adminRoute.get('/getEvent', async (req, res) => {
    try {
        let name = req.query.eventName
        console.log("Requested event:", `"${name}"`);

        if (!name) {
            return res.status(400).json({ msg: "Event name is required" });
        }

        const result = await event.findOne({ eventName: (`${name}`) }); 
        if (!result || result.length === 0) {
            return res.status(404).json({ msg: "No such event available" });
        }

        res.status(200).json({
            imageUrl: `/api/getEventImage?eventName=${encodeURIComponent(name)}`,
            eventName: result.eventName,
            organizer: result.organizer,
            description: result.description,
            venue: result.venue,
            location: result.location,
            No_of_Tickets: result.No_of_Tickets,
            vipSeats: result.vipSeats,
            standardSeats: result.standardSeats,
            date: result.date,
            time: result.time,
            price: result.price
        });

    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

adminRoute.get('/getEventImage', async (req, res) => {
    try {
        let eName = req.query.eventName 
        console.log("Requested Event Name:", `"${eName}"`);

        if (!eName) {
            return res.status(400).json({ msg: "Event name is required" });
        }

        const eventDetails = await event.findOne({ eventName: (`${eName}`) });

        if (!eventDetails || !eventDetails.image) {
            return res.status(404).json({ msg: `No image available for event: ${eName}` });
        }

        const imageBuffer = Buffer.from(eventDetails.image, "base64");

        res.set({
            "Content-Type": "image/jpeg",
            "Content-Disposition": `inline; filename="${encodeURIComponent(eName)}.jpg"`,
        });

        res.send(imageBuffer);

    } catch (error) {
        console.error("Error fetching event image:", error.message);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
});
    
adminRoute.get('/getBookings', authenticate, adminCheck, async (req, res) => {
    try {
        const { eventName } = req.query; // Accept eventName as query param

        let query = {};
        if (eventName) {
            const eventData = await event.findOne({ eventName: { $regex: new RegExp(eventName, "i") } }).select('_id');
            if (eventData) {
                query.eventId = eventData._id;
            } else {
                return res.status(404).json({ message: "Event not found" });
            }
        }
        

        const bookings = await booking.find(query)
            .populate("userId", "name eMail") // Fetch user name & email
            .populate("eventId", "eventName location date") // Fetch event details
            .populate("tickets") // Fetch ticket details
            .sort({ createdAt: -1 });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
});


export {adminRoute}

