import { Box, Typography } from "@mui/material";
import EventCard from "../EventCard";
import Badge from "../Badge";

type DynamicContentProps = {
  leftCard: {
    image: string;
    title: string;
    caption: string;
  };
  rightCard: {
    image: string;
  };
  badge: {
    title: string;
    subtitle: string;
  };
  children: React.ReactNode; 
};

const DynamicContent = ({
  leftCard,
  rightCard,
  badge,
  children,
}: DynamicContentProps) => {
  return (
    <Box sx={{ display: "flex", minHeight: "80dvh" }}>
      <Box sx={{ width: 1 / 2, position: "relative" }}>
        <EventCard
          sx={{
            borderRadius: "10vw 10vw 0 0",
            width: 260,
            height: "50dvh",
            pb: "1rem",
            backgroundImage: `url(${leftCard.image})`,
          }}
        />
        <Typography variant="h4" sx={{ fontSize: "1.8em", mb: "1rem" }}>
          {leftCard.title}
        </Typography>
        <Typography variant="caption">{leftCard.caption}</Typography>
        
        <Box
          sx={{
            backgroundColor: "#7F7F7F",
            width: 220,
            p: 2,
            lineHeight: 0,
            position: "absolute",
            borderRadius: "20px 20px 20px 0",
            zIndex: "999",
            right: "0",
            top: "20%",
            transform: "translate(-50%, 0)",
          }}
        >
          <Typography variant="caption" sx={{ fontSize: ".7em", color: "#fff" }}>
            Сакаш да бидеш во тек со нас и најновите содржини што ги споделуваме?
          </Typography>
        </Box>
      </Box>
      
      <Box
        sx={{
          width: 1 / 2,
          alignSelf: "flex-end",
          position: "relative",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
        }}
      >
        <EventCard
          borderRadius="0 0 10vw 10vw"
          mb="0"
          sx={{
            width: "230px",
            height: "40dvh",
            backgroundImage: `url(${rightCard.image})`,
          }}
        />
        <Badge
          title={badge.title}
          subtitle={badge.subtitle}
          sx={{
            right: "25%",
            top: "40%",
            transform: "translate(-25%, 0)",
          }}
        />
        {children}
      </Box>
    </Box>
  );
};

export default DynamicContent;
