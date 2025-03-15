import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import EventGrid from '../components/EventGrid'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFCCD5]">
        <NavBar/>
        <div className="flex-grow">
            <EventGrid isHome={false} showBookButton={true} showEditButton = {false} showDeleteButton = {false} />
        </div>
        <Footer  />
    </div>
  )
}

export default Home