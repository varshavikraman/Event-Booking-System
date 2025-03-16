import React from 'react';
import Navbar from '../components/DashNav';
import Footer from '../components/Footer';
import EventGrid from '../components/EventGrid';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-[#FFCCD5]">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        <div className="flex-1 px-4 py-8 mt-14 md:ml-20">  
          <EventGrid isHome={true} showBookButton={false} showEditButton = {true} showDeleteButton = {true} />  
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
