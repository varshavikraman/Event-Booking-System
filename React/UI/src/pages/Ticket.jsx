import React from 'react'
import NavBar from '../components/NavBar'
import TicketGrid from '../components/TicketGrid'
import Footer from '../components/Footer'

const Ticket = () => {
  return (
    <div className="bg-[#F59B9E]">
      <NavBar />
      <TicketGrid isHome={true} />
      <Footer />
    </div>
  )
}

export default Ticket