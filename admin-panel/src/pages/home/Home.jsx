import Sidebar from "../../components/sidebar/Sidebar";
import Table from "../../components/table/Table";
import Widget from "../../components/widget/Widget";
import "./home.scss";

const Home = (props) => {

  return (
    <div className="home">
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