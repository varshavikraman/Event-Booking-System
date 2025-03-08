import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signout = () => {
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/signout", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        toast.success("Signout successful");

        navigate("/", { replace: true });
      } else {
        toast.error("Failed to sign out");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    handleSignout();
  }, []);

  return <p>Signing out...</p>;
};

export default Signout;
