import "./hotel.css";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot, faCalendarDays} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Reserve } from "../../components/reserve/Reserve";
import {format} from "date-fns";
import {DateRange} from "react-date-range";


export const Hotel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {dispatch} = useContext(SearchContext);
  const id = location.pathname.split("/")[2];
  const [slideIndex, setSliderIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {data, loading, error} = useFetch(`/hotels/find/${id}`);
  const{user} = useContext(AuthContext);
  const {dates, options} = useContext(SearchContext);
  const [openDate, setOpenDate] = useState(false);
  const [newDates, setNewDates] = useState({});

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i)=>{
    setSliderIndex(i);
    setOpen(true);
  }

  const handleMove = (direction)=> {
    let newSlideIndex;

    if(direction === "l"){
      newSlideIndex = slideIndex === 0 ? 5 : slideIndex-1;
    }else{
      newSlideIndex = slideIndex === 5 ? 0 : slideIndex+1;
    }

    setSliderIndex(newSlideIndex);
  }

  const handleClick = ()=>{
    if(user){
      setOpenModal(true);
    }else{
      navigate("/login");
    }
  };

  const handleSearch = ()=>{
    dispatch({type:"NEW_SEARCH", payload: {dates: newDates, options: {
      adult: 1,
      children: 0,
      room: 1,
      }
    }})
  }

  return (
    <div>
      <Navbar />
      <div className="hotel">    
      {loading ? ("Loading, please wait") : (
        <div className="hotelContainer">
          {open && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove("l")}/>
            <div className="sliderWrapper">
              <img src={data.photos[slideIndex]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")}/>
          </div>}
          <div className="hotelWrapper">
            <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelAdress">
              <FontAwesomeIcon icon={faLocationDot} />
              <span>{data.adress}</span>
            </div>
            <span className="hotelDistance"> Excellent location – {data.distance}m from center</span>
              <span className="hotelPriceHighlight">Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi</span>
            <div className="hotelImages">
              {data.photos?.map((photo, i) =>(
                <div className="hotelImgWrapper">
                  <img onClick={()=> handleOpen(i)} src={photo} alt="" className="hotelImg" />
                </div>
              ))}
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.name}</h1>
                <p className="hotelDesc">
                  {data.desc}
                </p>

                <div className="hotelSearch">
                  <div className="hotelSearchItem">
                    <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                    <span onClick={()=> setOpenDate(!openDate)} className="hotelSearchText">{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                      {openDate && <DateRange
                      editableDateInputs={true}
                      onChange={item => setNewDates([item.selection])}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      className="date"
                      minDate={new Date()}
                      /> }
                  </div>
                  <button onClick={handleSearch}>Change Dates</button>
                </div>
              </div>
              <div className="hotelDetailsPrice">
                <h1>Perfect for a {days}-night stay!</h1>
                <span>
                  Located in the real heart of Krakow, this property has an
                  excellent location score of 9.8!
                </span>
                <h2>
                  <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
                </h2>
                <button onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>)}
        {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
        </div>
        <Footer/>
    </div>
  )
}
