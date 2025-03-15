import React, { useState } from 'react';
import venue from '../assets/IMAGE/music-circle-svgrepo-com.svg';
import location from '../assets/IMAGE/location-pin-svgrepo-com.svg';
import date from '../assets/IMAGE/calendar-date-schedule-svgrepo-com.svg';
import time from '../assets/IMAGE/time-svgrepo-com.svg';
import price from '../assets/IMAGE/rupee-sign-svgrepo-com.svg';
import { Link } from "react-router-dom";

const EventCard = ({ event, showBookButton = true, showEditButton = false, showDeleteButton = false, onDelete }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    if (!event) {
        return <p className="text-red-500">Error: No event data available.</p>;
    }

    const handleDelete = async () => {
        setLoading(true);
        setMessage("Deleting event...");

        try {
            const res = await fetch("/api/deleteEvent", {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ eventName: event.eventName })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.msg || "Failed to delete event");
            }

            setMessage("Event deleted successfully!");
            alert("Event deleted successfully!");

            if (onDelete) onDelete(event.eventName); // Remove from UI
        } catch (error) {
            console.error("Delete Error:", error);
            setMessage("Failed to delete event. Please try again.");
            alert("Failed to delete event. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-red-50 shadow-lg shadow-[#981D26] rounded-lg p-4">
            {event.eventName && (
                <img 
                src={`/api/getEventImage?eventName=${encodeURIComponent(event.eventName.trim())}`} 
                alt={event.eventName} 
                className="w-full h-48 object-cover rounded" 
                onError={(e) => { e.target.src = "/fallback-image.jpg"; }} 
                />
            )}

            <h3 className="text-3xl font-semibold mt-4 text-[#981D26]">
                {event.eventName || 'Unknown Event'} | {event.organizer || 'Unknown Organizer'}
            </h3>
            <p className="mt-2">{event.description || 'No description available.'}</p>
            <div className="flex items-center mt-2 space-x-2 ">
                        <label className="text-[#981D26] font-semibold">No of Tickets:</label>
                        <p>{event.No_of_Tickets ?? 'N/A'}</p>
            </div>
            <div className="flex flex-col mt-2 space-y-1">
                <label className="text-[#981D26] font-semibold">Seating Types:</label>
                <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                        <label className="text-[#981D26]">VIP Seats:</label>
                        <p className="font-medium">{event.vipSeats ?? 'N/A'}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                        <label className="text-[#981D26]">Standard Seats:</label>
                        <p className="font-medium">{event.standardSeats ?? 'N/A'}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-2 space-x-2">
                <img src={venue} alt="Venue" className="w-5 h-5"/>
                <p>{event.venue || 'Unknown Venue'}</p>
            </div>
            <div className="flex items-center mt-2 space-x-2">
                <img src={location} alt="Location" className="w-5 h-5"/>
                <p>{event.location || 'Unknown Location'}</p>
            </div>
            <div className="flex items-center mt-2 space-x-2">
                <img src={date} alt="Date" className="w-5 h-5"/>
                <p>{event.date || 'No date'}</p>
            </div>
            <div className="flex items-center mt-2 space-x-2">
                <img src={time} alt="Time" className="w-5 h-5"/>
                <p>{event.time || 'No time'}</p>
            </div>
            <div className="flex items-center mt-2 space-x-2">
                <img src={price} alt="Price" className="w-5 h-5"/>
                <p>Rs.{event.price ?? 'N/A'}</p>
            </div>

            <div className="flex space-x-3 mt-4">
                {showBookButton && (
                    <Link to={`/book/${event.eventName}`}>
                        <button className="bg-[#500E10] hover:bg-[#977073] text-[#F59B9E] hover:text-white font-bold py-2 px-4 rounded">
                            Book Now
                        </button>
                    </Link>
                )}

                {showEditButton && (
                    <Link to={`/edit/${event.eventName}`}>
                        <button className="bg-[#500E10] hover:bg-[#977073] text-[#F59B9E] hover:text-white font-bold py-2 px-4 rounded">
                            Edit
                        </button>
                    </Link>
                )}

                {showDeleteButton && (
                    <button 
                        onClick={handleDelete} 
                        className="bg-[#500E10] hover:bg-[#977073] text-[#F59B9E] hover:text-white font-bold py-2 px-4 rounded">
                            Delete
                    </button>
                )}
            </div>


        </div>
    );
};

export default EventCard;
