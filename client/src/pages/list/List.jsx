import "./list.css"
import { Navbar } from '../../components/navbar/Navbar';
import { Footer } from '../../components/footer/Footer';
import { useLocation } from "react-router-dom";
import { useState } from "react";
import {format} from "date-fns";
import { DateRange } from "react-date-range";
import { SearchItem } from "../../components/searchItem/SearchItem";
import {useFetch} from "../../hooks/useFetch.js";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

export const List = () => {

  const location =useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [isActive, setActive ] = useState(false);

 
  console.log(destination);
  const{data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`);
  console.log(data);
  const {dispatch} = useContext(SearchContext);

  const handleClick =()=>{
    dispatch({type:"NEW_SEARCH", payload: {destination, dates, options}});
    setActive(!isActive);
  }

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <div>
        <Navbar/>
        <div className="listContainer">
          <div className="listWrapper">
            <button className={isActive ? "openSearch active" : "openSearch"} onClick={handleToggle}>Open Search Options</button>
            <div className={isActive ? "listSearch active" : "listSearch"}>
            <button className="closeSearch" onClick={handleToggle}>Close Search</button>
              <h1 className="lsTitle">Search</h1>
              <div className="lsItem">
                <label>Destination</label>
                <input placeholder={destination} type="text" onChange={e=>setDestination(e.target.value)}/>
              </div>
              <div className="lsItem">
                <label>Check-in Date</label>
                <span onClick={()=>setOpenDate(!openDate)}>{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && <DateRange 
                editableDateInputs={true}
                onChange={item => setDates([item.selection])}
                moveRangeOnFirstSelection={false}
                minDate={new Date()}
                ranges={dates}
                />}
              </div>
              <div className="lsItem">
                <label>Options</label>
                <div className="lsOptions">
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Min price <small>per night</small></span>
                    <input type="number" onChange={e=>setMin(e.target.value)} className="lsOptionInput" />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Max price <small>per night</small></span>
                    <input type="number" onChange={e=>setMax(e.target.value)} className="lsOptionInput" />
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Adult</span>
                    <input min={1} type="number" className="lsOptionInput" placeholder={options.adult}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Children</span>
                    <input min={0} type="number" className="lsOptionInput" placeholder={options.children}/>
                  </div>
                  <div className="lsOptionItem">
                    <span className="lsOptionText">Room</span>
                    <input min={1} type="number" className="lsOptionInput" placeholder={options.room}/>
                  </div>
                </div>
              </div>
              <button onClick={handleClick}>Search</button>
            </div>
            <div className="listResult">
              {loading ? ("Loading, please wait") : (<>
              {data.map(item =>(
                <SearchItem item={item} key={item._id}/>
              ))} 
              </>)}
            </div>
          </div>
        </div>
        <Footer/>
    </div>
  )
}
