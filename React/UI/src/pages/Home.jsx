import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import EventGrid from '../components/EventGrid'

const Home = () => {
  return (
    <div className="bg-[#F59B9E]">
        <NavBar/>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 my-8">
            <div className=" ml-6 my-8">
                <h1 className="text-[#981D26] text-2xl mb-4">Filter</h1>
                
                <div className="flex space-x-10 h-8 w-[105px] bg-white my-2">
                    <label for="" className="pt-1 pl-2">Date</label>
                    <select name="" id="" className="bg-white">
                        <option value="Date"></option>
                    </select>
                </div>
                <div  className="flex space-x-10 h-8 w-[105px] bg-white my-2">
                    <label for="" className="pt-1 pl-2">Price</label>
                    <select name="" id="" className="bg-white">
                        <option value=""></option>
                    </select>
                </div>
                <div  className="flex space-x-4 h-8 w-24 bg-white my-2">
                    <label for="" className="pt-1 pl-2">Location</label>
                    <select name="" id="" className="bg-white">
                        <option value=""></option>
                    </select>
                </div>
            </div>
            <EventGrid isHome={false} showButton={true} />
            
        </div>
        <Footer/>
    </div>
  )
}

export default Home