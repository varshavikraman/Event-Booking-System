import React, { useState } from 'react';
import DashNav from '../components/DashNav';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const AddEvent = () => {
  const navigate = useNavigate();

  const [eventImage, setEventImage] = useState(null);
  const [eventName, setEventName] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [location, setLocation] = useState("");
  const [noOfTickets, setNoOfTickets] = useState("");
  const [vipSeats, setVipSeats] = useState("");
  const [standardSeats, setStandardSeats] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(""); 
  const [price, setPrice] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("EventImage", eventImage);  
      formData.append("Eventname", eventName);
      formData.append("Organizer", organizer);
      formData.append("Description", description);
      formData.append("Venue", venue);
      formData.append("Location", location);
      formData.append("NoOfTickets", noOfTickets);
      formData.append("VIPSeats", vipSeats);
      formData.append("StandardSeats", standardSeats);
      formData.append("Date", date);
      formData.append("Time", time);
      formData.append("Price", price);

      const res = await fetch("/api/addEvent", {
        method: "POST",
        credentials: "include",
        body: formData,  
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.msg || "Error adding event");
      }

      alert("Event added successfully!");
      navigate('/dashboard');

    } catch (err) {
      console.error(err);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFCCD5]">
    <div className="flex flex-col md:flex-row">
      <DashNav />
      <div className="flex-1 px-4 py-8">
        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6">
          <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium text-center mb-6">
            Add Event
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input 
                type="file" 
                id="image" 
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="mb-4">
              <label className="text-[#981D26] block">Event Name:</label>
              <input 
                type="text" 
                id="name" 
                required 
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="text-[#981D26] block">Organizer:</label>
              <input 
                type="text" 
                id="organizer" 
                required 
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="text-[#981D26] block">Description:</label>
              <textarea 
                rows="5" 
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="w-full sm:w-1/2">
                <label className="text-[#981D26]">Venue:</label>
                <input 
                  type="text" 
                  id="venue" 
                  required 
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                />
              </div>

              <div className="w-full sm:w-1/2">
                <label className="text-[#981D26]">Location:</label>
                <input 
                  type="text" 
                  id="location" 
                  required 
                  className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="text-[#981D26]">No of Tickets:</label>
              <input 
                type="number" 
                id="ticketCount" 
                required 
                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                value={noOfTickets}
                onChange={(e) => setNoOfTickets(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <fieldset className="space-x-2">
                <legend className="text-[#981D26]">Seating Types:</legend>
                <label className="text-[#981D26]">VIP Seats:</label>
                <input 
                  type="number"
                  id="VIP-count"
                  required 
                  className="w-[25%] mt-1 border border-gray-300 rounded-lg px-4 py-2"
                  value={vipSeats}
                  onChange={(e) => setVipSeats(e.target.value)}
                />
                <label className="text-[#981D26]">Standard Seats:</label>
                <input 
                  type="number" 
                  id="Standard-count" 
                  required className="w-[25%] mt-1 border border-gray-300 rounded-lg px-4 py-2"
                  value={standardSeats}
                  onChange={(e) => setStandardSeats(e.target.value)}
                />
              </fieldset>
            </div>

            <div className="flex  gap-4 mb-4">
                <div className="w-full sm:w-1/2">
                    <label className="text-[#981D26]">Date:</label>
                     <input 
                       type="date" 
                       id="date" 
                       required 
                       className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                       value={date} 
                       onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                <div className="w-full sm:w-1/2">
                    <label className="text-[#981D26]">Time:</label>
                    <input 
                       type="time" 
                       id="time" 
                       required className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                       value={time} 
                       onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                <div className=" sm:w-1/2">
                    <label className="text-[#981D26]">Price:</label>
                    <input 
                     type="number" 
                     id="price" 
                     required 
                     className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                     value={price} 
                     onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
              </div>
            <div className="text-center">
              <button type="submit" className="bg-[#500E10] text-[#F59B9E] font-medium py-2 px-6 rounded-lg hover:bg-[#977073] hover:text-white">
                Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default AddEvent;
