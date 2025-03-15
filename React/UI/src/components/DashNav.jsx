import React from 'react'
import logo from '../assets/IMAGE/logo1.jpeg'
import { Link } from "react-router-dom";

const DashNav = () => {
  return (
    <div className="min-h-screen w-80 bg-[#981D26] flex flex-col items-center md:items-start space-y-6 p-6 pl-24 overflow-y-auto">
    <img src={logo} alt="logo" className="h-20 w-20"/>
    <nav className="flex flex-col space-y-4 text-center md:text-left">
        
        <Link to="/dashboard" className="text-[#F59B9E] text-lg font-medium hover:text-white">Event</Link>
        <Link to="/add-event" className="text-[#F59B9E] text-lg font-medium hover:text-white">Add Event</Link>
        <Link to="/booked-details" className="text-[#F59B9E] text-lg font-medium hover:text-white">Booking</Link>
        <Link to="/landing" className="text-[#F59B9E] text-lg font-medium hover:text-white">Sign Out</Link>
    </nav>
</div>
  )
}

export default DashNav