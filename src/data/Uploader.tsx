import { useState } from "react";
import supabase from "../services/supabase";
import { FaPlus } from "react-icons/fa";

import { sampleEventSchedule } from "./events-data";
import { IconButton } from "@mui/material";

async function createEventSchedule() {
  const { error } = await supabase
    .from("eventsSchedule")
    .insert([sampleEventSchedule]);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);

  async function uploadEvents() {
    setIsLoading(true);
    await createEventSchedule();
    setIsLoading(false);
  }

  return (
    <IconButton
      onClick={uploadEvents}
      disabled={isLoading}
      sx={{
        width: 40,
        height: 40,
        bgcolor:'#E87B22',
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        '&:hover': { 
            bgcolor: '#E87B22',
          },
      }}
    >
      <FaPlus fontSize={20} color="#fff"/>
    </IconButton>
  );
}

export default Uploader;
