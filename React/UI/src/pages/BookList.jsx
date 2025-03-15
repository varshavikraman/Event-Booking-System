import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashNav from '../components/DashNav';
import Footer from '../components/Footer';

const BookList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('/api/getBookings'); // Ensure correct API
                if (!response.ok) throw new Error('Failed to fetch bookings');

                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    // Group bookings by event
    const groupedBookings = bookings.reduce((acc, booking) => {
        const event = booking.eventId;
        if (!event || !event._id) return acc;

        if (!acc[event._id]) {
            acc[event._id] = { details: event, bookings: [] };
        }
        acc[event._id].bookings.push(booking);
        return acc;
    }, {});

    const goToBookings = (eventId, eventName) => {
        navigate(`/event-bookings/${eventId}`, { state: { eventName } });
    };

    return (
        <div className="min-h-screen bg-[#FFCCD5]">
        <div className="flex flex-col md:flex-row"> 
            <DashNav />
            <div className="flex-1 mt-20 px-4 py-6">
                <h2 className="text-[#981D26] text-2xl font-semibold text-center mb-4">Event Bookings</h2>

                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}

                {!loading && !error && Object.keys(groupedBookings).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
                        {Object.values(groupedBookings).map(({ details }) => (
                            <div key={details._id} className="bg-white p-4 rounded-xl shadow-lg">
                                <h3 className="text-xl font-bold text-[#981D26]">{details.eventName}</h3>
                                <p className="text-gray-600"><strong>Location:</strong> {details.location || "N/A"}</p>
                                <p className="text-gray-600"><strong>Date:</strong> {details.date || "N/A"}</p>

                                {/* View Bookings Button */}
                                <button 
                                    onClick={() => goToBookings(details._id, details.eventName)}
                                    className="mt-4 bg-[#D76067] text-white px-4 py-2 rounded-lg"
                                >
                                    View Bookings
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center py-4">No bookings found</p>
                )}
            </div>
        </div>
        <Footer/>
        </div>
    );
};

export default BookList;
