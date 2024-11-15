import { Control, Controller } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import { FieldErrors } from "react-hook-form";
import { SignupFormInputs } from "../../types/type";

type InputProps = {
  name: keyof SignupFormInputs;
  control: Control<SignupFormInputs>;
  label: string;
  rules?: object;
  errors?: FieldErrors<SignupFormInputs>;
  textFieldStyles?: object;
} & TextFieldProps;

function Input({
  name,
  control,
  label,
  rules,
  errors,
  textFieldStyles,
  ...props
}: InputProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      rules={rules}
      render={({ field }) => (
        <TextField
          {...field}
          label={label}
          error={!!errors?.[name]}
          helperText={(errors?.[name]?.message as string) || null}
          sx={textFieldStyles}
          fullWidth
          {...props}
        />
      )}
    />
  );
}

export default Input;
