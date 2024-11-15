import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import EventCard from "./EventCard";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import { IoCloseSharp } from "react-icons/io5";
import CustomModal from "./Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  px: 4,
  py: 5,
  borderRadius: "20px",
  outline: "none",
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => setOpen(false);

  return (
    <Box>
      <CustomModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            onClick={handleClose}
            aria-label="close"
            sx={{ position: "absolute", top: 10, right: 10 }}
          >
            <IoCloseSharp />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column-reverse", md: "row" },
              justifyContent: "center",
            }}
          >
            <EventCard showOverlay sx={{ mb: 0, }}>
              <img
                src="/img/ion_ticket-outline.png"
                style={{ width: 200, objectFit: "contain" }}
              />
            </EventCard>
            <Stack sx={{ paddingLeft: 5 }} justifyContent={"space-between"}>
              <Box>
                <Typography variant="body1">Уште само 5 дена до</Typography>
                <Typography
                  color="#0F294A"
                  fontWeight={600}
                  variant="h4"
                  id="modal-modal-description"
                  sx={{fontSize: {xs: "1rem", md: "2rem"}}}
                >
                  HR CAFFE на тема: вештини за комуникација
                </Typography>
              </Box>

              <Typography variant="caption">
                25.07.2024 Лабораториум, Скопје
              </Typography>
            </Stack>
          </Box>
        </Box>
      </CustomModal>
    </Box>
  );
}
