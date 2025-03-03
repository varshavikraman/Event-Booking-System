import React from 'react'
import venue from '../assets/IMAGE/music-circle-svgrepo-com.svg'
import location from '../assets/IMAGE/location-pin-svgrepo-com.svg'
import date from '../assets/IMAGE/calendar-date-schedule-svgrepo-com.svg'
import { Link } from 'react-router-dom'

const Ticket = () => {
  return (
    <div className="bg-[#F59B9E]">
    <NavBar />
    <div class="flex flex-col items-center flex-grow space-y-6 my-10 px-4 mt-28">
        
        <div class="w-full max-w-2xl bg-red-50 shadow-lg shadow-[#981D26] rounded-lg p-4">
            <div class="flex items-center mt-2 space-x-2">
                <h3 class="text-xl font-semibold mt-4 text-[#981D26]">Live Music Concert | Angels</h3>
            </div>
            <div class="flex items-center mt-2 space-x-2">
                <img src={date} alt="Date" class="w-5 h-5"/>
                <p>12/02/2025</p>
            </div>
            <div class="flex items-center mt-2 space-x-2">
                <img src={venue} alt="Venue" class="w-5 h-5"/>
                <p>Heaven Club</p>
            </div>
            <div class="flex items-center mt-2 space-x-2">
                <img src={location} alt="Location" class="w-5 h-5"/>
                <p>Thiruvanathapuram</p>
            </div>
            <div class="flex justify-end">
                <button class="bg-[#500E10] hover:bg-[#977073] text-[#F59B9E] hover:text-white font-bold py-2 px-4 mt-4 rounded">
                    <Link to="cancel_ticket.html">Cancel</Link>
                </button>
            </div>
        </div>
      
        <div class="w-full max-w-2xl bg-red-50 shadow-lg shadow-[#981D26] rounded-lg p-4">
            <div class="flex items-center mt-2 space-x-2">
                <h3 class="text-xl font-semibold mt-4 text-[#981D26]">Music Concert | Lucifer</h3>
            </div>
            <div class="flex items-center mt-2 space-x-2">
                <img src={date} alt="Date" class="w-5 h-5"/>
                <p>02/02/2025</p>
            </div>
            <div class="flex items-center mt-2 space-x-2">
                <img src={venue} alt="Venue" class="w-5 h-5"/>
                <p>ABC Hotel</p>
            </div>
            <div class="flex items-center mt-2 space-x-2">
                <img src={location} alt="Location" class="w-5 h-5"/>
                <p>Thiruvanathapuram</p>
            </div>
            <div class="flex justify-end">
                <button class="bg-[#500E10] hover:bg-[#977073] text-[#F59B9E] hover:text-white font-bold py-2 px-4 mt-4 rounded">
                    <Link to="cancel_ticket.html">Cancel</Link>
                </button>
            </div>
        </div>
    </div>

    <Footer/>
    </div>
  )
}

export default Ticket