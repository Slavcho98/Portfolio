import { IconButton } from "@mui/material";
import { MdOutlineLogin } from "react-icons/md";
import { useLogout } from "./useLogout";
import Spinner from "../ui/Spinner";
import { Box } from "@mui/material";

function Logout() {
  const { logout, isPending } = useLogout();

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <IconButton
        disabled={isPending}
        onClick={() => logout()}
        sx={{ minWidth: 40, minHeight: 40 }} 
      >
        {!isPending ? (
          <MdOutlineLogin color="#E87B22" size={24} /> 
        ) : (
          <Spinner size={20} />
        )}
      </IconButton>
    </Box>
  );
}

export default Logout;
