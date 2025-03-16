import React from 'react'
import venue from '../assets/IMAGE/music-circle-svgrepo-com.svg'
import location from '../assets/IMAGE/location-pin-svgrepo-com.svg'
import date from '../assets/IMAGE/calendar-date-schedule-svgrepo-com.svg'
import time from '../assets/IMAGE/time-svgrepo-com.svg'


const TicketCard = ({ ticket, handleCancel  }) => {
    if (!ticket) {
        return <p className="text-red-500">Error: No ticket data available.</p>;
    }

    const { eventName, eventInfo, seatDetails, status } = ticket;

    return (
        <div className="w-full max-w-2xl bg-red-50 shadow-lg shadow-[#981D26] rounded-lg p-4">
            <div className="flex items-center mt-2 space-x-2">
                <h3 className="text-xl font-semibold mt-4 text-[#981D26]">{eventName}</h3>  
            </div>

            <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-2">
                    <img src={date} alt="Date" className="w-5 h-5" />
                    <p>{eventInfo?.date || "N/A"}</p> 
                </div>
                <div className="flex items-center space-x-2">
                    <img src={time} alt="Time" className="w-5 h-5" />
                    <p>{eventInfo?.time || "N/A"}</p>
                </div>
            </div>

            <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center space-x-2">
                    <img src={venue} alt="Venue" className="w-5 h-5" />
                    <p>{eventInfo?.venue || "N/A"}</p> 
                </div>
                <div className="flex items-center space-x-2">
                    <img src={location} alt="Location" className="w-5 h-5" />
                    <p>{eventInfo?.location || "N/A"}</p> 
                </div>
            </div>

            <div className="flex flex-col mt-2 space-y-2">
                <label className="text-[#981D26] font-semibold">Seat Type & No. of Tickets:</label>
                {Array.isArray(seatDetails) && seatDetails.length > 0 ? (
                    seatDetails.map((seat, index) => (
                        <p key={index} className="font-medium">
                            {seat.count} seats in {seat.seatType}
                        </p>
                    ))
                ) : (
                    <p className="text-gray-500">No seat details available</p>
                )}
            </div>

            <div className="flex justify-between items-center mt-4">
                <p className={`px-3 py-1 rounded-full text-sm font-bold ${
                    status === "Cancelled" ? "bg-[#C9184A] text-white" : "bg-green-500 text-white"
                }`}>
                    {status === "Cancelled" ? "Cancelled" : "Confirmed"}
                </p>
            </div>

          {ticket.status !== "Cancelled" && (
            <div className="flex justify-end">
                <button 
                    className="py-2 px-4 mt-4 rounded font-bold bg-[#500E10] hover:bg-[#977073] text-[#F59B9E] hover:text-white"
                    onClick={() => handleCancel(ticket.eventName)}
                >
                    Cancel
                </button>
            </div>
          )}
        </div>
    );
};

export default TicketCard;