import { Backdrop, CircularProgress, useTheme } from "@mui/material";
import { useLoading } from "../hook/useLoading";

export const GlobalLoading = () => {
  const isLoading = useLoading();
  const theme = useTheme();
  if (!isLoading) return null;
  return (
    <Backdrop open={isLoading} sx={{ color: "#fff", zIndex: theme.zIndex.drawer + 999 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
