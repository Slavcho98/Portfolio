import React, { useState, useEffect } from "react";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import { FaEdit } from "react-icons/fa";
import { AiOutlinePaperClip } from "react-icons/ai";
import { LuUser, LuUserPlus } from "react-icons/lu";
import { MdOutlineMail, MdOutlineSettings } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";
import SettingsModal from "./SettingsModal";
import { useUser } from "../../authentication/useUser";
import { useUpdateUser } from "../../authentication/useUpdateUser";
import EventCard from "../EventCard";

function ProfileInfo() {
  const { user } = useUser();
  const userInfo = user?.user_metadata;
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(
    userInfo?.avatar || ""
  );
  const [file, setFile] = useState<File | null>(null);
  const { updateUser } = useUpdateUser();
  const [modalOpen, setModalOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  useEffect(() => {
    if (file) {
      updateUser({ avatar: file });
    }
  }, [file, updateUser]);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const surnameInitial = userInfo?.surname ? userInfo?.surname.slice(0, 1) : "";
  const fullName = `${userInfo?.name || ""} ${surnameInitial || ""}`.trim();

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        boxShadow: "0px 9px 80px 0px #2F41581F",
        borderRadius: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pb: 5,
        }}
      >
        <Box sx={{ ml: 20 }}>
          <IconButton sx={{ width: 40, height: 40 }}>
            <Badge badgeContent={4} color="primary">
              <IoChatbubblesOutline color="action" />
            </Badge>
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            mb: 2,
            "&:hover .overlay-box": {
              opacity: 1,
            },
          }}
        >
          <Box
            className="overlay-box"
            sx={{
              position: "absolute",
              zIndex: 9990,
              bottom: 0,
              padding: 1,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              color: "#fff",
              opacity: 0,
              transition: "opacity 0.3s ease",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              width: 1,
            }}
          >
            <IconButton
              sx={{ m: "0 0 0 auto", color: "#fff" }}
              component="label"
            >
              <FaEdit size={20} />
              <input type="file" hidden onChange={handleFileChange} />
            </IconButton>
          </Box>
          <EventCard
            sx={{
              position: "relative",
              minWidth: 180,
              minHeight: "30vh",
              borderRadius: "50vw 50vw 0 0",
              border: "3px solid #D2B830",
              backgroundImage: `url(${avatar || "./img/update_avatar.png"})`,
              mb: 0,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </Box>

        <Typography variant="h6">{fullName}.</Typography>
        <Typography variant="caption">Битола</Typography>
      </Box>

      <Box sx={{ pl: 5, width: "70%" }}>
        <Box sx={{ borderTop: 1, py: 2 }}>
          <ProfileInfoItem icon={<LuUser />} text="HR регрутер" />
          <ProfileInfoItem icon={<AiOutlinePaperClip />} text="CV" />
        </Box>

        <Box sx={{ py: 2, borderTop: 1 }}>
          <ProfileInfoItem icon={<LuUserPlus />} text={`+${userInfo?.phone}`} />
          <ProfileInfoItem
            icon={<MdOutlineMail />}
            text={userInfo?.email || ""}
          />
          <ProfileInfoItem
            icon={<MdOutlineSettings />}
            text="Поставки"
            onClick={handleOpenModal}
          />
        </Box>
      </Box>

      <SettingsModal open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
}

const ProfileInfoItem = ({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}) => (
  <Stack direction="row" spacing={1} alignItems="center">
    <IconButton onClick={onClick}>{icon}</IconButton>
    <Typography variant="body2">{text}</Typography>
  </Stack>
);

export default ProfileInfo;
