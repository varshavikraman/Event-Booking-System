import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';

const EventGrid = ({ isHome = true, showButton = true }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const eventList = isHome ? events.slice(0, 5) : events;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await fetch("/api/getAllEvents");
                const data = await res.json();
                console.log("Fetched Events in Frontend:", data);
                setEvents(data);
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);
    

    return (
        <div>
            <h1 className="text-[#981D26] text-2xl sm:text-3xl font-semibold text-center mb-6">
                {isHome ? "Upcoming Events" : "All Events"}
            </h1>

            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
                    {eventList.map((event) => (
                        <EventCard 
                            key={event._id || event.eventName} 
                            event={event}
                            showButton={showButton} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventGrid;

