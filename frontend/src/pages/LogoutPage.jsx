import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";

export default function LogoutPage(){
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    handleLogout();
    console.log("Logged Out!")
    return <></>;
}