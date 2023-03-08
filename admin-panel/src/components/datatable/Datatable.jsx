import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid'
import { userColumns, userRows } from "../../datatablesource"
import { Link, useLocation } from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const Datatable = ({type, columns}) => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const {data, loading, err} = useFetch(`/${path}`);
    const [list, setList] = useState(data);

    useEffect(()=>{
        setList(data);
    },[data]);
    const handleDelete = async (id, hotelId) =>{
        try{
            if(path === "rooms"){
                await axios.delete(`/${path}/${id}/${hotelId}`);
                
                const allrooms = await axios.get(`/hotels/room/${hotelId}`);
                const newrooms = allrooms.filter(item => item._id !== id );
                await axios.put(`/hotels/${hotelId}`, {"rooms" : newrooms});
            }else{
                await axios.delete(`/${path}/${id}`);
            }
            
        }catch(err){}

        setList(list.filter((item)=> item._id !== id));
    };
    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params)=>{
                return (
                    <div className="cellAction">
                        <Link to={`/${type}/${params.row._id}`} style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div className="deleteButton" onClick={()=>handleDelete(params.row._id, params.row.hotelId)}>Delete</div>
                    </div>
                )
            }
        }
    ];

  return (
    <div className="datatable">
        <div className="datatableTitle">
            All {type}
            <Link to={`/${type}/new`} style={{ textDecoration: "none" }} className="link">
                Add New
            </Link>
        </div>
         <DataGrid
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={row => row._id}
        />
    </div>
  )
}

export default Datatable