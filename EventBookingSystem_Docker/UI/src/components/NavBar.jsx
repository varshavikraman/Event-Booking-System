import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom'; 
import logo from '../assets/IMAGE/logo1.jpeg';
import { Link } from "react-router-dom";

const NavBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchValue.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchValue)}`);
        }
    };

    return (
        <header className="bg-[#981D26]">
            <div className=" mx-auto flex flex-wrap items-center justify-between p-4">
                <div className="flex items-center space-x-4 w-full md:w-auto">
                {logo ? <img src={logo} alt="logo" className="w-12 h-12" /> : null}
                    <div className="flex items-center space-x-2">
                        <input 
                            type="search" 
                            placeholder="Event Name, Organizer or Location" 
                            className="border border-gray-400 rounded h-8 px-2 w-full md:w-auto bg-white"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button 
                            type="button" 
                            onClick={handleSearch}
                            className="bg-[#500E10] text-[#F59B9E] px-4 h-8 rounded hover:bg-[#977073] hover:text-white"
                        >
                            Search
                        </button>
                    </div>
                </div>

                <nav className="flex flex-wrap justify-center md:justify-end space-x-4 md:space-x-6 mt-4 md:mt-0 w-full md:w-auto"> 
                    <Link to="/home" className="text-[#F59B9E] text-sm md:text-lg font-medium hover:text-white">Find Event</Link>
                    <Link to="/booked-tickets" className="text-[#F59B9E] text-sm md:text-lg font-medium hover:text-white">Find My Ticket</Link>
                    <Link to="/updateProfile" className="text-[#F59B9E] text-sm md:text-lg font-medium hover:text-white">My Profile</Link>
                    <Link to="/signout" className="text-[#F59B9E] text-sm md:text-lg font-medium hover:text-white">Sign Out</Link>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
