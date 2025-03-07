import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard';

const TicketGrid = ({ isHome = true }) => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserTickets = async () => {
            try {
                const response = await fetch("/api/getUserTickets", {
                    method: "GET",
                    credentials: "include", // Ensures cookies are sent
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                console.log("API Response Status:", response.status); // Debugging

                if (!response.ok) {
                    throw new Error("Failed to fetch tickets");
                }

                const data = await response.json();
                console.log("Fetched Tickets:", data); // Debugging

                setTickets(data);
            } catch (error) {
                console.error("Error fetching user tickets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserTickets();
    }, []);

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
                        <TicketCard key={index} ticket={ticket} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TicketGrid;
