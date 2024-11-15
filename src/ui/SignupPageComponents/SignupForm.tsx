import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import CustomButton from "../../ui/CustomButton";
import { useSignup } from "../../authentication/useSignup";
import { SignupFormInputs, SignupFormProps } from "../../types/type";



function SignupForm({ email }: SignupFormProps) {
  const { signup } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<SignupFormInputs>();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const textFieldStyles = {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E87B22 !important",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E87B22 !important",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#E87B22 !important",
    },
  };

  const onSubmit: SubmitHandler<SignupFormInputs> = ({
    name,
    surname,
    phone,
    email,
    password,
  }) => {
    signup(
      { name, surname, phone, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Stack
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60%",
        bgcolor: "background.paper",
        borderRadius: 20,
        boxShadow: 24,
        border: "none",
        outline: "none",
        px: 8,
        py: 5,
      }}
      gap={6}
    >
      <Typography variant="h4" textAlign="center">
        Регистрирај се
      </Typography>
      <form
        style={{ display: "flex", justifyContent: "center", gap: "2rem" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box width={1 / 2}>
          <Box sx={{ mb: 3 }}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{
                required: "Ве молиме внесете име",
                pattern: {
                  value: /^[\p{L}]+$/u,
                  message: "Името може да содржи само букви",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Име"
                  color="warning"
                  sx={textFieldStyles}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name.message : null}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Controller
              name="surname"
              control={control}
              defaultValue=""
              rules={{
                required: "Ве молиме внесете презиме",
                pattern: {
                  value: /^[\p{L}]+$/u,
                  message: "Презимето може да содржи само букви",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Презиме"
                  color="warning"
                  sx={textFieldStyles}
                  error={!!errors.surname}
                  helperText={errors.surname ? errors.surname.message : null}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: "Ве молиме внесете телефон",
                pattern: {
                  value: /^\+?[0-9]{7,14}$/,
                  message: "Телефонот мора да биде валиден (7-14 цифри)",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Телефон"
                  type="tel"
                  color="warning"
                  sx={textFieldStyles}
                  error={!!errors.phone}
                  helperText={errors.phone ? errors.phone.message : null}
                />
              )}
            />
          </Box>
        </Box>

        <Box width={1 / 2} sx={{ pb: 8 }}>
          <Box sx={{ mb: 3 }}>
            <Controller
              name="email"
              control={control}
              defaultValue={email}
              rules={{
                required: "Ве молиме внесете е-маил",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Ве молиме внесете валиден е-маил",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Е-маил"
                  type="email"
                  color="warning"
                  sx={textFieldStyles}
                  error={!!errors.email}
                  helperText={errors.email ? errors.email.message : null}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="filled">
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: "Ве молиме внесете лозинка",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Лозинката мора да содржи најмалку 8 карактери, една голема буква, една мала буква, број и специјален карактер",
                  },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Лозинка"
                    color="warning"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={
                      errors.password ? errors.password.message : null
                    }
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
                    sx={textFieldStyles}
                  />
                )}
              />
            </FormControl>
          </Box>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth variant="filled">
              <Controller
                name="repeatPassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Ве молиме внесете ја лозинката повторно ",
                  validate: (value) =>
                    value === getValues().password ||
                    "Лозинките не се совпаѓаат",
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Повтори Лозинка"
                    color="warning"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.repeatPassword}
                    helperText={
                      errors.repeatPassword
                        ? errors.repeatPassword.message
                        : null
                    }
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
                    sx={textFieldStyles}
                  />
                )}
              />
            </FormControl>
          </Box>
        </Box>

        <Box sx={{ mt: 4, textAlign: "center" }}>
          <CustomButton
            type="submit"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Регистрирај се
          </CustomButton>
        </Box>
      </form>
    </Stack>
  );
}

export default SignupForm;
