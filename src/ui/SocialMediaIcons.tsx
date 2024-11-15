import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

type SocialMediaIconsProps = {
  color?: string;
};

const SocialMediaIcons = ({ color = "#0F294A" }: SocialMediaIconsProps) => {
  const socialMediaLinks = [
    {
      icon: FaLinkedin,
      url: "https://www.linkedin.com/company/macedonian-hr-association/",
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/mhramk/",
    },
    {
      icon: FaFacebookSquare,
      url: "https://www.facebook.com/mhra.mk/",
    },
    {
      icon: FaYoutube,
      url: "https://www.youtube.com",
    },
  ];

  return (
    <Box sx={{ alignSelf: "flex-end" }}>
      {socialMediaLinks.map((social, index) => (
        <Link
          key={index}
          to={social.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton sx={{ color }}>
            <social.icon />
          </IconButton>
        </Link>
      ))}
    </Box>
  );
};

export default SocialMediaIcons;
