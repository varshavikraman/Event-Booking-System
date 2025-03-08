import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminAuth.js";
import { event } from "../Model/sample.js";
import upload from "../Middleware/upload.js";
import sharp from "sharp";
import { ticket } from "../Model/sample.js";

const convertToBase64 = (buffer) => {
    return buffer.toString('base64');
};

const adminRoute = Router();

adminRoute.post('/addEvent', authenticate, adminCheck, upload.single("EventImage"), async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file); // Debugging

        const { Eventname, Organizer, Description, Venue, Location, NoOfTickets, VIPSeats, StandardSeats, Date, Time, Price } = req.body;
        
        let ImageFile = "";
        if (req.file) {
            ImageFile = convertToBase64(req.file.buffer);  // Convert image to base64
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

adminRoute.patch('/editEvent',authenticate,adminCheck,async(req,res)=>{
    try{
        const {Eventname,Venue,Price} = req.body;
        const result = await event.findOne({eventName:Eventname,});
            if(result){
                result.eventName = Eventname,
                result.venue = Venue,
                result.price = Price

                await result.save();
                
                res.status(200).json({msg: `${Eventname} updated successfully`})
                console.log(Eventname)
            }else{
                res.status(400).json({msg :`${Eventname} doesn't exist`}); 
            }
    }
    catch{
        res.status(500).send("Internal Sever Error");
    }
});

adminRoute.patch('/editEvent',authenticate,adminCheck,async(req,res)=>{
    try{
        const {Eventname,Venue,Price} = req.body;
        const result = await event.findOne({eventName:Eventname,});
            if(result){
                result.eventName = Eventname,
                result.venue = Venue,
                result.price = Price

                await result.save();
                
                res.status(200).json({msg: `${Eventname} updated successfully`})
                console.log(Eventname)
            }else{
                res.status(400).json({msg :`${Eventname} doesn't exist`}); 
            }
    }
    catch{
        res.status(500).send("Internal Sever Error");
    }
});

adminRoute.delete('/deleteEvent',authenticate,adminCheck,async(req,res)=>{
    try{
        const {EventName} = req.body;
        console.log(EventName);
        const result = await event.findOne({eventName:EventName});
        if(result){
            await event.findOneAndDelete({eventName:EventName});
            res.status(200).json({msg:`${EventName} has been deleted successfully `})
        }else{
            res.status(404).json({msg :`${EventName} doesnot exist`});
        }
    }
    catch{
        res.status(500).send("Internal Sever Error");
    }

})
    
adminRoute.get('/bookings', authenticate, adminCheck, async (req, res) => {
    try {
        const bookings = await ticket.find({}, { _id: 1, name: 1, eMail: 1, eventName: 1, seatingType: 1, No_OfTicket: 1, price: 1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export {adminRoute}

