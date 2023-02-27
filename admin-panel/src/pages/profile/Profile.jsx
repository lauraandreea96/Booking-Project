import "./profile.scss"
import React, { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { AuthContext } from '../../context/AuthContext'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";

const Profile = (props) => {
    const{user, dispatch} = useContext(AuthContext);
    const [file, setFile] = useState(user.img);
    const [info, setInfo] = useState({});
    console.log(user);
    
    const handleChange = (e) =>{
        setInfo(prev => ({
            ...prev,
            [e.target.id]: e.target.value
        }))
    }
    


    const handleClick = async (e) =>{
        e.preventDefault();
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        try{
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dpp13bpyb/image/upload", data);
        const {url} = uploadRes.data;

        const updateUser = {
            ...info,
            img: url,
        };


        await axios.put(`/users/${user._id}`, updateUser);
        }catch(err){
        console.log(err);
        }
    };
    

  return (
    <div className='profile'>
        <Sidebar view={props.view}/>
        <div className="profileContainer col-10-md col-12-xs">
            <div className="container">
                <div className="left col-3-md col-12-xs">
                    <img src={file} alt="" className="profileImg" />
                </div>
                <div className="right col-9-md col-12-xs">
                    <form>
                        <div className="formInput col-6-lg col-12-xs">
                            <label htmlFor="file"> Update Image: <DriveFolderUploadOutlinedIcon className="icon"/></label>
                            <input type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display: "none"}}/>
                        </div>
                        <div className="formInput col-6-lg col-12-xs">
                            <label>Username</label>
                            <input id="username"  placeholder={user.username} onChange={handleChange}/>
                        </div>
                        <div className="formInput col-6-lg col-12-xs">
                            <label>Email</label>
                            <input id="email"  placeholder={user.email} onChange={handleChange}/>
                        </div>
                        <div className="formInput col-6-lg col-12-xs">
                            <label>Phone</label>
                            <input id="phone"  placeholder={user.phone} onChange={handleChange}/>
                        </div>
                        <div className="formInput col-6-lg col-12-xs">
                            <label>Password</label>
                            <input id="password"  placeholder={user.password} onChange={handleChange}/>
                        </div>
                        <div className="formInput col-6-lg col-12-xs">
                            <label>Country</label>
                            <input id="country"  placeholder={user.country} onChange={handleChange}/>
                        </div>
                        <div className="formInput col-6-lg col-12-xs">
                            <label>City</label>
                            <input id="city"  placeholder={user.country} onChange={handleChange}/>
                        </div>
                        <button className="col-6-lg col-12-xs" onClick={handleClick}>Update Profile</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
