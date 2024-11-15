import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { CheckboxGroupProps } from "../../types/type";

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ title, options }) => (
  <div>
    <Typography variant="caption">{title}</Typography>
    <FormGroup>
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          control={<Checkbox size="small" />}
          label={<Typography variant="body2">{option.label}</Typography>}
        />
      ))}
    </FormGroup>
  </div>
);

export default CheckboxGroup;
