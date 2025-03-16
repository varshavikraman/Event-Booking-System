import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const BookTicket = () => {
    const navigate = useNavigate();
    const { eventName } = useParams();

    const [user, setUser] = useState({
        name: '',
        email: '',
        phoneNo: ''
    });

    const [seatingType, setSeatingType] = useState("Standard");
    const [noOfTickets, setNoOfTickets] = useState(1);
    const [standardPrice, setStandardPrice] = useState(null);
    const [loadingPrice, setLoadingPrice] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const res = await fetch('/api/getUser', { credentials: "include" });
                if (!res.ok) throw new Error("Failed to fetch user details");

                const data = await res.json();
                setUser({
                    name: data.name || '',
                    email: data.eMail || '',
                    phoneNo: data.phoneNo || ''
                });
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        };

        fetchUserDetails();
    }, []);

    useEffect(() => {
        const fetchEventPrice = async () => {
            try {
                const res = await fetch(`/api/getEventPrice/${eventName}`);
                if (!res.ok) throw new Error("Failed to fetch event price");
    
                const data = await res.json();
                console.log("Event Price Data:", data);
                setStandardPrice(data.standardPrice || 0);
                setLoadingPrice(false);
            } catch (error) {
                console.error("Error fetching event price:", error);
                setLoadingPrice(false);
            }
        };
    
        fetchEventPrice();
    }, [eventName]);

    const calculateTotalPrice = () => {
        if (loadingPrice || standardPrice === null) return "N/A";
        const pricePerSeat = seatingType === "VIP" ? standardPrice * 1.5 : standardPrice;
        return pricePerSeat * noOfTickets;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleProceedToPayment = () => {
        navigate('/payment', {
            state: {
                    Name: user.name,
                    Email: user.email,
                    PhoneNo: user.phoneNo,
                    EventName: eventName,
                    SeatingType: seatingType,
                    NoOfTicket: noOfTickets,
                    Price: calculateTotalPrice()
                }
            });
        };
    
    return (
        <div className="bg-[#FFCCD5]">
            <NavBar />
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-32">
                <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6">
                    <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium text-center mb-6">
                        Book Ticket
                    </h2>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="text-[#981D26] block">Name:</label>
                            <input 
                                type="text" 
                                name="name"
                                value={user.name}
                                onChange={(e) => setUser({...user, name: e.target.value})}
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 bg-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-[#981D26] block">Email:</label>
                            <input 
                                type="email" 
                                name="email"
                                value={user.email}
                                onChange={(e) => setUser({...user, email: e.target.value})}
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 bg-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="text-[#981D26] block">Phone No:</label>
                            <input 
                                type="text" 
                                name="phoneNo"
                                value={user.phoneNo}
                                onChange={(e) => setUser({...user, phoneNo: e.target.value})}
                                className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 bg-white"
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
                                    onChange={(e) => setNoOfTickets(parseInt(e.target.value))}
                                    className="w-20 mt-1 bg-white border border-gray-300 rounded-lg px-4 py-2"
                                >
                                    {[...Array(6).keys()].map(n => (
                                        <option key={n+1} value={n+1}>{n+1}</option>
                                    ))}
                                </select>
                            </div>  
                        </div>

                        <div className="mb-4">
                        <label className="text-[#981D26] block font-medium">Total Price:</label>
                        <input
                            type="text"
                            value={loadingPrice ? "Fetching..." : `₹${calculateTotalPrice() !== "N/A" ? calculateTotalPrice() : 0}`}
                            readOnly
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2 bg-gray-100 font-semibold text-[#981D26]"
                        />
                        </div>


                        <div className="text-center">
                        <button 
                                onClick={handleProceedToPayment}
                                className="bg-[#500E10] text-[#F59B9E] font-medium py-2 px-6 rounded-lg hover:bg-[#977073] hover:text-white"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default BookTicket;
