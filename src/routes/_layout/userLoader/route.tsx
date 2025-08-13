import { Box, Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SearchUserApi } from "../../../api/user.api";
import { EditUserModal } from "./editUserModal";
export const Route = createFileRoute("/_layout/userLoader")({
  loader: async () => {
    return await SearchUserApi();
  },
  gcTime: 0,
  staleTime: 0,
  component: UserLoader,
});
function UserLoader() {
  const data = Route.useLoaderData();
  console.log("User Loader", data);
  const navigation = useNavigate();
  const [userId, setUserId] = useState<number>();
  const columns = [
    {
      field: "editBtn",
      headerName: "Edit",
      width: 100,
      renderCell: (param: { row: { id: number } }) => (
        <Button variant="contained" size="small" onClick={() => setUserId(param.row.id)}>
          Edit
        </Button>
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
      {userId && <EditUserModal userId={userId} onClose={() => setUserId(undefined)} />}
      <Box>
        <TextField label="Key"></TextField>
        <Button onClick={() => navigation({ to: "/userLoader" })}>Search</Button>
        <DataGrid
          rows={data}
          columns={columns}
          getRowId={(row) => row.id}
          initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
          disableRowSelectionOnClick
        ></DataGrid>
      </Box>
    </>
  );
}
