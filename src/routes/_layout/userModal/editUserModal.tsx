import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FindUserApi } from "../../../api/user.api";
import { TextFieldController } from "../../../component/textFieldController";
import { useNotification } from "../../../hook/useNotificationContext";
import { type UserFormValues, userSchema } from "../../../schema/user.schema";

export function EditUserModal({ userId, onClose }: { userId: number; onClose: () => void }) {
  const { data: user } = useQuery({
    queryKey: ["editUser2", userId],
    queryFn: async () => FindUserApi({ userId: Number(userId) }),
  });

  const addMutation = useMutation({
    mutationFn: async (add: UserFormValues) => FindUserApi({ userId: add.id }),
  });

  const {
    handleSubmit,
    reset,
    control,
    trigger,
    getValues,
    formState: { isDirty, errors: validationError },
  } = useForm<UserFormValues>({
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

  const { setNotification } = useNotification();
  const onSubmit = (data: UserFormValues) => {
    addMutation.mutate(data, {
      onSuccess: () => {
        setNotification({
          type: "success",
          message: "User Save Success",
          onAfterClose: onClose,
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
  const handlerValidationDialog = async () => {
    const validation = await trigger();
    if (validation) {
      console.log("getValues: ", getValues());
      onSubmit(getValues());
    }
  };
  useEffect(() => {
    if (validationError && Object.keys(validationError).length > 0) {
      const messages = Object.values(validationError)
        .map((error) => error?.message)
        .join("\n"); // 改行区切りでまとめる
      setNotification({ type: "error", message: messages });
    }
  }, [validationError, setNotification]);
  return (
    <Dialog open onClose={onClose}>
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
          <Button onClick={onClose}>キャンセル</Button>
          <Button type="submit" variant="contained" disabled={!isDirty}>
            保存
          </Button>
          <Button onClick={handlerValidationDialog} variant="contained" disabled={!isDirty}>
            保存(Dialog)
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
