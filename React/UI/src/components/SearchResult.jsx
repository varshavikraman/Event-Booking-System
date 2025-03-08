import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import EventCard from './EventCard';

const SearchResult = () => {
    const [eventList, setEventList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || '';

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`/api/searchEvent?searchValue=${encodeURIComponent(query)}`);
                const data = await response.json();
                setEventList(data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        if (query) {
            fetchEvents();
        } else {
            setLoading(false);
        }
    }, [query]);

    return (
        <div>
            
            <h1 className="text-[#981D26] text-2xl sm:text-3xl font-semibold text-center mb-6">Search Results</h1>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-5 my-10">
                    {eventList.length > 0 ? (
                        eventList.map((event) => (
                            <EventCard 
                                key={event.eventName}
                                event={event} 
                                showButton={true} 
                            />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No events available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResult;
