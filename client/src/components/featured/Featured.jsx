import "./featured.css";
import { useFetch } from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";

export const Featured = () => {

  const dates = [
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ];
  const options = {
    adult: 1,
    children: 0,
    room: 1,
  };
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  );
  const navigate = useNavigate();
  const {dispatch} = useContext(SearchContext);

  const handleClick = (e)=>{
    dispatch({type:"NEW_SEARCH", payload: {destination: e.target.name, dates, options}})
    navigate("/hotels", {state:{destination: e.target.name, dates, options}})
  }

  return (
    <div className="featured">
        {loading ? 
        ("Loading, please wait") : (
        <>
          <div className="featuredItem">
              <img src="https://theplanetd.com/images/places-to-visit-in-berlin-germany.jpg"
              alt=""
              name="berlin"
              className="featuredImg"
              onClick={handleClick}/>
              <div className="backgroundTitles"></div>
              <div className="featuredTitles">
                  <h1>Berlin</h1>
                  <h2>{data[0]} properties</h2>
              </div>
          </div>
          <div className="featuredItem">
          <img
            src="https://media.istockphoto.com/id/514769480/photo/madrid-spain-on-gran-via.jpg?s=612x612&w=0&k=20&c=5PDxqwnxYmudMHIs3ZkRJRE64153nnw-hJTH2zdryzc="
            alt=""
            name="madrid"
            className="featuredImg"
            onClick={handleClick}
          />
          <div className="backgroundTitles"></div>
          <div className="featuredTitles">
            <h1>Madrid</h1>
            <h2>{data[1]} properties</h2>
          </div>
        </div>
        <div className="featuredItem">
          <img
            src="https://i0.wp.com/www.montcalmroyallondoncity.co.uk/blog/wp-content/uploads/2017/07/shutterstock_107597459.jpg?fit=1000%2C667&ssl=1"
            alt=""
            name="london"
            className="featuredImg"
            onClick={handleClick}
          />
          <div className="backgroundTitles"></div>
          <div className="featuredTitles">
            <h1>London</h1>
            <h2>{data[2]} properties</h2>
          </div>
        </div>
      </>
      )}
    </div>
  )
}
