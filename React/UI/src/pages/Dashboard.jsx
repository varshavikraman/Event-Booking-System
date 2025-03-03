import React from 'react'
import Navbar from '../components/DashNav'
import Footer from '../components/Footer'
import venue from '../assets/IMAGE/music-circle-svgrepo-com.svg'
import location from '../assets/IMAGE/location-pin-svgrepo-com.svg'
import date from '../assets/IMAGE/calendar-date-schedule-svgrepo-com.svg'
import time from '../assets/IMAGE/time-svgrepo-com.svg'
import price from '../assets/IMAGE/rupee-sign-svgrepo-com.svg'

const Dashboard = () => {
  return (
    <div className="bg-[#F59B9E]">
        <div className="flex flex-col md:flex-row">
            <Navbar/>
            <div className="flex-1 px-4 py-8 mt-40 ml-20">
            <h1 className="text-[#981D26] text-2xl sm:text-3xl font-medium mb-6">Upcoming Events</h1>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
                <div className="bg-red-50 shadow-lg shadow-[#981D26] rounded-lg p-4">
                    <img src="/IMAGE/MusicEvents .jpg" alt="Event 1" className="w-full h-48 object-cover rounded"/>
                    <h3 className="text-xl font-semibold mt-4 text-[#981D26]">Live Music Concert | Angels</h3>
                    <p className="mt-2">A night of pure sonic bliss awaits. Don't miss this opportunity to witness the raw talent and infectious energy of Angels as they perform live.</p>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={date} alt="Date" className="w-5 h-5"/>
                        <p>12/02/2025</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={time} alt="Time" className="w-5 h-5"/>
                        <p></p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={venue} alt="Venue" className="w-5 h-5"/>
                        <p>Heaven Club</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={location} alt="Location" className="w-5 h-5"/>
                        <p>Thiruvanathapuram</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={price} alt="Price" className="w-5 h-5"/>
                        <p>250/- Onwards</p>
                    </div>
                </div>

                <div className="bg-red-50 shadow-lg shadow-[#981D26] rounded-lg p-4">
                    <img src="/IMAGE/musicconcert.jpg" alt="Event 2" className="w-full h-48 object-cover rounded"/>
                    <h3 className="text-xl font-semibold mt-4 text-[#981D26]">Music Concert | Lucifer</h3>
                    <p className="mt-2">Get ready for an exhilarating experience as Lucifer delivers a high-energy performance. Feel the pulse of the music as you join a crowd of passionate fans in celebrating the power of live music.</p>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={date} alt="Date" className="w-5 h-5"/>
                        <p>02/02/2025</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={venue} alt="Venue" className="w-5 h-5"/>
                        <p>ABC Hotel</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={location} alt="Location" className="w-5 h-5"/>
                        <p>Thiruvanathapuram</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <img src={price} alt="Price" className="w-5 h-5"/>
                        <p>300/- Onwards</p>
                    </div>
                </div>
            </section>    

        </div>
        </div>
     <Footer/>
    </div>
  )
}

export default Dashboard