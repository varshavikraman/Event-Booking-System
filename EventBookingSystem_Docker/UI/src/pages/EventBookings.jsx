import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DashNav from '../components/DashNav';

const EventBookings = () => {
    const { eventId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const eventName = location.state?.eventName; 

    const [event, setEvent] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                if (!eventName) {
                    throw new Error("Event name is missing. Please go back and select an event.");
                }

                const response = await fetch(`/api/getBookings?eventName=${encodeURIComponent(eventName)}`);
                if (!response.ok) throw new Error('Failed to fetch event bookings');

                const data = await response.json();

                if (data.length === 0) {
                    throw new Error('No bookings found for this event');
                }

                setEvent(data[0].eventId); 
                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [eventName]);

    return (
        <div className="flex flex-col md:flex-row bg-[#FFCCD5] min-h-screen">
            <DashNav />
            <div className="flex-1 mt-20 px-4 py-6">
                <button className="bg-[#500E10] text-[#F59B9E] text-white px-4 py-2 rounded-lg mb-4" onClick={() => navigate(-1)}>
                    Back
                </button>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && event && (
                    <>
                        <h2 className="text-2xl font-bold text-center text-[#981D26]">{event.eventName}</h2>
                        <p className="text-center text-gray-600"><strong>Location:</strong> {event.location || "N/A"}</p>
                        <p className="text-center text-gray-600"><strong>Date:</strong> {event.date || "N/A"}</p>

                        <div className="overflow-x-auto mt-6">
                            <table className="border-collapse border border-gray-400 w-full text-left bg-white shadow-md">
                                <thead className="bg-[#D76067] text-white text-center">
                                    <tr>
                                        <th className="border border-gray-400 px-4 py-2">Attendee</th>
                                        <th className="border border-gray-400 px-4 py-2">Email</th>
                                        <th className="border border-gray-400 px-4 py-2">VIP Tickets</th>
                                        <th className="border border-gray-400 px-4 py-2">Standard Tickets</th>
                                        <th className="border border-gray-400 px-4 py-2">Total Price</th>
                                        <th className="border border-gray-400 px-4 py-2">Booking Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {bookings.length > 0 ? bookings.map((booking) => {
                                    const vipTickets = booking.tickets
                                        .filter(t => (t.seatingType || "Standard") === "VIP")
                                        .reduce((sum, t) => sum + (t.No_OfTicket || 0), 0);

                                    const standardTickets = booking.tickets
                                        .filter(t => (t.seatingType || "Standard") === "Standard")
                                        .reduce((sum, t) => sum + (t.No_OfTicket || 0), 0);

                                    const totalPrice = booking.tickets.reduce((sum, t) => sum + (t.price || 0), 0);
                                        return (
                                            <tr key={booking._id} className="hover:bg-gray-100">
                                                <td className="border border-gray-400 px-4 py-2">{booking.userId?.name || "Unknown"}</td>
                                                <td className="border border-gray-400 px-4 py-2">{booking.userId?.eMail || "No Email"}</td>
                                                <td className="border border-gray-400 px-4 py-2 text-center">{vipTickets || 0}</td>
                                                <td className="border border-gray-400 px-4 py-2 text-center">{standardTickets || 0}</td>
                                                <td className="border border-gray-400 px-4 py-2 text-center">{totalPrice || "N/A"}</td>
                                                <td className={`border border-gray-400 px-4 py-2 font-bold text-center 
                                                    ${booking.status === 'Confirm' ? 'text-green-600' : 'text-red-500'}`}>
                                                        {booking.status}
                                                </td>
                                            </tr>
                                        );
                                }) : (
                                        <tr>
                                            <td colSpan="6" className="text-center py-3 text-gray-600">
                                                No bookings for this event.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EventBookings;
