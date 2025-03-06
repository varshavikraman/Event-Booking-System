import React from 'react';
import Navbar from '../components/DashNav';
import Footer from '../components/Footer';
import EventGrid from '../components/EventGrid';

const Dashboard = () => {
  return (
    <div className="bg-[#F59B9E] min-h-screen">
      <div className="flex flex-col md:flex-row">
        <Navbar />
        <div className="flex-1 px-4 py-8 mt-14 md:ml-20">  
          <EventGrid isHome={true} showButton={false} />  {/* ✅ Hides button */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
