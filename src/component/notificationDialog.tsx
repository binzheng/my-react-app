import { Cancel, CheckCircle } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { useNotification } from "../hook/useNotificationContext";

export const NotificationDialog = () => {
  const { notification, clearNotification } = useNotification();
  if (!notification) return undefined;
  const handlerClose = () => {
    clearNotification();
    notification?.onAfterClose?.();
  };
  return (
    <Dialog open={!!notification} onClose={handlerClose} fullWidth slotProps={{ paper: { sx: { width: "500px" } } }}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {notification.type === "success" ? (
          <>
            <CheckCircle color="success" fontSize="large" />
            <Typography color="success">Success</Typography>
          </>
        ) : (
          <>
            <Cancel color="error" fontSize="large" />
            <Typography color="error">Error</Typography>
          </>
        )}
      </DialogTitle>
      <DialogContent sx={{ whiteSpace: "pre-wrap", wordBreak: "bread-word" }}>{notification.message}</DialogContent>
      <DialogActions>
        <Button onClick={handlerClose} autoFocus {...(notification.type === "success" ? {} : { color: "error", variant: "outlined" })}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
