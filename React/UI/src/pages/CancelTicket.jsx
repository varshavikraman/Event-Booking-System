import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const CancelTicket = () => {
    const [tickets, setTickets] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [cancelData, setCancelData] = useState({}); // Stores selected cancel count for each ticket type
    const navigate = useNavigate();

    // Fetch user tickets
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch("/api/getUserTickets");
                const data = await response.json();
                console.log("Fetched Tickets:", data); // Debugging
                if (response.ok) {
                    setTickets(data.bookings);
                } else {
                    setMessage("Failed to fetch tickets.");
                }
            } catch (error) {
                console.error("Error fetching tickets:", error);
                setMessage("Error loading tickets.");
            }
        };

        fetchTickets();
    }, []);

    // Handle ticket cancellation
    const handleCancel = async (eventName, cancelSeats) => {
        if (!cancelSeats || Object.keys(cancelSeats).length === 0) {
            setMessage("Invalid cancellation request.");
            return;
        }
    
        setLoading(true); // Indicate loading state
    
        try {
            const response = await fetch("/api/cancelTicket", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    EventName: eventName,
                    cancelSeats: Object.keys(cancelSeats).map(SeatType => ({
                        SeatType,
                        cancelCount: cancelSeats[SeatType]
                    }))
                })
            });
    
            const data = await response.json();
            console.log("Server Response:", data); // Debugging
    
            if (!response.ok) {
                setMessage(data.msg);
            } else {
                setMessage(data.msg);
                // Refresh ticket list after cancellation
                setTickets(prevTickets => 
                    prevTickets.map(ticket => 
                        ticket.eventName === eventName 
                        ? { 
                            ...ticket, 
                            seatDetails: ticket.seatDetails.map(seat => ({
                                ...seat,
                                count: seat.count - (cancelSeats[seat.seatType] || 0) // Reduce the count
                            })).filter(seat => seat.count > 0) // Remove empty seat types
                        }
                        : ticket
                    ).filter(ticket => ticket.seatDetails.length > 0) // Remove empty bookings
                );
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <div className="cancel-ticket-container bg-[#FFCCD5] min-h-screen p-6">
            <div className="max-w-3xl my-40 mx-auto bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-[#981D26]">Cancel Tickets</h2>

                    {message && <p className="text-red-500 mb-4">{message}</p>}

                    {tickets.length === 0 ? (
                        <p className="text-[#800F2F] text-center">No tickets found.</p>
                    ) : (
                        <div className="ticket-list space-y-6">
                            {tickets.map(ticket => (
                                <div key={ticket.eventName} className="border p-5 rounded-lg shadow-md bg-white">
                                    <h3 className="text-xl font-semibold text-[#E35D86]">{ticket.eventName}</h3>
                                        <div className="space-y-3 mt-3">
                                            {ticket.seatDetails.map(seat => (
                                                <div key={seat.seatType} className="p-3 border rounded-md flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50">
                                                    <p className="text-lg text-[#F59B9E] font-medium">{seat.seatType} - {seat.count} ticket(s)</p>
                                    
                                                    <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                                        {/* Dropdown to select number of tickets to cancel */}
                                                        <select
                                                            className="text-lg text-[#F59B9E] font-medium border p-2 rounded-md focus:ring focus:ring-black"
                                                            value={cancelData[ticket.eventName]?.[seat.seatType] || 1}
                                                            onChange={(e) => 
                                                                setCancelData(prev => ({
                                                                    ...prev,
                                                                    [ticket.eventName]: {
                                                                        ...prev[ticket.eventName],
                                                                        [seat.seatType]: parseInt(e.target.value)
                                                                    }
                                                                }))
                                                            }
                                                        >
                                                            {[...Array(seat.count).keys()].map(i => (
                                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                            ))}
                                                        </select>

                                                        {/* Cancel Button */}
                                                        <button 
                                                            className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded"
                                                            onClick={() => handleCancel(ticket.eventName, cancelData[ticket.eventName])}
                                                            disabled={loading}
                                                        >
                                                        {loading ? "Processing..." : "Cancel"}
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-center mt-6">
                        <button
                            onClick={() => navigate("/booked-tickets")} // Adjust the path as per your routing
                            className="bg-[#981D26] hover:bg-[#EC88Ac] text-white font-bold py-2 px-6 rounded-md"
                        >
                            Back
                        </button>
                    </div>
            </div>
        </div>

    );
};

export default CancelTicket;
