import React from 'react';
import { TextField } from '@mui/material';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, disabled }) => (
  <TextField
    label={label}
    variant="outlined"
    fullWidth
    value={value}
    onChange={onChange}
    disabled={disabled}
    sx={{ mb: 3 }} 
  />
);

export default InputField;
