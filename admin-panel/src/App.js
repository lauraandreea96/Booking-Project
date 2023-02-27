import Home from "./pages/home/Home";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {Login} from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import { hotelInputs, roomInputs, userInputs } from "./formSource";
import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/new/NewHotel";
import NewRoom from "./pages/new/NewRoom";
import Profile from "./pages/profile/Profile";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import "./styles/styles.scss";



function App() {

  const ProtectedRoute = ({children})=>{
    const {user} = useContext(AuthContext);

    if(!user){
      return <Navigate to="/login" />
    }
    return children;
  }

  const [view, setView] = useState(false);
  const handleView = ()=>{
    setView(!view)
  }

  return (
    <div className="App">
      <div className="openMenu">
          <MenuOutlinedIcon className="menuIcon" onClick={handleView} style={{display: view ? "none" : "block"}}/>
          <CloseOutlinedIcon className='closeMenu' onClick={handleView} style={{display: view ? "block" : "none"}}/>
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<ProtectedRoute><Home view = {view}/></ProtectedRoute>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="users">
              <Route index element={<ProtectedRoute><List columns={userColumns} view = {view}/></ProtectedRoute>}/>
              <Route path=":userId" element={<ProtectedRoute><Single view = {view}/></ProtectedRoute>}/>
              <Route path="new" element={<ProtectedRoute><New inputs={userInputs} view = {view} title="Add New User"/></ProtectedRoute>}/>
              <Route path="profile/:id" element={<ProtectedRoute><Profile view = {view}/></ProtectedRoute>}/>
            </Route>
            <Route path="hotels">
              <Route index element={<List columns={hotelColumns} view = {view}/>}/>
              <Route path=":hotelId" element={<Single view = {view}/>}/>
              <Route path="new" element={<NewHotel inputs={hotelInputs} view = {view} title="Add New Hotel"/>}/>
            </Route>
            <Route path="rooms">
              <Route index element={<List columns={roomColumns} view = {view}/>}/>
              <Route path=":roomId" element={<Single view = {view}/>}/>
              <Route path="new" element={<NewRoom inputs={roomInputs} view = {view} title="Add New Room"/>}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
