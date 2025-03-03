import React from 'react'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const BookTicket = () => {
  return (
    <div className="bg-[#F59B9E]">
        <NavBar />
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-32">
            <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6">
                <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium text-center mb-6">
                    Book Ticket
                </h2>

                <form>
                    <div className="mb-4">
                        <label  className="text-[#981D26] block">Name:</label>
                        <input 
                            type="text" 
                            id="name" 
                            required 
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-[#981D26] block">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            required 
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="text-[#981D26] block">Phone No:</label>
                        <input 
                            type="text" 
                            id="phone" 
                            required 
                            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2"
                        />
                    </div>

                    <div className="flex mb-4 space-x-20">
                        <div>
                            <label className="text-[#981D26]">Seating Type:</label>
                            <br />
                            <select 
                                id="seatingType" 
                                className="w-20 mt-1 bg-white border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <option value="VIP">VIP</option>
                                <option value="Standard">Standard</option>
                            </select>
                        </div>
                        <div>
                            <label className="text-[#981D26]">No of Ticket:</label>
                            <br />
                            <select 
                                id="ticketCount" 
                                className="w-20 mt-1 bg-white border border-gray-300 rounded-lg px-4 py-2"
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>  
                    </div>

                    <div className="text-center">
                        <Link to="/confirmation">
                            <button 
                                type="submit" 
                                className="bg-[#500E10] text-[#F59B9E] font-medium py-2 px-6 rounded-lg hover:bg-[#977073] hover:text-white"
                            >
                                Book Now
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default BookTicket
