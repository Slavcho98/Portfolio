import { Box, Typography } from "@mui/material";
import UserBadge from "../UserBadge";

import { useRecommendations } from "../../hooks/useRecommendations";
import ErrorDisplay from "../ErrorDisplay";
import Spinner from "../Spinner";

function Recommendations() {
  const { isPending, error, recommendations } = useRecommendations();

  if (isPending) return <Spinner />;

  return (
    <Box>
      <Typography variant="h5" fontWeight={600}>
        Препораки
      </Typography>

      <ErrorDisplay error={error} />
      <Box sx={{ pt: 2 }}>
        {recommendations?.map((item) => (
          <Box key={item.id} sx={{ mb: 2 }}>
            <UserBadge
              sx={{
                width: 80,
                height: 70,
                backgroundImage: `url('${item.image}')`,
                backgroundPosition: "top",
              }}
            >
              <Typography variant="subtitle1" sx={{ display: "block" }}>
                {item.firstName} {item.lastName}
              </Typography>
            </UserBadge>
            <Typography sx={{ pt: 2 }}>{item.description}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Recommendations;
