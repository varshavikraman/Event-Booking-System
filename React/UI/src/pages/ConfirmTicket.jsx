import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import logo from '../assets/IMAGE/logo1.jpeg';
import Footer from '../components/Footer';

const ConfirmTicket = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const initialBookingData = location.state?.booking || {}; 
    const [bookingData, setBookingData] = useState(initialBookingData);
    const [loading, setLoading] = useState(!location.state?.booking);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!location.state?.booking) {
            fetchBookingData();
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
            setBookingData(data.booking);  
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#FFCCD5] min-h-screen">
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
                            <p><strong>Name:</strong> {bookingData.Name || "N/A"}</p>
                            <p><strong>Email:</strong> {bookingData.Email || "N/A"}</p>
                            <p><strong>Phone No:</strong> {bookingData.PhoneNo || "N/A"}</p>
                            <p><strong>Event Name:</strong> {bookingData.EventName || "N/A"}</p>
                            <p><strong>Seating Type:</strong> {bookingData.SeatingType || "N/A"}</p>
                            <p><strong>No. of Tickets:</strong> {bookingData.NoOfTicket || "N/A"}</p>
                            <p className="text-lg font-bold"><strong>Total Price:</strong> ₹{bookingData.Price || "N/A"}</p>
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
