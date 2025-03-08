import React, { useState, useEffect } from "react";

const Filter = ({ onFilter }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [eventPrices, setEventPrices] = useState([]);
  const [eventLocations, setEventLocations] = useState([]);

  // Fetch event options for filtering
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        const uniquePrices = [...new Set(data.map(event => event.price))];
        const uniqueLocations = [...new Set(data.map(event => event.location))];

        setEventPrices(uniquePrices);
        setEventLocations(uniqueLocations);
      } catch (error) {
        console.error("Error fetching event options:", error);
      }
    };
    fetchEvents();
  }, []);

  const handleFilter = async () => {
    try {
      const response = await fetch(
        `/api/filterEvents?date=${selectedDate}&price=${Number(selectedPrice)}&location=${selectedLocation}`
      );
      const data = await response.json();
      onFilter(data); // Pass filtered data to the parent component
    } catch (error) {
      console.error("Error fetching filtered data:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 my-8">
      <div className="ml-6 my-8">
        <h1 className="text-[#981D26] text-2xl mb-4">Filter</h1>

        {/* Date Filter - Now using an input field */}
        <div className="flex items-center space-x-4 h-10 w-[200px] bg-white my-2 px-3 rounded-lg border border-gray-300">
          <label className="text-gray-700">Date</label>
          <input 
            type="date" 
            className="bg-white outline-none w-full" 
            value={selectedDate} 
            onChange={(e) => setSelectedDate(e.target.value)} 
          />
        </div>

        {/* Price Filter */}
        <div className="flex items-center space-x-4 h-10 w-[200px] bg-white my-2 px-3 rounded-lg border border-gray-300">
          <label className="text-gray-700">Price</label>
          <select className="bg-white outline-none w-full" onChange={(e) => setSelectedPrice(e.target.value)}>
            <option value="">Select</option>
            {eventPrices.map((price, index) => (
              <option key={index} value={price}>{price}</option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex items-center space-x-4 h-10 w-[200px] bg-white my-2 px-3 rounded-lg border border-gray-300">
          <label className="text-gray-700">Location</label>
          <select className="bg-white outline-none w-full" onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="">Select</option>
            {eventLocations.map((location, index) => (
              <option key={index} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {/* Apply Filter Button */}
        <button 
          className="mt-4 px-4 py-2 bg-[#981D26] text-white rounded-lg shadow-md hover:bg-red-800 transition duration-200"
          onClick={handleFilter}
        >
          Apply Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
