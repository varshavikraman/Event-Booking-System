import React from 'react'
import venue from '../assets/IMAGE/music-circle-svgrepo-com.svg'
import location from '../assets/IMAGE/location-pin-svgrepo-com.svg'
import date from '../assets/IMAGE/calendar-date-schedule-svgrepo-com.svg'
import time from '../assets/IMAGE/time-svgrepo-com.svg'


const TicketCard = ({ ticket, handleCancel  }) => {
    if (!ticket) {
        return <p className="text-red-500">Error: No ticket data available.</p>;
    }

    const { eventDetails } = ticket;

    return (
        <div className="w-full max-w-2xl bg-red-50 shadow-lg shadow-[#981D26] rounded-lg p-4">
            <div className="flex items-center mt-2 space-x-2">
                <h3 className="text-xl font-semibold mt-4 text-[#981D26]">{ticket.eventName}</h3>  
            </div>

            <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-2">
                    <img src={date} alt="Date" className="w-5 h-5" />
                    <p>{eventDetails?.date|| "N/A"}</p> 
                </div>
                <div className="flex items-center space-x-2">
                    <img src={time} alt="Time" className="w-5 h-5" />
                    <p>{eventDetails?.time|| "N/A"}</p>
                </div>
            </div>

            <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-2">
                    <img src={venue} alt="Venue" className="w-5 h-5" />
                    <p>{eventDetails?.venue || "N/A"}</p> 
                </div>
                <div className="flex items-center space-x-2">
                    <img src={location} alt="Location" className="w-5 h-5" />
                    <p>{eventDetails?.location || "N/A"}</p> 
                </div>
            </div>

            <div className="flex items-center mt-2 space-x-2">
                <label className="text-[#981D26] font-semibold">No of Seats:</label>
                <p>{ticket.No_OfTicket  || 0} {ticket.seatingType || "Standard"} seats</p> 
            </div>

            <div className="flex justify-end">
            <button 
                    className="bg-[#500E10] hover:bg-[#977073] text-[#F59B9E] hover:text-white font-bold py-2 px-4 mt-4 rounded"
                    onClick={() => handleCancel(ticket.eventName)}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default TicketCard;