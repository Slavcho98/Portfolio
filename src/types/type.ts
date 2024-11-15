import { ReactNode } from "react";

export type BlogCardsHookProps = {
  queryFn: () => Promise<EventItem[]>;
  queryKey: string;
};

export type BlogCardsComponentProps = {
  queryFn: () => Promise<EventItem[]>;
  queryKey: string;
  children: React.ReactNode;
};

export type EventItem = {
  id: number;
  image: string;
  title: string;
  subtitle: string;
};

export type SxProps = {
  sx?: SxProps;
};

export const textFieldStyles = {
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E87B22 !important",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E87B22 !important",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#E87B22 !important",
  },
  "& .MuiInputLabel-root": {
    color: "#E87B22",
  },
  "&.Mui-focused .MuiInputLabel-root": {
    color: "#E87B22",
  },
};

export interface NavLink {
  to: string;
  label: string;
  isSpecialItem?: boolean;
}

export interface NavItemProps {
  id?: string;
  label: string;
  to?: string;
  links?: NavLink[];
  hoveredId: string | null;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}

export interface Job {
  image: string;
  title: string;
}

export type Activities = {
  time: string;
  session: string;
  description_1?: string;
  description_2?: string;
  description_3?: string;
  name: string;
};

export type AgendaActivitesProps = {
  data: Activities;
};

export interface CountingNumberProps {
  number: number;
}

type Speaker = {
  name: string;
  position: string;
  image: string;
};

type BadgeStyle = {
  sx: object;
  reverse?: boolean;
};

export type SpecialGuestsProps = {
  data: Speaker;
  badgeStyle: BadgeStyle;
  eventSx?: object;
  sx?: object;
};

type Testimonial = {
  image: string;
  name: string;
  title: string;
  description: string;
};

export type TestimonialItemProps = {
  testimonial: Testimonial;
  index: number;
  currentIndex: number;
  totalCount: number;
  handleNext: () => void;
  handlePrev: () => void;
};

type EventsData = {
  id: number;
  title: string;
  subtitle: string;
  image: string;
};

export type EventSection = {
  queryFn: () => Promise<EventsData[]>;
  queryKey: string;
  label: string;
};
export interface SignupFormInputs {
  name: string;
  surname: string;
  email: string;
  password: string;
  phone: string;
  repeatPassword: string;
}
export interface SignupFormProps {
  email: string;
}

interface Option {
  value: string;
  label: string;
}

export interface CheckboxGroupProps {
  title: string;
  options: Option[];
}
export interface ConnectionsListItemProps {
  friend: {
    image: string;
    firstName: string;
  };
}

export interface UserMetadata {
  id: string;
  avatar: string;
  name: string;
  email: string;
  phone: string;
  surname: string;
}

export interface User {
  id: string;
  role?: string;
  email: string;
  phone: string;
  user_metadata?: UserMetadata;
}

export interface NavDrawerProps {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  container?: () => HTMLElement | null;
}

export interface EventTypes {
  id: number;
  events: string;
  title: string;
  duration: string;
  description: string;
  user_id: number | null;
  body: string | null;
}

export type ChildrenProps = {
  children: ReactNode;
};

export type CommentsProps = {
  created_at: string;
  description: string;
  id: string;
  userAvatar: string;
  userId: string;
  userLastname: string;
  userName: string;
};
