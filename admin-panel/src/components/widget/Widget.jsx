import "./widget.scss";
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";

const Widget = ({type}) => {
  let data;
  const { data: hotelsCount } = useFetch(
    "/hotels/count"
  );
  const { data: usersCount } = useFetch(
    "/users/count/AllUsers"
  );
  const { data: bookingsCount } = useFetch(
    "/rooms"
  );
  let totalRooms= 0
  let roomsBooked = 0;
  bookingsCount.map(room => {
    for (let i = 0; i < room.roomNumbers.length; i++){
      totalRooms++;
      if(room.roomNumbers[i].unavailableDates.length > 0){
        roomsBooked++;
      }
    }
  })
  switch(type){
    case "users":
      data= {
        title: "USERS",
        amount: usersCount,
        icon: <PersonOutlinedIcon className="icon" style={{color:"crimson", backgroundColor: "rgba(255, 0, 0, 0.2)"}}/>
      };
      break;
      case "hotels":
      data= {
        title: "HOTELS",
        amount: hotelsCount,
        icon: <CorporateFareIcon className="icon" style={{color:"goldenrod", backgroundColor: "rgba(218, 165, 32, 0.2)"}}/>
      };
      break;
      case "rooms":
      data= {
        title: "ROOMS",
        amount: totalRooms,
        icon: <HotelOutlinedIcon className="icon" style={{color:"green", backgroundColor: "rgba(0, 128, 0, 0.2)"}}/>
      };
      break;
      case "booked":
      data= {
        title: "ROOMS BOOKED",
        amount: roomsBooked,
        icon: <EventAvailableOutlinedIcon className="icon" style={{color:"purple", backgroundColor: "rgba(128, 0, 128, 0.2)"}}/>
      };
      break;
      default:
        break;
  };

  return (
    <div className="widget col-3-lg col-6-md col-12-xs">
        <div className="left">
            <span className="title">{data.title}</span>
            <span className="counter">{data.amount}</span>
            {type !== "booked" ?
            <span className="link">
              <Link to={`/${type}`} style={{ textDecoration: "none", color:"black" }}>
                See all {type}
              </Link>
            </span> : <span style={{ fontSize: "12px"}}>{ (roomsBooked * 100 / totalRooms).toFixed()}% of the rooms are {type}</span>}
        </div>
        <div className="right">
            {data.icon}
        </div>
    </div>
  )
}

export default Widget