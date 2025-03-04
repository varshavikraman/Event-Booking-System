import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import logo from '../assets/IMAGE/logo1.jpeg';
import Footer from '../components/Footer';

const CancelTicket = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleCancel = async () => {
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/cancelTicket", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ EventName: "Your Event Name" }) // Replace dynamically
            });

            const data = await response.json();
            
            if (response.ok) {
                setMessage("Your ticket booking has been successfully cancelled.");
            } else {
                setMessage(data.msg || "Failed to cancel ticket.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#F59B9E] min-h-screen">
            <NavBar />
            <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-32">
                <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6 text-center">
                    
                    <div className="mb-4">
                        <img src={logo} alt="logo" className="w-16 h-16 mx-auto" />
                    </div>

                    <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium mb-4">
                        Cancel Your Ticket
                    </h2>

                    <p className="text-gray-700 mb-6">
                        Are you sure you want to cancel your ticket?
                    </p>

                    {message && (
                        <p className="text-[#500E10] font-semibold mb-4">{message}</p>
                    )}

                    <button 
                        onClick={handleCancel} 
                        disabled={loading}
                        className="bg-red-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Cancelling..." : "Cancel Ticket"}
                    </button>

                    <button 
                        onClick={() => navigate('/home')} 
                        className="bg-gray-500 text-white font-medium py-2 px-6 rounded-lg hover:bg-gray-600 ml-4"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CancelTicket;
