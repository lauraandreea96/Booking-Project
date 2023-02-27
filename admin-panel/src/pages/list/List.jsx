import Datatable from "../../components/datatable/Datatable";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";
import { useLocation } from 'react-router-dom';

const List = (props) => {
  const location = useLocation().pathname.split("/")[1];
  
  return (
    <div className="list">
      <Sidebar view={props.view}/>
      <div className="listContainer col-10-md col-12-xs">
        <Datatable columns={props.columns} type={location}/>
      </div>
    </div>
  )
}

export default List;