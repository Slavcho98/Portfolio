import { Box, Stack, Typography } from "@mui/material";
import { CiCalendar } from "react-icons/ci";
import { RiUserLine } from "react-icons/ri";
import { MdOutlineCoffee } from "react-icons/md";
import { RiBookLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { CountingNumberProps } from "../../types/type";

const CountingNumber: React.FC<CountingNumberProps> = ({ number }) => {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      const duration = 2;
      const stepTime = (duration * 1000) / number;

      const interval = setInterval(() => {
        setCount((prev) => {
          if (prev < number) return prev + 1;
          clearInterval(interval);
          return number;
        });
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [inView, number]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {count}
    </motion.div>
  );
};

export default function Facts() {
  const facts = [
    {
      icon: <CiCalendar style={{ fontSize: "2em", color: "#E87B22" }} />,
      number: 2,
      text: "Дена",
    },
    {
      icon: <RiUserLine style={{ fontSize: "2em", color: "#E87B22" }} />,
      number: 9,
      text: "Неверојатни Спикери",
    },
    {
      icon: <MdOutlineCoffee style={{ fontSize: "2em", color: "#E87B22" }} />,
      number: 6,
      text: "Ресторани",
    },
    {
      icon: <RiBookLine style={{ fontSize: "2em", color: "#E87B22" }} />,
      number: 2,
      text: "Едукативни книги",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        p: 4,
        boxShadow: "0px 16px 80px 0px #3333331F",
        width: "70%",
        borderRadius: "50vw",
      }}
    >
      <Stack direction="row" justifyContent="space-around">
        {facts.map((fact, index) => (
          <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
            <Box>{fact.icon}</Box>
            <Box sx={{ pl: 1 }}>
              <Box>
                <CountingNumber number={fact.number} />
              </Box>
              <Typography variant="caption">{fact.text}</Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
