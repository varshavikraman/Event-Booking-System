import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signout = () => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/signout", {
        method: "GET", // Explicitly defining the method
        credentials: "include", // Ensures cookies are handled
      });

      if (res.ok) {
        toast.success("Signout successful");
        navigate("/");
      } else {
        toast.error("Failed to sign out");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return <button onClick={handleSignout}>Signout</button>;
};

export default Signout;
