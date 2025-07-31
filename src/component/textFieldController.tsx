import { TextField, type TextFieldProps } from "@mui/material";
import { type Control, Controller, type FieldPath, type FieldValues } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
} & TextFieldProps;

export const TextFieldController = <T extends FieldValues>({ name, control, label, ...textFieldProps }: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          label={label}
          fullWidth
          margin="normal"
          {...field}
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          {...textFieldProps}
        />
      )}
    />
  );
};
