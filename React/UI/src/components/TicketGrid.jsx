import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; // Import navigate
import TicketCard from './TicketCard';

const TicketGrid = ({ isHome = true }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserTickets = async () => {
            try {
                const response = await fetch("/api/getUserTickets", {
                    method: "GET",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || "Failed to fetch tickets");
                }

                const data = await response.json();
                console.log("Fetched Data:", data);

                if (data && Array.isArray(data.bookings)) {
                    setTickets(data.bookings);
                } else {
                    setTickets([]);
                }
            } catch (error) {
                console.error("Error fetching user tickets:", error);
                setTickets([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserTickets();
    }, []);

    const handleCancel = (eventName) => {
        console.log("Redirecting to cancel page for:", eventName);
        
        navigate("/cancel-ticket", {
            state: { eventName }  // Pass ticket details to CancelTicket page
        });
    };
    

    return (
        <div>
            <h1 className="text-[#981D26] text-2xl sm:text-3xl font-semibold text-center mb-6">
                {isHome ? "My Bookings" : "No Booking"}
            </h1>

            {loading ? (
                <p>Loading...</p>
            ) : tickets.length === 0 ? (
                <p>No booked tickets found.</p>
            ) : (
                <div className="flex flex-col items-center flex-grow space-y-6 my-10 px-4 mt-28">
                    {tickets.map((ticket, index) => (
                        <TicketCard key={index} ticket={ticket} handleCancel={handleCancel} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TicketGrid;
