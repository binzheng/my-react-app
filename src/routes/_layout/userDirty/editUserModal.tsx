import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, type SxProps, type Theme } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FindUserApi } from "../../../api/user.api";
import { TextFieldController } from "../../../component/textFieldController";
import { useNotification } from "../../../hook/useNotificationContext";
import { type UserFormValues, userSchema } from "../../../schema/user.schema";

const getDirtyStyle = (isDirty?: boolean): SxProps<Theme> =>
  isDirty
    ? {
        "& .MuiInputBase-input.Mui-disabled": {
          WebkitTextFillColor: "red",
          color: "red",
          fontWeight: "bold",
        },
        "& .MuiInputLabel-root.Mui-disabled": {
          color: "red",
          fontWeight: "bold",
        },
        "& .MuiOutlinedINput-root.Mui-disabled fieldset": {
          borderColor: "red",
          borderWidth: 2,
        },
      }
    : {};

export function EditUserModal({ userId, onClose }: { userId: number; onClose: () => void }) {
  const { data: user } = useQuery({
    queryKey: ["editUser2", userId],
    queryFn: async () => FindUserApi({ userId: Number(userId) }),
  });

  const addMutation = useMutation({
    mutationFn: async (add: UserFormValues) => FindUserApi({ userId: add.id }),
  });
  const [isConfirm, setIsConfirm] = useState(false);
  const {
    handleSubmit,
    reset,
    control,
    trigger,
    formState: { dirtyFields, isDirty },
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
  const handlerConfirm = async () => {
    const validation = await trigger();
    console.log("validation:", validation);
    if (validation) {
      setIsConfirm(true);
    }
  };
  return (
    <Dialog open onClose={onClose}>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>ユーザー編集</DialogTitle>
        <DialogContent>
          <TextFieldController name="id" label="User Id" control={control} disabled />
          <TextFieldController
            name="first_name"
            label="First Name"
            control={control}
            disabled={isConfirm}
            sx={getDirtyStyle(dirtyFields.first_name)}
          />
          <TextFieldController
            name="last_name"
            label="Last Name"
            control={control}
            disabled={isConfirm}
            sx={getDirtyStyle(dirtyFields.last_name)}
          />
          <TextFieldController name="gender" label="Gender" control={control} disabled={isConfirm} sx={getDirtyStyle(dirtyFields.gender)} />
          <TextFieldController name="email" label="Email" control={control} disabled={isConfirm} sx={getDirtyStyle(dirtyFields.email)} />
          <TextFieldController
            name="ip_address"
            label="IP Address"
            control={control}
            disabled={isConfirm}
            sx={getDirtyStyle(dirtyFields.ip_address)}
          />
        </DialogContent>
        <DialogActions>
          {isConfirm && (
            <>
              <Button onClick={() => setIsConfirm(false)}>キャンセル</Button>
              <Button type="submit" variant="contained">
                保存
              </Button>
            </>
          )}
          {!isConfirm && (
            <>
              <Button onClick={onClose}>キャンセル</Button>
              <Button onClick={handlerConfirm} variant="contained" disabled={!isDirty}>
                確認
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}
