export const navData = [
  {
    id: "info-content",
    label: "Информативни содржини",
    links: [
      { to: "/about", label: "За нас" },
      { to: "/account", label: "Членство" },
      { to: "/coaching", label: "Огранок на коучинг" },
      { to: "/galleries", label: "Галерии" },
      { to: "/job-ads", label: "Огласи за работа" },
      { to: "/hr-awards", label: "HR награди" },
      { to: "/e-news", label: "Е-весник" },
      { to: "/archive", label: "Архива" },
      { to: "/faq", label: "FAQ", isSpecialItem: true },
    ],
  },
  {
    id: "edu-content",
    label: "Едукативни содржини",
    links: [
      { to: "/articles", label: "Статии" },
      { to: "/research", label: "Истражувања" },
      { to: "/interviews", label: "Интервјуа" },
      { to: "/trainings", label: "Обуки" },
      { to: "/academies", label: "Македонски академии" },
      { to: "/projects", label: "Проекти" },
      { to: "/experts", label: "Експерти" },
      { to: "/trends", label: "Трендови", isSpecialItem: true },
    ],
  },
  { to: "/conference", label: "Годишна конференција" },
  {
    to: "/events",
    id: "events",
    label: "Настани",
    links: [
      { to: "/event", label: "HR caffee" },
      { to: "/hr-weekend", label: "HR weekend" },
      { to: "/hr-webinar", label: "HR webinar" },
      { to: "/hr-conferences", label: "HR conferences", isSpecialItem: true },
    ],
  },
  { to: "/blogs", label: "Блог" },
];
