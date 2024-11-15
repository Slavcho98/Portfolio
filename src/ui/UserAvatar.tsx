import { Avatar, SxProps, Theme } from "@mui/material";
import { useUser } from "../authentication/useUser";

type AvatarProps = {
  sx?: SxProps<Theme>;
};

function UserAvatar({ sx }: AvatarProps) {
  const { user } = useUser();

  const avatar: string | undefined = user?.user_metadata?.avatar || undefined;

  return (
    <Avatar
      src={avatar || "/img/update_avatar.png"}
      sx={{
        width: 50,
        height: 50,
        border: "2px solid #E87B22",
        ...sx,
      }}
    />
  );
}

export default UserAvatar;
