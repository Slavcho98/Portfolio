import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import CustomButton from "../../ui/CustomButton";
import CustomModal from "../Modal";
import GoogleIcon from "../GoogleIcon";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";

export default function Register() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<"signup" | "login" | null>(null);
  const [email, setEmail] = useState("");

  const handleOpen = (type: "signup" | "login") => {
    setModalType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setModalType(null);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleOpen("signup");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Error signing in with Google:", error.message);
        toast.error("Грешка при најава со Google");
      } else {
        toast.success("Редирекција кон Google за најава...");
      }
    } catch (error) {
      console.error("Unexpected error during Google Sign-In:", error);
      toast.error("Непредвидена грешка при најава");
    }
  };

  return (
    <Box sx={{ width: "85%", mx: "auto", py: 20 }}>
      <Box sx={{ width: 1 / 2, mx: "auto", textAlign: "center" }}>
        <Typography variant="h4">Најави се или Регистрирај се</Typography>
        <Box sx={{ py: 5 }}>
          <Button
            variant="outlined"
            fullWidth
            sx={{
              color: "#0F294A",
              fontWeight: 600,
              borderRadius: "50vw",
              textTransform: "none",
              p: 1.2,
              fontSize: "1rem",
              border: "1.5px solid #21383E33",
              display: "flex",
              gap: "1em",
            }}
            onClick={handleGoogleSignIn}
          >
            <GoogleIcon /> Продолжи со Google
          </Button>
          <Box sx={{ display: "flex", alignItems: "center", my: 4 }}>
            <Divider sx={{ flexGrow: 1 }} />
            <Typography variant="caption" sx={{ mx: 2, whiteSpace: "nowrap" }}>
              Или
            </Typography>
            <Divider sx={{ flexGrow: 1 }} />
          </Box>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              type="email"
              fullWidth
              label="Е-маил"
              id="fullWidth"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleKeyPress}
              sx={{
                mb: 2,
                "& .MuiInputBase-root": {
                  borderRadius: "50vw",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "1.5px solid #21383E33",
                  },
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E87B22",
                },
                "& label": {
                  ml: 2,
                },
                "& label.Mui-focused": {
                  color: "#E87B22",
                  ml: 2,
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#E87B22",
                },
                "& .MuiOutlinedInput-root.Mui-focused": {
                  "& legend ": {
                    ml: 2,
                  },
                },
                "&:hover fieldset": {
                  borderColor: "#000",
                },
              }}
            />
            <button
              onClick={() => handleOpen("signup")}
              style={{
                width: "100%",
                borderRadius: "50vw",
                border: "none",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "#E87B22",
                color: "#fff",
                padding: "1rem 0",
                fontSize: "1em",
              }}
            >
              Продолжи со свој е-маил
            </button>
            <Stack
              direction="row"
              pl={8}
              mt={1}
              alignItems="center"
              sx={{ pt: 2 }}
              position="relative"
            >
              <Typography>Веќе се имаш регистрирано?</Typography>
              <CustomButton
                onClick={() => handleOpen("login")}
                style={{
                  position: "absolute",
                  right: "30%",
                  transform: "translate(50%)",
                }}
              >
                Најави се
              </CustomButton>
            </Stack>
            <CustomModal open={open} onClose={handleClose}>
              {modalType === "signup" && <SignupForm email={email} />}
              {modalType === "login" && <LoginForm />}
            </CustomModal>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
