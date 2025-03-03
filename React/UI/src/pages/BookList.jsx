import React from 'react'
import DashNav from '../components/DashNav'

const BookList = () => {
  return (
    <div className="flex flex-col md:flex-row">
        <DashNav/>
        <div className="flex-1 mt-20 px-4 py-6">
            <div className="overflow-x-auto">
                <table className="border-collapse border border-gray-400 w-full max-w-4xl mx-auto text-left bg-red-50">
                    <thead className="bg-[#D76067] text-[#500E10] text-center">
                        <tr>
                            <th rowSpan="2" className="border border-gray-400 px-4 py-2">Event</th>
                            <th rowSpan="2" className="border border-gray-400 px-4 py-2">Organizer</th>
                            <th rowSpan="2" className="border border-gray-400 px-4 py-2">Date of Event</th>
                            <th rowSpan="2" className="border border-gray-400 px-4 py-2">Total Seats</th>
                            <th colSpan="3" className="border border-gray-400 px-4 py-6">VIP Seat Details</th>
                            <th colSpan="3" className="border border-gray-400 px-4 py-6">Standard Seat Details</th>
                        </tr>
                        
                        <tr>
                            <th className="border border-gray-400 px-4 py-2">Total Tickets</th>
                            <th className="border border-gray-400 px-4 py-2">Tickets Sold</th>
                            <th className="border border-gray-400 px-4 py-2">Tickets Unsold</th>
                            <th className="border border-gray-400 px-4 py-2">Total Tickets</th>
                            <th className="border border-gray-400 px-4 py-2">Tickets Sold</th>
                            <th className="border border-gray-400 px-4 py-2">Tickets Unsold</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="hover:bg-gray-100">
                            <td className="border border-gray-400 px-4 py-2">Live Music Concert</td>
                            <td className="border border-gray-400 px-4 py-2">Angels</td>
                            <td className="border border-gray-400 px-4 py-2">12/02/2025</td>
                            <td className="border border-gray-400 px-4 py-2">250</td>
                            <td className="border border-gray-400 px-4 py-2">60</td>
                            <td className="border border-gray-400 px-4 py-2">33</td>
                            <td className="border border-gray-400 px-4 py-2">37</td>
                            <td className="border border-gray-400 px-4 py-2">190</td>
                            <td className="border border-gray-400 px-4 py-2">80</td>
                            <td className="border border-gray-400 px-4 py-2">110</td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default BookList
