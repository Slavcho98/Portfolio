import { Box, IconButton, Stack, Typography } from "@mui/material";
import { BiLike } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";

import SocialMedia from "../../ui/SocialMedia";

export default function BlogContentLeft() {
  return (
    <Stack spacing={5}>
      <Box>
        <Typography variant="h4">
          Како до најдобар избор при <br />
          процесот на регрутација
        </Typography>
        <Box>
          <Typography variant="caption">
            Процесот на регрутација е клучен за успехот на секоја организација.
            Селекцијата на вистинските кандидати може значително да влијае на
            продуктивноста, културата и развојот на компанијата. Следните чекори
            и совети ќе ви помогнат да направите најдобар избор при
            регрутацијата.
          </Typography>
          <br />
          <Typography variant="caption">
            Совет: Секогаш користете ист сет на прашања за сите кандидати за да
            осигурате фер и доследен процес.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">Прецизно дефинирање на позицијата</Typography>
        <Box>
          <Typography variant="caption">
            Процесот на регрутација е клучен за успехот на секоја организација.
            Селекцијата на вистинските кандидати може значително да влијае на
            продуктивноста, културата и развојот на компанијата. Следните чекори
            и совети ќе ви помогнат да направите најдобар избор при
            регрутацијата.
          </Typography>
          <br />
          <Typography variant="caption">
            Совет: Секогаш користете ист сет на прашања за сите кандидати за да
            осигурате фер и доследен процес.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">
          Развивање на ефикасна стратегија за <br /> привлекување кандидати
        </Typography>
        <Box>
          <Typography variant="caption">
            Откако ќе го дефинирате профилот на идеалниот кандидат, потребно е
            да развиете стратегија за привлекување на такви кандидати. Ова може
            да вклучува користење на различни канали за регрутација, како што се
            огласни табли, социјални медиуми и професионални мрежи.
          </Typography>
          <br />
          <Typography variant="caption">
            Совет: Користете различни платформи за регрутација за да допрете до
            поширока и разновидна база на кандидати.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">
          Спроведување на структуриран процес на интервју
        </Typography>
        <Box>
          <Typography variant="caption">
            Структурираниот процес на интервју е од суштинско значење за
            објективна и фер селекција. Ова вклучува подготовка на прашања кои
            се релевантни за позицијата и кои ќе ви помогнат да ја процените
            способноста на кандидатите да ги исполнат барањата на работата.
          </Typography>
          <br />
          <Typography variant="caption">
            Совет: Секогаш користете ист сет на прашања за сите кандидати за да
            осигурате фер и доследен процес.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">
          Вклучување на релевантни тестови и проценки
        </Typography>
        <Box>
          <Typography variant="caption">
            Тестовите и проценките можат да бидат од голема помош при проценката
            на вештините и компетенциите на кандидатите. Ова може да вклучува
            тестови за технички вештини, психометриски тестови или проценки на
            личноста.
          </Typography>
          <br />
          <Typography variant="caption">
            Совет: Одберете тестови кои се директно поврзани со клучните вештини
            потребни за позицијата.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">Донесување на информирана одлука</Typography>
        <Box>
          <Typography variant="caption">
            Последниот чекор е донесувањето на информирана одлука. Ова
            подразбира анализа на сите информации собрани за време на процесот
            на регрутација, вклучувајќи го интервјуто, резултатите од тестовите
            и препораките.
          </Typography>
          <br />
          <Typography variant="caption">
            Совет: Вклучете повеќе членови од тимот во процесот на донесување
            одлука за да добиете различни перспективи и да осигурате
            пообјективен избор.
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h4">Заклучок</Typography>
        <Box>
          <Typography variant="caption">
            Регрутацијата е комплексен процес кој бара внимателно планирање и
            имплементација. Преку прецизно дефинирање на позицијата, развивање
            на ефикасна стратегија за привлекување кандидати, спроведување на
            структуриран процес на интервју, вклучување на релевантни тестови и
            проценки и донесување на информирана одлука, можете да осигурате
            дека ќе го направите најдобриот избор за вашата организација.
          </Typography>
          <br />
        </Box>
      </Box>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ color: "#7F7F7F" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <BiLike />
          </IconButton>
          <Typography
            variant="button"
            sx={{ fontSize: "1.3em", color: "#21383E", fontWeight: "400" }}
          >
            335
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <FaRegHeart />
          </IconButton>
          <Typography
            variant="button"
            sx={{ fontSize: "1.3em", color: "#21383E", fontWeight: "400" }}
          >
            86
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton>
            <FaRegComment />
          </IconButton>
          <Typography
            variant="button"
            sx={{ fontSize: "1.3em", color: "#21383E", fontWeight: "400" }}
          >
            552
          </Typography>
        </Box>
      </Stack>
      <SocialMedia
        sx={{
          position: "static",
          width: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: "50vw",
          backgroundColor: "#E87B22",
          mb: 5,
          pl: 3,
        }}
      >
        Ти се допаѓа овој блог? Сподели го!
      </SocialMedia>
    </Stack>
  );
}
