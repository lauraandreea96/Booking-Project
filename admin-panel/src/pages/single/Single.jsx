import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import { useFetch } from "../../hooks/useFetch";
import "./single.scss";

const Single = (props) => {
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const object = location.pathname.split("/");
  const objectId =object[object.length - 1];
  const {data, loading} = useFetch(
    type==="hotels" ? `/${type}/find/${objectId}` : `/${type}/${objectId}`
  );
 
  return (
    <div className="single">
      <Sidebar view={props.view}/>
      <div className="singleContainer col-10-md col-12-xs">
        <div className="top">
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="left col-3-md col-12-xs">{
                loading ? <p>data id loading</p> : (
                  <img src={(type === "users") ? data.img : (type === "hotels") ? data.photos : "https://cdn-icons-png.flaticon.com/512/341/341144.png"} alt="" className="itemImg" />
                )}
                <h1 className="itemTitle">{type === "users" ? data.username : data.title}</h1>
              </div>
              <div className="details col-9-md col-12-xs">
                  {loading ? "loading" : Object.entries(data).map(item=>{
                    if(["roomNumbers","img", "password", "photos", "featured", "__v", "isAdmin"].includes(item[0]) === false ){
                      return (
                        <div className="detailItem col-6-lg col-12-xs" key={item[0]}>
                          <span className="itemKey">{item[0]}</span>
                          <span className="itemValue">{item[1]}</span>
                        </div>
                      )
                    }
                  }
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Single;