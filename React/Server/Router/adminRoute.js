import { Router } from "express";
import authenticate from "../Middleware/auth.js";
import adminCheck from "../Middleware/adminAuth.js";
import { event } from "../Model/sample.js";
import upload from "../Middleware/upload.js";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { booking } from "../Model/sample.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const adminRoute = Router();

adminRoute.post('/addEvent', authenticate, adminCheck, upload.single("EventImage"), async (req, res) => {
    try {
        const { Eventname, Organizer, Description, Venue, Location, NoOfTickets, VIPSeats, StandardSeats, Date, Time, Price } = req.body;
        const activeEvent = await event.findOne({ eventName: Eventname });

        if (activeEvent) {
            return res.status(400).json({ msg: `${Eventname} already exists` });
        }

        let imageFilename = null;
        if (req.file) {
            imageFilename = req.file.filename;  // Store filename in DB
        }

        const newEvent = new event({
            image: imageFilename,  // Store only filename, not whole file object
            eventName: Eventname,
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
        res.status(201).json({ msg: `${Eventname} added successfully`, image: imageFilename });

    }catch (error) {
        console.error("Error in addEvent:", error);
        res.status(500).send("Internal Server Error");
    }
});

adminRoute.get('/getAllEvents', async (req, res) => {
    try {
        const events = await event.find();
        console.log("Fetched Events:", events);  // ✅ Log fetched data
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ msg: "Internal Server Error" });
    }
});

adminRoute.get('/getEvent', async (req, res) => {
    try {
      const name = req.query.eventName;
      console.log("Requested event:", name);
  
      const result = await event.findOne({ eventName: name });
  
      if (!result) {
        return res.status(404).json({ msg: "No such event available" });
      }
  
      // Return JSON with event details, including a URL to fetch the image
      res.status(200).json({
                imageUrl:`/api/getEventImage?eventName=${encodeURIComponent(name)}`,
                eventName:result.eventName,
                organizer:result.organizer,
                description:result.description,
                venue:result.venue,
                location:result.location,
                No_of_Tickets:result.No_Of_Tickets,
                vipSeats:result.vipSeats,
                standardSeats:result.standardSeats,
                date:result.date,
                time:result.time,
                price:result.price
      });
  
    } catch (error) {
      console.error("Error fetching course:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  })

  adminRoute.get('/getEventImage', async (req, res) => {
    try {
        const eName = req.query.eventName;
        console.log("Fetching image for event:", eName);

        const eventdetails = await event.findOne({ eventName: eName });
        if (!eventdetails || !eventdetails.image) {
            return res.status(404).json({ msg: "No image available for this event" });
        }

        const imagePath = path.join(__dirname, '..', 'uploads', eventdetails.image); // Ensure correct path

        res.sendFile(imagePath); // Serve the image file

    } catch (error) {
        console.error("Error fetching event image:", error);
        res.status(500).send("Internal Server Error");
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
                
                res.status(201).json({msg: `${Eventname} updated successfully`})
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
    
adminRoute.post('/bookingDetails', authenticate, adminCheck, async (req, res) => {
    try {
      const { Eventname, Organizer, Eventdate, TotalSeats, VIPSeats, StandardSeats } = req.body;
  
      const existingBooking = await booking.findOne({ eventName: Eventname });
      if (existingBooking) {
        return res.status(400).json({ msg: "Booking details for this event already exist." });
      }
  
      const newBooking = new booking({
        eventName: Eventname,
        organizer: Organizer,
        eventDate: Eventdate,
        totalSeats: TotalSeats,
        vipSeats: {
          total: VIPSeats.Total,
          sold: VIPSeats.Sold,
          unsold: VIPSeats.Unsold,
        },
        standardSeats: {
          total: StandardSeats.Total,
          sold: StandardSeats.Sold,
          unsold: StandardSeats.Unsold,
        },
      });
  
      await newBooking.save();
  
      res.status(201).json({ msg: `${Eventname} booking details added successfully.` });
      console.log(newBooking);
    } catch {
      res.status(500).send("Internal Server Error");
    }
});

adminRoute.get('/viewBookDetails',authenticate,adminCheck,async(req,res)=>{
    try{
        const eventname = req.query.ename;
        console.log(eventname);

        const bookData = await booking.findOne({eventName:eventname});
        if(bookData){
            res.status(200).json({data:bookData});
        }else{
            res.status(404).json({msg:"No such event available"});
        }
    }
    catch{
        res.status(500).send("Internal Server Error");
    }
});
 
adminRoute.patch('/editBookedDetails',authenticate,adminCheck,async(req,res)=>{
    try{
        const {Eventname,Eventdate} = req.body;
        const result = await booking.findOne({eventName: Eventname});
            console.log(result)
            if(result){
                
                result.eventName = Eventname,
                result.eventDate = Eventdate

                await result.save();
                res.status(200).json({msg: `${Eventname} updated successfully`});
                console.log(result)
            }else{
                res.status(404).json({msg :`${Eventname} doesnot exist`}); 
            }  
    }
    catch{
        res.status(500).send("Internal Server Error");
    }
});

adminRoute.delete('/deleteBookedDetails',authenticate,adminCheck,async(req,res)=>{
    try{
        const {Eventname} = req.body;
        console.log(Eventname);
        const result = await booking.findOne({eventName:Eventname});
        if(result){
            await event.findOneAndDelete({eventName:Eventname});
            res.status(200).json({msg:`${Eventname} has been deleted successfully `})
        }else{
            res.status(404).json({msg :`${Eventname} doesnot exist`});
        }
    }
    catch{
        res.status(500).send("Internal Sever Error");
    }

});

export {adminRoute}

