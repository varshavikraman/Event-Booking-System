import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import logo from '../assets/IMAGE/logo1.jpeg';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { 
        Name, 
        Email, 
        PhoneNo, 
        EventName, 
        SeatingType, 
        NoOfTicket, 
        Price 
    } = location.state || {}; 

    console.log("Location State:", location.state);

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
                        Name,
                        Email,
                        PhoneNo,
                        EventName,
                        SeatingType,
                        NoOfTicket,
                        Price  
                    }),
                });

                const bookingData = await res.json(); // Parse response

                if (!res.ok) {
                    throw new Error(bookingData.msg || "Payment failed"); // Use error message from server
                }

                setMessage("Payment successful!");
                navigate('/confirm', { state: bookingData });

            } catch (error) {
                console.error("The error is:", error);
                alert(error.message); // Show alert message for errors
                setMessage("Payment failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    // Handle booking cancellation
    const handleCancel = () => {
        setLoading(true);
        setMessage("Cancelling booking...");

        setTimeout(() => {
            setMessage("Payment cancelled.");
            setLoading(false);
            navigate(`/book/${EventName}`);
        }, 2000); 
    };

    return (
        <div className="bg-[#FFCCD5] min-h-screen flex flex-col">
            <NavBar />
            <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6 text-center">
                    
                    
                    <div className="mb-4">
                        <img src={logo} alt="logo" className="w-16 h-16 mx-auto" />
                    </div>

                    
                    <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium mb-4">
                        Booking Payment
                    </h2>

                    
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md text-left mb-4">
                        <h3 className="text-[#981D26] text-xl font-semibold mb-2">Booking Details</h3>
                        <p><strong>Name:</strong> {Name}</p>
                        <p><strong>Email:</strong> {Email}</p>
                        <p><strong>Phone No:</strong> {PhoneNo}</p>
                        <p><strong>Event Name:</strong> {EventName}</p>
                        <p><strong>Seating Type:</strong> {SeatingType}</p>
                        <p><strong>Tickets:</strong> {NoOfTicket}</p>
                        <p className="text-lg font-bold mt-2">
                            Total Price: <span className="text-[#500E10]">₹{totalAmount}</span>
                        </p>
                    </div>

                   
                    {message && (
                        <p className="text-[#500E10] font-semibold mb-4">{message}</p>
                    )}

                    
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
