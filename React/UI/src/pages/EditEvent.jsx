import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
    const { eventName } = useParams();
    const navigate = useNavigate();
    const [eventData, setEventData] = useState({
        eventName: "",
        organizer: "",
        description: "",
        venue: "",
        location: "",
        No_of_Tickets: "",
        vipSeats: "",
        standardSeats: "",
        date: "",
        time: "",
        price: "",
        image: ""
    });
    const [imageFile, setImageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await fetch(`/api/getEvent?eventName=${encodeURIComponent(eventName)}`, {
                    credentials: "include",
                });
                if (!response.ok) throw new Error("Failed to fetch event details");

                const data = await response.json();
                setEventData({
                    eventName: data.eventName || "",
                    organizer: data.organizer || "",
                    description: data.description || "",  
                    venue: data.venue || "",
                    location: data.location || "",
                    No_of_Tickets: data.No_of_Tickets || "", 
                    vipSeats: data.vipSeats || "",
                    standardSeats: data.standardSeats || "",
                    date: data.date ? data.date.split("T")[0] : "",
                    time: data.time || "",
                    price: data.price || "",
                    image: data.image || ""
                });
                setImageUrl(data.imageUrl || "");
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [eventName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        setImageUrl(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        const formData = new FormData();
        formData.append("eventName", eventName);
        formData.append("Description", eventData.description);
        formData.append("Venue", eventData.venue);
        formData.append("Location", eventData.location);
        formData.append("NoOfTickets", eventData.No_of_Tickets);
        formData.append("VIPSeats", eventData.vipSeats);
        formData.append("StandardSeats", eventData.standardSeats);
        formData.append("Date", eventData.date);
        formData.append("Time", eventData.time);
        formData.append("Price", eventData.price);
        if (imageFile) {
            formData.append("EventImage", imageFile);
        }

        try {
            const response = await fetch(`/api/editEvent/${eventName}`, {
                method: "PUT",
                credentials: "include",
                body: formData,
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.msg || "Failed to update event");

            setMessage("Event updated successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Update Error:", error);
            setMessage("Failed to update event. Please try again.");
        } finally {
            setLoading(false); // Reset loading state after the request finishes
        }
    };

    return (
        <div className="bg-[#FFCCD5]">
            <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg shadow-[#981D26] rounded-2xl">
                <h2 className="text-2xl font-bold text-[#981D26] mb-4">Edit Event</h2>
                {message && <p className="text-red-600">{message}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">Event Name:</label>
                        <input type="text" name="eventName" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" value={eventData.eventName} disabled />
                    </div>
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">Organizer:</label>
                        <input type="text" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" name="organizer" value={eventData.organizer} disabled  />
                    </div>
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">Description:</label>
                        <textarea  rows="5" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" value={eventData.description} onChange={handleChange}  required ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">Venue:</label>
                        <input type="text" name="venue" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" value={eventData.venue} onChange={handleChange}  required />
                    </div>
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">Location:</label>
                        <input type="text" name="location" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" value={eventData.location} onChange={handleChange}  required />
                    </div>
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">No of Tickets:</label>
                        <input type="number" name="No_of_Tickets" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" value={eventData.No_of_Tickets} onChange={handleChange}  required />
                    </div>
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">VIP Seats:</label>
                        <input type="number" name="vipSeats" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" value={eventData.vipSeats} onChange={handleChange}  required />
                    </div>
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">Standard Seats:</label>
                        <input type="number" name="standardSeats" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" value={eventData.standardSeats} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">Date:</label>
                        <input type="date" name="date" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" value={eventData.date} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">Time:</label>
                        <input type="time" name="time" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" value={eventData.time} onChange={handleChange} required />
                    </div>
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">Price:</label>
                        <input type="number" name="price" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" value={eventData.price} onChange={handleChange} required />
                    </div>
                
                
                    <div className="mb-4">
                        <label className="text-[#981D26] block font-semibold">Event Image:</label>
                        <input type="file" onChange={handleImageChange} className="w-full border rounded-lg px-4 py-2" />
                        {imageUrl &&
                            <img src={imageUrl} alt="Event" className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-2" />
                        }
                    </div>
                    <button type="submit" className="bg-[#500E10] text-[#F59B9E] font-medium py-2 px-6 rounded-lg hover:bg-[#977073] hover:text-white">
                        Update Event
                    </button>
            </form>
        </div>
        </div>
    );
};

export default EditEvent;
