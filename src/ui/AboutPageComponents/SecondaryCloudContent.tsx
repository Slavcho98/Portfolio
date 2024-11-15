import { Box, Typography } from "@mui/material"

function SecondaryCloudContent() {
    return (
         <Box
              sx={{
                backgroundColor: "#7F7F7F",
                width: 220,
                p: 2,
                lineHeight: 0,
                position: "absolute",
                borderRadius: " 20px 20px 20px  0",
                zIndex: "999",
                left: "30%",
                top: "30%",
                transform: "translate(-50%, 0)",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: ".7em", color: "#fff" }}
              >
                Сакаш да бидеш во тек со нас и најновите содржини што ги
                споделуваме?
              </Typography>
            </Box>
    )
}

export default SecondaryCloudContent
