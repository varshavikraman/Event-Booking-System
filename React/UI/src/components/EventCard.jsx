import React from 'react'
import venue from '../assets/IMAGE/music-circle-svgrepo-com.svg'
import location from '../assets/IMAGE/location-pin-svgrepo-com.svg'
import date from '../assets/IMAGE/calendar-date-schedule-svgrepo-com.svg'
import time from '../assets/IMAGE/time-svgrepo-com.svg'
import price from '../assets/IMAGE/rupee-sign-svgrepo-com.svg'
import { Link } from "react-router-dom";

const EventCard = () => {
  return (
    <div className="bg-red-50 shadow-lg shadow-[#981D26] rounded-lg p-4">
                    <img src="/IMAGE/MusicEvents .jpg" alt="Event 1" className="w-full h-48 object-cover rounded"/>
                    <h3 className="text-xl font-semibold mt-4 text-[#981D26]">Live Music Concert | Angels</h3>
                    <p className="mt-2">A night of pure sonic bliss awaits. Don't miss this opportunity to witness the raw talent and infectious energy of Angels as they perform live.</p>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={venue} alt="Venue" className="w-5 h-5"/>
                        <p>Heaven Club</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={location} alt="Location" className="w-5 h-5"/>
                        <p>Thiruvanathapuram</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={date} alt="Date" className="w-5 h-5"/>
                        <p>12/02/2025</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={time}alt="Time" className="w-5 h-5"/>
                        <p>10:00 PM</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={price} alt="Price" className="w-5 h-5"/>
                        <p>250/- </p>
                    </div>
                    <button className="bg-[#500E10] hover:bg-[#977073] text-[#F59B9E] hover:text-white font-bold py-2 px-4 mt-4 rounded">
                       <Link to="book_ticket.html">Book Now</Link> 
                    </button>
                </div>
  )
}

export default EventCard