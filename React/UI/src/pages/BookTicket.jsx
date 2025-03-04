import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const BookTicket = () => {
    const navigate = useNavigate();
      
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [phoneNo, setPhoneNo] = useState("");
      const [eventName] = useParams();
      const [seatingType, setSeatingType] = useState("Standard");
      const [noOfTickets, setNoOfTickets] = useState("1");

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("Name", name);
          formData.append("Email", email);
          formData.append("PhoneNo", phoneNo);
          formData.append("EventName", eventName);
          formData.append("SeatingType", seatingType);
          formData.append("NoOfTickets", noOfTickets);


          const res = await fetch("/api/bookTicket", {
            method: "POST",
            credentials: "include",
            body: formData,
          });
    
          if (!res.ok) {
            throw new Error("Error adding event");
          }
    
          alert("Ticket Booked successfully!");
          navigate('/confirmation');
    
        } catch (err) {
          console.error(err);
          alert("Something went wrong: " + err.message);
        }
      };
  return (
    <div className="bg-[#F59B9E]">
        <NavBar />
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-32">
            <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6">
                <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium text-center mb-6">
                    Book Ticket
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label  className="text-[#981D26] block">Name:</label>
                        <input 
                            ttype="text" 
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required 
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-[#981D26] block">Email:</label>
                        <input 
                            ype="email" 
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-[#981D26] block">Phone No:</label>
                        <input 
                            type="text" 
                            name="phoneNo"
                            value={phoneNo}
                            onChange={(e) => setPhoneNo(e.target.value)}
                            required 
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-[#981D26] block">Event Name:</label>
                        <input 
                            type="text"
                            name="eventName" 
                            value={eventName} 
                            readOnly 
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
                        />
                    </div>

                    <div className="flex mb-4 space-x-20">
                        <div>
                            <label className="text-[#981D26]">Seating Type:</label>
                            <br />
                            <select 
                                name="seatingType"
                                value={seatingType}
                                onChange={(e) => setSeatingType(e.target.value)}
                                className="w-20 mt-1 bg-white border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <option value="VIP">VIP</option>
                                <option value="Standard">Standard</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[#981D26]">No of Ticket:</label>
                            <br />
                            <select 
                                name="noOfTickets"
                                value={noOfTickets}
                                onChange={(e) => setNoOfTickets(e.target.value)}
                                className="w-20 mt-1 bg-white border border-gray-300 rounded-lg px-4 py-2"
                            >
                                {[...Array(6).keys()].map(n => (
                                    <option key={n+1} value={n+1}>{n+1}</option>
                                ))}

                            </select>
                        </div>  
                    </div>

                    <div className="text-center">
                        <Link to="/confirmation">
                            <button 
                                type="submit" 
                                className="bg-[#500E10] text-[#F59B9E] font-medium py-2 px-6 rounded-lg hover:bg-[#977073] hover:text-white"
                            >
                                Book Now
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default BookTicket
