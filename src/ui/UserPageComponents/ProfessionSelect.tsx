import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { UseFormRegister, FieldValues } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material/Select";
import { textFieldStyles } from "../../types/type";

interface ProfessionSelectProps {
  register: UseFormRegister<FieldValues>;
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  errorMessage?: string;
}

const ProfessionSelect: React.FC<ProfessionSelectProps> = ({
  register,
  value,
  onChange,
  errorMessage,
}) => (
  <FormControl fullWidth error={!!errorMessage} sx={textFieldStyles}>
    <InputLabel id="profession-label">Професија</InputLabel>
    <Select
      labelId="profession-label"
      label="Професија"
      {...register("profession", { required: "Ве молиме изберете професија" })}
      value={value}
      onChange={onChange}
    >
      <MenuItem value="">
        <em>-- Изберете --</em>
      </MenuItem>
      <MenuItem value="HR Регрутер">HR Регрутер</MenuItem>
      <MenuItem value="HR Практикант">HR Практикант</MenuItem>
      <MenuItem value="Практикант">Практикант</MenuItem>
    </Select>
    {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
  </FormControl>
);

export default ProfessionSelect;
