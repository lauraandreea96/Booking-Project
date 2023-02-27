import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import axios from "axios";

const NewRoom = ({inputs, title, view}) => {

  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);

  const {data, loading, error} = useFetch("/hotels");

  const handleChange = e =>{
    setInfo(prev =>({...prev, [e.target.id]:e.target.value}));
  }

  const handleClick = async e =>{
    e.preventDefault();
    const roomNumbers = rooms.split(",").map(room => ({number: room}));
    try{
      await axios.post(`/rooms/${hotelId}`, {
        ...info,
        hotelId,
        roomNumbers
      })
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
          <div className="right">
            <form>
              {inputs.map(input => (
                <div className="formInput col-6-lg col-12-xs" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange}/>
                </div>
              ))}
              <div className="formInput col-6-lg col-12-xs">
                  <label>Rooms</label>
                  <textarea onChange={e => setRooms(e.target.value)} placeholder="Give comma between room numbers"></textarea>
              </div>
              <div className="formInput col-6-lg col-12-xs">
                  <label>Choose a hotel</label>
                  <select id="hotelId" onChange={e => setHotelId(e.target.value)}>
                    {loading ? "loading" : data && data.map(hotel =>(
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
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

export default NewRoom;