import { Link } from "react-router-dom"
import "./searchItem.css"

export const SearchItem = ({item}) => {
  return (
    <div className="searchItem">
        <img
        src={item.photos[0]}
        className="siImg"
        alt="propertyImage"
        />
        <div className="siDesc">
            <h1 className="siTitle">{item.name}</h1>
            <span className="siDistance">{item.distance}m from center</span>
            <span className="siTaxiOp">Free airport taxi</span>
            <span className="siSubtitle">
            Studio Apartment with Air conditioning
            </span>
            <span className="siFeatures">
            {item.desc}
            </span>
            <span className="siCancelOp">Free cancellation </span>
        </div>
        <div className="siDetails">
            <div className="siDetailTexts">
                <span className="siPrice">${item.cheapestPrice}</span>
                <span className="siTaxOp">Includes taxes and fees</span>
                <Link to={`/hotels/${item._id}`}>
                <button className="siCheckButton">See availability</button>
                </Link>
            </div>
        </div>
    </div>
  )
}
