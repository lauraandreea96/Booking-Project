import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useState } from 'react';
import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = (props) => {
  // const [view, setView] = useState(false);
  // const handleView = ()=>{
  //   setView(!view)
  // }

  return (
    <div className="home">
        {/* <div className="openMenu">
          <MenuOutlinedIcon className="menuIcon" onClick={handleView} style={{display: view ? "none" : "block"}}/>
          <CloseOutlinedIcon className='closeMenu' onClick={handleView} style={{display: view ? "block" : "none"}}/>
        </div> */}
        <Sidebar view={props.view}/>
        <div className="homeContainer col-10-md col-12-xs">  
          <div className="widgets">
            <Widget type="users"/>
            <Widget type="hotels"/>
            <Widget type="rooms"/>
            <Widget type="booked"/>
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Users</div>
            <Table type="users"/>
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Hotels</div>
            <Table type="hotels"/>
          </div>
        </div>
    </div>
  )
}

export default Home;