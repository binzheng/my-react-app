import { Box, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SearchUserApi } from "../../../api/user.api";
import { useNotification } from "../../../hook/useNotificationContext";
import { EditUserModal } from "./editUserModal";
export const Route = createFileRoute("/_layout/userFindError")({
  component: UserFindError,
});
function UserFindError() {
  const { data, isFetching, error } = useQuery({
    queryKey: ["userFindError"],
    queryFn: async () => SearchUserApi(),
  });
  const { setNotification } = useNotification();
  useEffect(() => {
    if (error) {
      setNotification({ type: "error", message: "User Index Error" });
    }
  }, [error, setNotification]);
  const [userId, setUserId] = useState<number>();
  const columns = [
    {
      field: "editBtn",
      headerName: "Edit",
      width: 100,
      renderCell: (param: { row: { id: any } }) => (
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
