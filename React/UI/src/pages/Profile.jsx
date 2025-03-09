import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import logo from '../assets/IMAGE/logo1.jpeg';

const Profile = () => {
    const [profile, setProfile] = useState({ Name: "", Email: "", PhoneNo: "", UserRole: "" });
    const [updatedProfile, setUpdatedProfile] = useState({ Name: "", PhoneNo: "" });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false); 

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await fetch("/api/profile", { method: "GET", credentials: "include" });

            if (!response.ok) throw new Error("Failed to fetch profile.");
    
            const data = await response.json();
            console.log("Fetched Profile Data:", data); 
            
            if (data) {
                setProfile(data);
                setUpdatedProfile({ Name: data.Name, PhoneNo: data.PhoneNo });
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
        setIsUpdated(false); 
    };

    const handleChange = (e) => {
        setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch("/api/editProfile", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ 
                    Name: updatedProfile.Name, 
                    PhoneNo: updatedProfile.PhoneNo, 
                    Email: profile.Email 
                }),
            });
    
            const result = await response.json();
            console.log("API Response after update:", result); 
    
            if (!response.ok) {
                throw new Error(result.msg || "Failed to update profile.");
            }

            await fetchProfile(); 
    
            setIsEditing(false);
            setIsUpdated(true);
        } catch (err) {
            console.error("Error updating profile:", err);
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col bg-[#FFCCD5] min-h-screen">
            <NavBar />
            <div className="flex-grow mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-32">
                <div className=" max-w-md mx-auto bg-white rounded-2xl shadow-lg shadow-[#981D26] p-6">
                    <div className="text-center mb-4">
                        <img src={logo} alt="logo" className="w-16 h-16 mx-auto" />
                    </div>
                    <h2 className="text-[#981D26] text-2xl sm:text-3xl font-medium text-center mb-6">My Profile</h2>

                    {loading ? (
                        <p className="text-center text-gray-700">Loading profile...</p>
                    ) : error ? (
                        <p className="text-center text-red-600">{error}</p>
                    ) : (
                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <label className="text-[#981D26] font-medium">Name:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="Name"
                                        value={updatedProfile.Name}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded p-2 w-84"
                                    />
                                ) : (
                                    <p className="border border-gray-300 rounded p-2 w-84">{profile.Name || "N/A"}</p>
                                )}
                            </div>


                            <div className="flex justify-between">
                                <label className="text-[#981D26] font-medium">Email:</label>
                                <input 
                                    type="text"
                                    value={profile.Email || "N/A"}
                                    className="border border-gray-300 rounded p-2 w-84" 
                                    readOnly
                                />
                            </div>


                            <div className="flex justify-between">
                                <label className="text-[#981D26] font-medium">Phone No:</label>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="PhoneNo"
                                        value={updatedProfile.PhoneNo}
                                        onChange={handleChange}
                                        className="border border-gray-300 rounded p-2 w-84"
                                    />
                                ) : (
                                    <p className="border border-gray-300 rounded p-2 w-84">{profile.PhoneNo || "N/A"}</p>
                                )}
                            </div>


                            <div className="flex justify-between">
                                <label className="text-[#981D26] font-medium">Role:</label>
                                <input 
                                    type="text"
                                    value={profile.UserRole || "N/A"}
                                    className="border border-gray-300 rounded p-2 w-84" 
                                    readOnly
                                />
                            </div>
                        </div>
                    )}

                   
                    <div className="text-center mt-6 flex justify-center space-x-4">
                        {!isUpdated && (
                            <>
                                {!isEditing ? (
                                    <button
                                        onClick={handleEdit}
                                        className="bg-[#500E10] text-[#F59B9E] font-medium py-2 px-6 rounded-lg hover:bg-[#977073] hover:text-white"
                                    >
                                        Edit
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleSave}
                                        className="bg-[#500E10] text-[#F59B9E] font-medium py-2 px-6 rounded-lg hover:bg-[#977073] hover:text-white"
                                    >
                                        Save
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
