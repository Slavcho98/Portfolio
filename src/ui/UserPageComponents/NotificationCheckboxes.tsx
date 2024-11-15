// NotificationCheckboxes.tsx
import React from "react";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";

interface NotificationCheckboxesProps {
  labels: string[];
}

const NotificationCheckboxes: React.FC<NotificationCheckboxesProps> = ({
  labels,
}) => (
  <FormGroup>
    {labels.map((label) => (
      <FormControlLabel
        sx={{ height: 25 }}
        key={label}
        control={<Checkbox size="small" />}
        label={<Typography variant="body2" color="#ABAFB1">{label}</Typography>}
      />
    ))}
  </FormGroup>
);

export default NotificationCheckboxes;
