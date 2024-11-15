import React from "react";
import {
  TextField,
  IconButton,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { textFieldStyles } from "../../types/type";

interface PasswordFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onTogglePassword: () => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  label,
  value,
  onChange,
  showPassword,
  onTogglePassword,
}) => (
  <FormControl fullWidth variant="filled">
    <TextField
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      onChange={onChange}
      sx={textFieldStyles}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={onTogglePassword}>
              {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  </FormControl>
);

export default PasswordField;
