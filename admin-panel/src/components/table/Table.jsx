import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useFetch } from "../../hooks/useFetch";

const List = ({type}) => {
  let data;
  const {data : userData} = useFetch("/users");
  const {data : hotelData} = useFetch("/hotels");
  if(type === "users"){
    data = userData;
  } else{
    data = hotelData;
  }

  return (
    <div className="table">
    <TableContainer component={Paper} style={{overflowX: 'scroll'}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">{type === "users" ? "User" : "Hotel"}</TableCell>
            <TableCell className="tableCell">City</TableCell>
            <TableCell className="tableCell">{type === "users" ? "Email" : "Distance"}</TableCell>
            <TableCell className="tableCell">{type === "users" ? "Phone" : "Cheapest Price"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.sort((a, b) => -a.createdAt.localeCompare(b.createdAt)).map((row) => (
            <TableRow
              key={row._id} 
            >
            <TableCell className="tableCell">{row._id}</TableCell>
            <TableCell className="tableCell">
                <div className="cellWrapper">
                    <img src={type === "users" ? row.img : row.photos[0]} alt="" className="image" />
                    {type === "users" ? row.username : row.name}
                </div>
            </TableCell>
            <TableCell className="tableCell">{row.city}</TableCell>
            <TableCell className="tableCell">{type === "users" ? row.email : row.distance}</TableCell>
            <TableCell className="tableCell">{type === "users" ? row.phone : row.cheapestPrice}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default List;