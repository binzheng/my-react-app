import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FindUserApi } from "../../../api/user.api";
import { TextFieldController } from "../../../component/textFieldController";
import { useNotification } from "../../../hook/useNotificationContext";
import { type UserFormValues, userSchema } from "../../../schema/user.schema";

export const Route = createFileRoute("/_layout/userRoute/$userId")({
  component: EditUserModal,
});

function EditUserModal() {
  const { userId } = useParams({ strict: false });

  const { data: user } = useQuery({
    queryKey: ["editUser", userId],
    queryFn: async () => FindUserApi({ userId: Number(userId) }),
  });

  const addMutation = useMutation({
    mutationFn: async (add: UserFormValues) => FindUserApi({ userId: add.id }),
  });

  const { handleSubmit, reset, control } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      id: user?.id ?? 0,
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      email: user?.email ?? "",
      gender: user?.gender ?? "",
      ip_address: user?.ip_address ?? "",
    },
  });

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const navigate = useNavigate();
  const handleClose = () => navigate({ to: "/user" });
  const { setNotification } = useNotification();
  const onSubmit = (data: UserFormValues) => {
    addMutation.mutate(data, {
      onSuccess: () => {
        setNotification({
          type: "success",
          message: "User Save Success",
          onAfterClose: () => navigate({ to: "/user" }),
        });
      },
      onError: () => {
        setNotification({
          type: "error",
          message: "User Save Failed",
        });
      },
    });
  };
  return (
    <Dialog open onClose={handleClose}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>ユーザー編集</DialogTitle>
        <DialogContent>
          <TextFieldController name="id" label="User Id" control={control} disabled />
          <TextFieldController name="first_name" label="First Name" control={control} />
          <TextFieldController name="last_name" label="Last Name" control={control} />
          <TextFieldController name="gender" label="Gender" control={control} />
          <TextFieldController name="email" label="Email" control={control} />
          <TextFieldController name="ip_address" label="IP Address" control={control} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button type="submit" variant="contained">
            保存
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
