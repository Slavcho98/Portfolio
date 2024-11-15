import React, { forwardRef } from "react";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useLogin } from "../../authentication/useLogin";
import Spinner from "../../ui/Spinner";
import Logo from "../../ui/Logo";
import CustomButton from "../../ui/CustomButton";
import { useUserContext } from "../../context/UserContext";
import { UserMetadata } from "../../types/type";

type LoginFormInputs = {
  email: string;
  password: string;
};

const LoginForm = forwardRef<HTMLDivElement>((props, ref) => {
  const { setUser } = useUserContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();

  const [showPassword, setShowPassword] = React.useState(false);
  const { login, isPending } = useLogin();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    const { email, password } = data;
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSuccess: (response) => {
          const userMetadata = response.data.user.user_metadata;

          const userData: UserMetadata = {
            id: userMetadata.id || "",
            phone: userMetadata.phone || "",
            avatar: userMetadata.avatar || "",
            email: userMetadata.email,
            name: userMetadata.name || "",
            surname: userMetadata.surname || "",
          };

          setUser(userData);
        },
        onSettled: () => {
          reset();
        },
      }
    );
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        height: "70vh",
        bgcolor: "background.paper",
        borderRadius: "20px",
        boxShadow: 24,
        border: "none",
        outline: "none",
        pl: 5,
      }}
      gap={5}
      ref={ref}
      {...props}
    >
      <Box sx={{ width: 1 / 2 }}>
        <Logo sx={{ width: 50, mx: "auto" }} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography sx={{ fontSize: "1.2em", pb: 3 }}>Најави се</Typography>

          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: "Ве молиме внесете Е-маил адреса",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Е-маил"
                variant="outlined"
                type="email"
                color="warning"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isPending}
                sx={{
                  mb: 3,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E87B22 !important",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E87B22 !important",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E87B22 !important",
                  },
                }}
              />
            )}
          />

          <FormControl fullWidth variant="filled">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Ве молиме внесете лозинка",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Лозинка"
                  color="warning"
                  type={showPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  disabled={isPending}
                  sx={{
                    mb: 3,
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E87B22 !important",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E87B22 !important",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#E87B22 !important",
                    },
                  }}
                />
              )}
            />
          </FormControl>

          <CustomButton
            disableHover={true}
            style={{
              position: "static",
              minWidth: "100%",
              borderRadius: "none",
              display: "flex",
              justifyContent: "center",
            }}
            type="submit"
          >
            {!isPending ? (
              "Најави се"
            ) : (
              <Spinner progressSx={{ color: "#fff" }} size={20} />
            )}
          </CustomButton>
        </form>
      </Box>

      <Box
        sx={{
          width: 1 / 2,
          height: "100%",
          borderRadius: "0 20px 20px 0",
          backgroundImage: "url('/img/Banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>
    </Stack>
  );
});

export default LoginForm;
