import { Box, Typography } from "@mui/material";
import CustomButton from "../../ui/CustomButton";

export default function Packages() {
  return (
    <Box>
      <img
        src="/img/vertical_bg.png"
        style={{
          position: "absolute",
          right: "8rem",
          width: 300,
          objectFit: "cover",
          height: "100%",
          zIndex: -1,
        }}
      />
      <img
        src="/img/vertical_bg.png"
        style={{
          position: "absolute",
          left: "0",
          width: 300,
          objectFit: "cover",
          height: "100%",
          zIndex: -1,
        }}
      />

      <Box sx={{ width: "85%", mx: "auto" }}>
        <Typography variant="h4" textAlign="center" color="#E87B22">
          Пакети за поединци и корпорации
        </Typography>

        <Box sx={{ width: "70%", mx: "auto", py: 10 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box
              sx={{
                width: "40%",
                height: "80vh",
                backgroundColor: "#fff",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                borderRadius: "50vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-top",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box sx={{ pt: 10 }}>
                <Typography variant="h4" sx={{ color: "#E87B22" }}>
                  Поединци
                </Typography>
                <Typography variant="h4" fontWeight={600} textAlign="center">
                  1500ден
                </Typography>
                <Box sx={{ width: "80%", mx: "auto", pt: 5 }}>
                  <Typography component="li" variant="body2">
                    1 седиште
                  </Typography>
                  <Typography component="li" variant="body2">
                    Паузи за ручек
                  </Typography>

                  <Typography component="li" variant="body2">
                    WiFi
                  </Typography>
                </Box>
                <CustomButton
                  style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                  }}
                >
                  Купи карта
                </CustomButton>
              </Box>
            </Box>
            <Box
              sx={{
                width: "40%",
                height: "80vh",
                backgroundColor: "#fff",
                boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                borderRadius: "50vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-top",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box sx={{ pt: 10 }}>
                <Typography variant="h4" sx={{ color: "#E87B22" }}>
                  Корпорации
                </Typography>
                <Typography variant="h4" fontWeight={600} textAlign="center">
                  20 000ден
                </Typography>
                <Box sx={{ width: "80%", mx: "auto", pt: 5 }}>
                  <Typography component="li" variant="body2">
                    20 седишта
                  </Typography>
                  <Typography component="li" variant="body2">
                    Паузи за чај и кафе
                  </Typography>
                  <Typography component="li" variant="body2">
                    Пауза за ручек
                  </Typography>
                  <Typography component="li" variant="body2">
                    WiFi
                  </Typography>
                </Box>
                <CustomButton
                  style={{
                    position: "absolute",
                    bottom: "15%",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                  }}
                >
                  Купи карта
                </CustomButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <CustomButton
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
            minWidth: "180px",
          }}
        >
          Предложи на пријател
        </CustomButton>
      </Box>
    </Box>
  );
}
