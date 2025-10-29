import { useContext, useEffect } from 'react';
import { AuthContext } from "../context/AuthContext";

export default function LogoutPage() {
  const { logout } = useContext(AuthContext);

  // useEffect is the correct place for "side effects"
  useEffect(() => {
    // 1. Call your logout function.
    // This will set the React state to null AND
    // clear localStorage.
    logout();
    
    // 2. Force a full page reload to the /login route.
    // This blows away the old React state and
    // forces the app to re-load from scratch.
    window.location.href = '/login';

  }, []); // The empty [] array ensures this runs only once.

  // Render nothing (a blank page) while this logic runs.
  return null;
}