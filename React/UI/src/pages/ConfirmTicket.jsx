import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import logo from '../assets/IMAGE/logo1.jpeg';
import Footer from '../components/Footer';

const ConfirmTicket = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState(location.state || {}); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!bookingData || Object.keys(bookingData).length === 0) {
            fetchBookingData();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchBookingData = async () => {
        try {
            const response = await fetch("/api/getBooking", {
                method: "GET",
                credentials: "include",
            });
    
            if (!response.ok) {
                throw new Error("Failed to fetch booking details.");
            }
    
            const data = await response.json();
            setBookingData(data); // ✅ Ensure correct data is set
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="bg-[#F59B9E] min-h-screen">
            <NavBar />
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-32">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6">
                    <div className="text-center mb-4">
                        <img src={logo} alt="logo" className="w-16 h-16 mx-auto" />
                    </div>

                    <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium text-center mb-6">
                        Ticket Booking Successful!
                    </h2>

                    {loading ? (
                        <p className="text-center text-gray-700">Loading booking details...</p>
                    ) : error ? (
                        <p className="text-center text-red-600">{error}</p>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <label className="text-[#981D26] font-medium">Name:</label>
                                <p>{bookingData.name || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <label className="text-[#981D26] font-medium">Email:</label>
                                <p>{bookingData.eMail || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <label className="text-[#981D26] font-medium">Phone No:</label>
                                <p>{bookingData.phoneNo || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <label className="text-[#981D26] font-medium">Event Name:</label>
                                <p>{bookingData.eventName || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <label className="text-[#981D26] font-medium">Seating Type:</label>
                                <p>{bookingData.seatingType || "N/A"}</p>
                            </div>

                            <div className="flex justify-between">
                                <label className="text-[#981D26] font-medium">No. of Tickets:</label>
                                <p>{bookingData.No_OfTicket || "N/A"}</p> 
                            </div>
                        </div>
                    )}

                    <div className="text-center mt-6">
                        <button 
                            onClick={() => navigate('/home')} 
                            className="bg-[#500E10] text-[#F59B9E] font-medium py-2 px-6 rounded-lg hover:bg-[#977073] hover:text-white"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ConfirmTicket;
