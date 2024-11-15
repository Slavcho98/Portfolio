import { Box, Button, Stack, SxProps, Theme } from "@mui/material";
import { useSearchParams } from "react-router-dom";

interface Option {
  value: string;
  label: string;
}

interface FilterProps {
  filterField: string;
  options: Option[];
  buttonStyles?: (isActive: boolean) => object;
  disableWhenActive?: boolean;
  buttonSx?: SxProps<Theme>;
  defaultValue?: string;
}

function Filter({
  filterField,
  options,
  buttonStyles,
  disableWhenActive = true,
  buttonSx,
  defaultValue = options[0].value,
}: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || defaultValue;

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  const defaultButtonStyles = (isActive: boolean) => ({
    borderRadius: "20px",
    px: "1rem",
    textTransform: "none",
    backgroundColor: isActive ? "#E87B22" : "#fff",
    color: isActive ? "#fff" : "#21383E",
    fontWeight: "400",
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    "&:hover": {
      backgroundColor: isActive ? "#E87B22" : "#f0f0f0",
      boxShadow: "none",
    },
    "&:focus": {
      backgroundColor: isActive ? "#E87B22" : "#fff",
    },
    "&:active": {
      color: isActive ? "#E87B22" : "#f0f0f0",
      backgroundColor: isActive ? "#E87B22" : "#fff",
      boxShadow: "none",
    },
    "&.Mui-disabled": {
      backgroundColor: "#E87B22",
      color: "#fff",
      boxShadow: "none",
    },
  });

  return (
    <Stack direction="row" gap={3}>
      {options.map((option) => {
        const isActive = currentFilter === option.value;

        return (
          <Box key={option.value}>
            <Button
              disabled={disableWhenActive ? isActive : false}
              onClick={() => handleClick(option.value)}
              size="medium"
              sx={{
                ...buttonSx,
                ...(buttonStyles
                  ? buttonStyles(isActive)
                  : defaultButtonStyles(isActive)),
              }}
            >
              {option.label}
            </Button>
          </Box>
        );
      })}
    </Stack>
  );
}

export default Filter;
