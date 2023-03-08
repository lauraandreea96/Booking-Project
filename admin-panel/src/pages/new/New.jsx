import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({inputs, title, view}) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const handleChange = e =>{
    setInfo(prev =>({...prev, [e.target.id]:e.target.value}));
  }
  const handleClick = async e =>{
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try{
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dpp13bpyb/image/upload", data);
      const {url} = uploadRes.data;
      const newUser = {
        ...info,
        img: url,
      };
      await axios.post("/auth/register", newUser);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="new">
      <Sidebar view={view}/>
      <div className="newContainer col-10-md col-12-xs">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left col-3-md col-12-xs">
            <img src= {file ? URL.createObjectURL(file) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right col-9-md col-12-xs">
            <form>
              <div className="formInput col-6-lg col-12-xs">
                <label htmlFor="file"> Image: <DriveFolderUploadOutlinedIcon className="icon"/></label>
                <input type="file" id="file" onChange={e=>setFile(e.target.files[0])} style={{display: "none"}}/>
              </div>
              {inputs.map(input => (
                <div className="formInput col-6-lg col-12-xs" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id}/>
              </div>
              ))}
              <button className="col-6-lg col-12-xs" onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default New;