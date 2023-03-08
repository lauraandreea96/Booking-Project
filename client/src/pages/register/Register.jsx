import { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./register.css";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [credentials, setCredential] = useState({
        email: null,
        username: undefined,
        password: undefined,
    })
    const {loading, error, dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleChange = (e)=>{
        setCredential(prev =>({...prev, [e.target.id]: e.target.value}))
    }
    const handleClick = async (e)=>{
        e.preventDefault();
        dispatch({type:"REGISTER_START"});
        try{
            const res = await axios.post("/auth/register", credentials);
            dispatch({type:"REGISTER_SUCCESS", payload: res.data.details});
            navigate("/");
        }catch(err){
            dispatch({type:"REGISTER_FAILURE", payload: err.response.data});
        }
    };

  return (
    <div className="register">
        <div className="lContainer">
            <input type="text" placeholder="email" id="email" onChange={handleChange} className="lInput"/>
            <input type="text" placeholder="country" id="country" onChange={handleChange} className="lInput"/>
            <input type="text" placeholder="city" id="city" onChange={handleChange} className="lInput"/>
            <input type="text" placeholder="phone" id="phone" onChange={handleChange} className="lInput"/>
            <input type="text" placeholder="username" id="username" onChange={handleChange} className="lInput"/>
            <input type="password" placeholder="password" id="password" onChange={handleChange} className="lInput"/>
            <button disabled={loading} onClick={handleClick} className="lButton">Register</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}