import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { SearchUserApi } from "../../../api/user.api";
export const Route = createFileRoute("/_layout/userRoute/")({
  component: UserIndex,
});
function UserIndex() {
  const { data, isFetching } = useQuery({
    queryKey: ["user"],
    queryFn: async () => SearchUserApi(),
  });
  const columns = [
    {
      field: "editBtn",
      headerName: "Edit",
      width: 100,
      renderCell: (param: { row: { id: number } }) => (
        <Link to="/userRoute/$userId" params={{ userId: param.row.id }}>
          <Button variant="contained" size="small">
            Edit
          </Button>
        </Link>
      ),
    },
    { field: "id", headerName: "UserId", width: 80 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Laster Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "ip_address", headerName: "IP Address", width: 150 },
  ];
  return (
    <>
      <Box>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          loading={isFetching}
          disableRowSelectionOnClick
        ></DataGrid>
      </Box>
    </>
  );
}
