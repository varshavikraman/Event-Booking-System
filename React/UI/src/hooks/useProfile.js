import { useEffect, useState } from "react";

export default function useProfile() {
  const [profile, setProfile] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
       
        const res = await fetch("/api/getUser", {
            method: 'GET',
            credentials: 'include',
          });
        if (res.ok) {
          const data = await res.json();
          setProfile(data); 
        } 
      } catch (error) {
        console.error("Profile fetch error:", error);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return { profile, loading };
}
