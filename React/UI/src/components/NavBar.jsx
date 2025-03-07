import React from 'react'
import logo from '../assets/IMAGE/logo1.jpeg'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="bg-[#981D26]">
        <div className=" mx-auto flex flex-wrap items-center justify-between p-4">
            <div className="flex items-center space-x-4 w-full md:w-auto">
                <img src={logo} alt="logo" className="w-12 h-12"/>
                <div className="flex items-center space-x-2 ">
                    <input type="search" placeholder="Search" className="border border-gray-400 rounded h-8 px-2 w-full md:w-auto"/>
                    <button type="submit" className="bg-[#500E10] text-[#F59B9E] px-4 h-8 rounded hover:bg-[#977073] hover:text-white">
                        <Link to="#">Search</Link>
                    </button>
                </div>
            </div>
            
            <nav className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 mt-4 md:mt-0 w-full md:w-auto"> 
                <Link to="/booked-tickets" className="text-[#F59B9E] text-sm md:text-lg font-medium hover:text-white">Find My Ticket</Link>
                <Link to="profile.html" className="text-[#F59B9E] text-sm md:text-lg font-medium hover:text-white">My Profile</Link>
                <Link to="/signout" className="text-[#F59B9E] text-sm md:text-lg font-medium hover:text-white">Sign Out</Link>
            </nav>
        </div>
    </header>
  )
}

export default NavBar