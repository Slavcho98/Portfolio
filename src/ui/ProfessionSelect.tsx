import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, FormHelperText, SelectChangeEvent } from '@mui/material';
import { UseFormRegister } from 'react-hook-form';

interface FormValues {
  profession: string;
}

interface ProfessionSelectProps {
  register: UseFormRegister<FormValues>;
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
  <FormControl fullWidth error={!!errorMessage}>
    <InputLabel color="warning" id="profession-label">
      Професија
    </InputLabel>
    <Select
      labelId="profession-label"
      label="Професија"
      color="warning"
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
