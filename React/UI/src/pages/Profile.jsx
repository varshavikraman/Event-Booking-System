import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const Profile = () => {
  return (
    <div className="bg-[#F59B9E]">
    <NavBar />
    <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-32">
        <div className="w-96 mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6">

                <div className="text-center mb-4">
                    <img src={logo} alt="logo" className="w-12 h-12"/>  
                </div>

                <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium text-center mb-6">My Profile</h2>


                <div class="ml-20 mb-4 flex space-x-4">
                    <label for="name" class="text-[#981D26] block">Name:</label><p>Abc</p>
                </div>

                <div class="ml-20 mb-4 flex space-x-4">
                    <label for="email" class="text-[#981D26] block">Email:</label><p>abc@gmail.com</p>
                </div>

                <div class="ml-20 mb-4 flex space-x-4">
                    <label for="phone" class="text-[#981D26] block">Phone No:</label><p>7685943210</p>
                </div>

                <div class="ml-20 mb-4 flex space-x-4">
                    <label for="userRole" class="text-[#981D26] block">User Role:</label><p></p>
                </div>

                <div class="ml-10 flex mt-10 space-x-20">
                    <div>
                        <button type="reset" class="bg-[#500E10] text-[#F59B9E] font-medium py-2 px-6 rounded-lg hover:bg-[#977073] hover:text-white">Edit</button>
                    </div>
                    <div>
                        <button type="submit" class="bg-[#500E10] text-[#F59B9E] font-medium py-2 px-6 rounded-lg hover:bg-[#977073] hover:text-white">Save</button>
                    </div>
                </div>

        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Profile