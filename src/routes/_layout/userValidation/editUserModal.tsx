import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { $ZodIssue } from "zod/v4/core";
import { FindUserApi } from "../../../api/user.api";
import { useNotification } from "../../../hook/useNotificationContext";
import { type UserFormValues, userSchema } from "../../../schema/user.schema";

export function EditUserModal({ userId, onClose }: { userId: number; onClose: () => void }) {
  const { data: user } = useQuery({
    queryKey: ["editVidationUser", userId],
    queryFn: async () => FindUserApi({ userId: Number(userId) }),
  });

  const addMutation = useMutation({
    mutationFn: async (add: UserFormValues) => FindUserApi({ userId: add.id }),
  });

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [ipAddress, setIpAddress] = useState<string>("");
  const [validateError, setValidateError] = useState<Record<string, string>>();
  const { setNotification } = useNotification();
  const onSubmit = (data: UserFormValues) => {
    console.log("onSubmit data:", data);
    addMutation.mutate(data, {
      onSuccess: () => {
        setNotification({ type: "success", message: "User Save Success", onAfterClose: onClose });
      },
      onError: () => {
        setNotification({ type: "error", message: "User Save Failed" });
      },
    });
  };
  useEffect(() => {
    console.log("useEffect");
    if (user) {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setGender(user.gender);
      setEmail(user.email);
      setIpAddress(user.ip_address);
    }
  }, [user]);
  const handleSubmit = () => {
    setIDialog(false);
    console.log("handleSubmit");
    const data = {
      id: userId,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      email,
      ip_address: ipAddress,
    };
    const isValid = handlerValidation(data);
    if (isValid) {
      onSubmit(data);
    }
  };
  const handlerValidation = (data: UserFormValues): boolean => {
    const validResult = userSchema.safeParse(data);
    if (!validResult.success) {
      const errorMap: Record<string, string> = {};

      errorMap.first_name = filterErrorMessage(validResult.error.issues, "first_name");
      errorMap.last_name = filterErrorMessage(validResult.error.issues, "last_name");
      errorMap.gender = filterErrorMessage(validResult.error.issues, "gender");
      errorMap.email = filterErrorMessage(validResult.error.issues, "email");
      errorMap.ip_address = filterErrorMessage(validResult.error.issues, "ip_address");
      setValidateError(errorMap);
    }
    return validResult.success;
  };
  const [isDialog, setIDialog] = useState<boolean>();
  const handlerValidationDialog = () => {
    setIDialog(true);
    const data = {
      id: userId,
      first_name: firstName,
      last_name: lastName,
      gender: gender,
      email,
      ip_address: ipAddress,
    };
    const isValid = handlerValidation(data);
    if (isValid) {
      onSubmit(data);
    }
  };

  useEffect(() => {
    if (isDialog && validateError && Object.keys(validateError).length > 0) {
      const messages = Object.values(validateError)
        .map((error) => error)
        .filter((error) => error)
        .join("\n"); // 改行区切りでまとめる
      setNotification({ type: "error", message: messages });
    }
  }, [isDialog, validateError, setNotification]);
  const filterErrorMessage = (issue: $ZodIssue[], name: string) => {
    return issue.filter((e) => e.path.includes(name))?.flatMap((e) => e.message)[0];
  };
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>ユーザー編集</DialogTitle>
      <DialogContent>
        <TextField name="id" label="User Id" disabled fullWidth margin="normal" value={userId} />
        <TextField
          name="first_name"
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={!!validateError?.first_name}
          helperText={validateError?.first_name}
          fullWidth
          margin="normal"
        />
        <TextField
          name="last_name"
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          error={!!validateError?.last_name}
          helperText={validateError?.last_name}
          fullWidth
          margin="normal"
        />
        <TextField
          name="gender"
          label="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          error={!!validateError?.gender}
          helperText={validateError?.gender}
          fullWidth
          margin="normal"
        />
        <TextField
          name="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!validateError?.email}
          helperText={validateError?.email}
          fullWidth
          margin="normal"
        />
        <TextField
          name="ip_address"
          label="IP Address"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          error={!!validateError?.ip_address}
          helperText={validateError?.ip_address}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>キャンセル</Button>
        <Button onClick={handleSubmit} variant="contained">
          保存
        </Button>
        <Button onClick={handlerValidationDialog} variant="contained">
          保存(Dialog)
        </Button>
      </DialogActions>
    </Dialog>
  );
}
