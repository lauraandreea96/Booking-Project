import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = (props) => {
    const {user,loading, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleClick=()=>{
        dispatch({type:"LOGOUT"});
        navigate("/login");
    }
    // style={{display: props.view ? "block" : "none"}}
  return (
    <div className= {props.view ? "sidebar active col-2-md col-4-sm col-6-xs" : "sidebar inactive col-2-md col-4-sm col-6-xs"}>
        <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
                <span className="logo">TravelBook</span>
            </Link>
        </div>
        <hr/>
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <li>
                        <DashboardIcon className="icon"/>
                        <span>Dashboard</span>
                    </li>
                </Link>
                <p className="title">LISTS</p>
                <Link to={"/users"} style={{ textDecoration: "none" }}>
                    <li>
                        <PersonOutlineIcon className="icon"/>
                        <span>Users</span>
                    </li>
                </Link>
                <Link to={"/hotels"} style={{ textDecoration: "none" }}>
                <li>
                    <StoreIcon className="icon"/>
                    <span>Hotels</span>
                </li>
                </Link>
                <Link to={"/rooms"} style={{ textDecoration: "none" }}>
                <li>
                    <CreditCardIcon className="icon"/>
                    <span>Rooms</span>
                </li>
                </Link>

                <p className="title">USER</p>
                <Link to={`/users/profile/${user._id}`} style={{ textDecoration: "none" }}>
                <li>
                    <AccountCircleOutlinedIcon className="icon"/>
                    <span>Profile</span>
                </li>
                </Link>
                <li>
                    <ExitToAppIcon className="icon"/>
                    <span onClick={handleClick}>Logout</span>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar