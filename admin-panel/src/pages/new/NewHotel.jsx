import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const NewHotel = ({inputs, title, view}) => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const handleChange = e =>{
    setInfo(prev =>({...prev, [e.target.id]:e.target.value}));
  };
  const handleClick = async e =>{
    e.preventDefault();
    try{
      const list = await Promise.all(Object.values(files).map(async file => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dpp13bpyb/image/upload", data);
        const {url} = uploadRes.data;
        return url;
      }));
      const newhotel = {
        ...info, 
        photos: list
      }
      await axios.post("/hotels", newhotel);
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar view={view}/>
      <div className="newContainer col-10-md col-12-xs">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left col-3-md col-12-xs">
            <img src= {files ? URL.createObjectURL(files[0]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right col-9-md col-12-xs">
            <form>
              <div className="formInput col-6-lg col-12-xs">
                <label htmlFor="file"> Image: <DriveFolderUploadOutlinedIcon className="icon"/></label>
                <input type="file" id="file" multiple onChange={e=>setFiles(e.target.files)} style={{display: "none"}}/>
              </div>
              {inputs.map(input => (
                <div className="formInput col-6-lg col-12-xs" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange}/>
              </div>
              ))}
               <div className="formInput col-6-lg col-12-xs">
                  <label>Featured</label>
                  <select id="featured" onChange={handleChange}>
                    <option value={false}>No</option>   
                    <option value={true}>Yes</option>  
                  </select>
              </div>
              <button className="col-6-lg col-12-xs" onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewHotel;