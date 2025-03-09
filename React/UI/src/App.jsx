import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddEvent from './pages/AddEvent';
import BookTicket from './pages/BookTicket';
import Payment from './pages/Payment';
import ConfirmTicket from './pages/ConfirmTicket';
import BookedTickets from './pages/Ticket';
import CancelTicket from './pages/CancelTicket'
import Profile from './pages/Profile'
import Signout from './components/Signout';
import SearchResult from './components/SearchResult';
import BookList from './pages/BookList';
import useProfile from './hooks/useProfile';

const App = () => {
  const { profile, loading } = useProfile();

  if (loading) return <p className="text-center mt-20 text-xl">Loading...</p>;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/landing" element={<Landing />} />

        {/* Public Routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/signout" element={<Signout />} />

        {/* Admin Routes (Only Admins Can Access) */}
        <Route path="/dashboard" element={profile?.userRole === "Admin" ? <Dashboard /> : <Navigate to="/home" />} />
        <Route path="/add-event" element={profile?.userRole === "Admin" ? <AddEvent /> : <Navigate to="/home" />} />
        <Route path="/booked-details" element={profile?.userRole === "Admin" ? <BookList /> : <Navigate to="/home" />} />

        {/* User Routes (Only for Logged-in Users) */}
        <Route path="/book/:eventName" element={profile ? <BookTicket /> : <Navigate to="/signin" />} />
        <Route path="/payment" element={profile ? <Payment /> : <Navigate to="/signin"/>} />
        <Route path="/confirm" element={profile ? <ConfirmTicket /> : <Navigate to="/signin" />} />
        <Route path="/booked-tickets" element={profile ? <BookedTickets /> : <Navigate to="/signin" />} />
        <Route path="/cancel-ticket" element={profile ? <CancelTicket /> : <Navigate to="/signin" />} />
        <Route path="/updateProfile" element={profile ? <Profile /> : <Navigate to="/signin" />} />
        

        {/* 404 Page */}
        <Route path="*" element={<h1 className='text-[#981D26] text-center text-5xl mt-80'>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
