export const userColumns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
  
    {
      field: "country",
      headerName: "Country",
      width: 160,
    },
    {
      field: "city",
      headerName: "City",
      width: 160,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 160,
    },
  ];
  
  export const hotelColumns = [
    { field: "_id", headerName: "ID", width: 250 },
    {
      field: "name",
      headerName: "Name",
      width: 250,
    },
    {
      field: "type",
      headerName: "Type",
      width: 100,
    },
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
    {
      field: "city",
      headerName: "City",
      width: 100,
    },
  ];
  
  export const roomColumns = [
    { field: "_id", headerName: "ID", width: 270 },
    {
      field: "title",
      headerName: "Title",
      width: 230,
    },
    {
      field: "hotelId",
      headerName: "Hotel ID",
      width: 230,
    },
    // {
    //   field: "desc",
    //   headerName: "Description",
    //   width: 270,
    // },
    {
      field: "price",
      headerName: "Price",
      width: 100,
    },
    {
      field: "maxPeople",
      headerName: "Max People",
      width: 100,
    },
  ];