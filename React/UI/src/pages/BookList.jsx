import React, { useEffect, useState } from 'react';
import DashNav from '../components/DashNav';

const BookList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('/api/bookings');
                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }
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

    return (
        <div className="flex flex-col md:flex-row bg-[#FFCCD5]">
            <DashNav />
            <div className="flex-1 mt-20 px-4 py-6">
                <h2 className="text-2xl font-semibold text-center mb-4">Booking List</h2>
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && (
                    <div className="overflow-x-auto">
                        <table className="border-collapse border border-gray-400 w-full max-w-6xl mx-auto text-left bg-white shadow-md">
                            <thead className="bg-[#D76067] text-white text-center">
                                <tr>
                                    <th className="border border-gray-400 px-4 py-2">Attendee</th>
                                    <th className="border border-gray-400 px-4 py-2">Email</th>
                                    <th className="border border-gray-400 px-4 py-2">Event Name</th>
                                    <th className="border border-gray-400 px-4 py-2">Seat Type</th>
                                    <th className="border border-gray-400 px-4 py-2">No. of Tickets</th>
                                    <th className="border border-gray-400 px-4 py-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.length > 0 ? (
                                    bookings.map((booking) => (
                                        <tr key={booking._id} className="hover:bg-gray-100">
                                            <td className="border border-gray-400 px-4 py-2">{booking.name}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.eMail}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.eventName}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.seatingType}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.No_OfTicket}</td>
                                            <td className="border border-gray-400 px-4 py-2">{booking.price}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">No bookings found</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookList;
