import React from 'react'
import NavBar from '../components/NavBar'
import logo from '../assets/IMAGE/logo1.jpeg';
import Footer from '../components/Footer'

const ConfirmTicket = () => {
  return (
    <div className="bg-[#F59B9E]">
    <NavBar />
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-32">
        <div className="w-96 mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6">

                <div className="text-center mb-4">
                    <img src={logo} alt="logo" className="w-12 h-12"/>  
                </div>

                <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium text-center mb-6">Ticket Booking Successful !</h2>


                <div className="ml-20 mb-4 flex space-x-4">
                    <label for="name" className="text-[#981D26] block">Name:</label><p>Abc</p>
                </div>

                <div className="ml-20 mb-4 flex space-x-4">
                    <label for="email" className="text-[#981D26] block">Email:</label><p>abc@gmail.com</p>
                </div>

                <div className="ml-20 mb-4 flex space-x-4">
                    <label for="phone" className="text-[#981D26] block">Phone No:</label><p>7685943210</p>
                </div>

                <div className="ml-20 mb-4 flex space-x-4">
                    <label for="phone" className="text-[#981D26] block">No of Ticket:</label><p>2</p>
                </div>

                <div className="ml-20 mb-4 flex space-x-4">
                    <label for="phone" className="text-[#981D26] block">Seating Type:</label><p>Standard</p>
                </div>


        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default ConfirmTicket