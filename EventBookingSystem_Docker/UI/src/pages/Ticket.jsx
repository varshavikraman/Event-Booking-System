import React from 'react'
import NavBar from '../components/NavBar'
import TicketGrid from '../components/TicketGrid'
import Footer from '../components/Footer'

const Ticket = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFCCD5]">
      <NavBar />
      <div className="flex-grow">
        <TicketGrid isHome={true} />
      </div>
      <Footer />
    </div>
  )
}

export default Ticket