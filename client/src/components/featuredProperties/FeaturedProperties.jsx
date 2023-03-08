import "./featuredProperties.css";
import { useFetch } from "../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

export const FeaturedProperties = () => {
    const {dispatch} = useContext(SearchContext);
    const { data, loading, error } = useFetch(
        "/hotels?fratured=true&limit=4"
      );
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
    const handleClick = ()=>{
        dispatch({type:"NEW_SEARCH", payload: { dates, options}})
    }

  return (
    <div className="fp">
        {loading ? "Loading,please wait" : <>
            {data.map(item =>(
                <div className="fpItem" key={item._id}>
                     <Link to={`/hotels/${item._id}`}>
                    <img
                    src={item.photos[0]}
                    alt=""
                    className="fpImg"
                    onClick={handleClick}
                    />
                    </Link>
                    <div className="details">
                      <h5 className="fpName">{item.name}</h5>
                      <p className="fpCity">{item.city}</p>
                      <p className="fpPrice">Starting from ${item.cheapestPrice}</p>
                    </div>
                </div>
            ))}
        </>}
    </div>
  )
}
