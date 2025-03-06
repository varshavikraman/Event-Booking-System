import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import logo from '../assets/IMAGE/logo1.jpeg';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract payment details from state (ensure values are properly passed)
    const { 
        Name, 
        Email, 
        PhoneNo, 
        EventName, 
        SeatingType, 
        NoOfTicket, 
        Price 
    } = location.state || {}; 

    // Ensure the price is correctly displayed (fallback to avoid `undefined`)
    const totalAmount = Price !== undefined ? Price : "N/A"; 

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Handle payment
    const handlePayment = async () => {
        setLoading(true);
        setMessage("Processing payment...");

        setTimeout(async () => {
            try {
                const res = await fetch("/api/bookTicket", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        Name: Name,
                        Email: Email,
                        PhoneNo: PhoneNo,
                        EventName: EventName,
                        SeatingType: SeatingType,
                        NoOfTicket: NoOfTicket,
                        Price: Price  
                    }),
                });

                if (!res.ok) throw new Error("Payment failed");

                setMessage("Payment successful!");
                navigate('/confirm', { state: location.state });

            } catch (error) {
                setMessage("Payment failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    // Handle payment cancellation
    const handleCancel = () => {
        setLoading(true);
        setMessage("Cancelling booking...");

        setTimeout(() => {
            setMessage("Payment cancelled.");
            setLoading(false);
            navigate('/');
        }, 2000); 
    };

    return (
        <div className="bg-[#F59B9E] min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6 text-center">
                    
                    {/* Logo */}
                    <div className="mb-4">
                        <img src={logo} alt="logo" className="w-16 h-16 mx-auto" />
                    </div>

                    {/* Title */}
                    <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium mb-4">
                        Booking Payment
                    </h2>

                    {/* Payment Amount */}
                    <p className="text-gray-700 text-lg font-semibold mb-4">
                        Amount to Pay: <span className="text-[#500E10]">₹{totalAmount}</span>
                    </p>

                    {/* Dynamic Message */}
                    {message && (
                        <p className="text-[#500E10] font-semibold mb-4">{message}</p>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-center space-x-4">
                        <button 
                            onClick={handlePayment} 
                            disabled={loading}
                            className="bg-green-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50"
                        >
                            {loading ? "Processing..." : "Pay Now"}
                        </button>

                        <button 
                            onClick={handleCancel} 
                            disabled={loading}
                            className="bg-red-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-red-700 disabled:opacity-50"
                        >
                            {loading ? "Cancelling..." : "Cancel Payment"}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Payment;
