import { Box } from "@mui/material";

const MapEmbed = () => {
  return (
    <Box sx={{mt: 20, width: '85%', mx: "auto", height: '400px' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509313!2d144.95373531531727!3d-37.8162799797515!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0b6e45d1%3A0x5045675218cd1c0!2sMelbourne%20CBD%2C%20Victoria%2C%20Australia!5e0!3m2!1sen!2sus!4v1617179576601!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0 }}
 
        loading="lazy"
      />
    </Box>
  );
};

export default MapEmbed;
