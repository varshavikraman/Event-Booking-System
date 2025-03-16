import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CancelTicket = () => {
    const location = useLocation();
    const eventName = location.state?.eventName;
    const [tickets, setTickets] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [cancelData, setCancelData] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(`/api/getUserTickets?eventName=${encodeURIComponent(eventName)}`);
                const data = await response.json();

                if (response.ok && data.bookings) {
                    setTickets(data.bookings.filter(ticket => ticket.eventName === eventName));
                } else {
                    setMessage(data.msg || "Failed to fetch tickets.");
                }
            } catch (error) {
                setMessage("Error loading tickets.");
            }
        };

        if (eventName) {
            fetchTickets();
        }
    }, [eventName]);

    const handleCancel = async (eventName, cancelSeats) => {
        if (!cancelSeats || Object.keys(cancelSeats).length === 0) {
            setMessage("Please select tickets to cancel.");
            return;
        }

        setLoading(true);

        try {
            const formattedCancelSeats = Object.entries(cancelSeats)
                .filter(([_, count]) => count > 0)
                .map(([seatType, count]) => ({ SeatType: seatType, cancelCount: count }));

            console.log("Sending cancellation request:", {
                EventName: eventName,
                cancelSeats: formattedCancelSeats,
            });

            if (formattedCancelSeats.length === 0) {
                setMessage("No valid seats selected for cancellation.");
                return;
            }

            const response = await fetch("/api/cancelTicket", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ EventName: eventName, cancelSeats: formattedCancelSeats }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.error("Cancellation error:", data);
                setMessage(data.msg || "Failed to cancel tickets.");
            } else {
                setMessage(data.msg);
                setTickets(prevTickets =>
                    prevTickets.map(ticket => {
                        if (ticket.eventName === eventName) {
                            const updatedSeatDetails = ticket.seatDetails.filter(seat => {
                                const cancelledCount = cancelSeats[seat.seatType] || 0;
                                return seat.count - cancelledCount > 0;
                            }).map(seat => {
                              const cancelledCount = cancelSeats[seat.seatType] || 0;
                              return {...seat, count: seat.count - cancelledCount}
                            })

                            return {...ticket, seatDetails: updatedSeatDetails};
                        }
                        return ticket;
                    }).filter(ticket => ticket.seatDetails.length > 0)
                );
            }
        } catch (error) {
            console.error("Request failed:", error);
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelChange = (eventName, seatType, count) => {
        return (e) => {
            const value = parseInt(e.target.value) || 0;

            setCancelData(prev => ({
                ...prev,
                [eventName]: {
                    ...prev[eventName],
                    [seatType]: value,
                },
            }));
        };
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
                                            <p className="text-lg text-[#F59B9E] font-medium">
                                                {seat.seatType} - {seat.count} ticket(s)
                                            </p>

                                            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                                                <select
                                                    className="text-lg text-[#F59B9E] font-medium border p-2 rounded-md focus:ring focus:ring-black"
                                                    value={cancelData[ticket.eventName]?.[seat.seatType] || 0}
                                                    onChange={handleCancelChange(ticket.eventName, seat.seatType, seat.count)}
                                                >
                                                    {[...Array(seat.count + 1).keys()].map(i => (
                                                        <option key={i} value={i}>
                                                            {i}
                                                        </option>
                                                    ))}
                                                </select>

                                                <button
                                                    className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                                                    onClick={() => handleCancel(ticket.eventName, cancelData[ticket.eventName] || {})}
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
                        onClick={() => navigate("/booked-tickets")}
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