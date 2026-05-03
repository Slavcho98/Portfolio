import barber1 from "@/assets/barber-1.jpg";
import barber2 from "@/assets/barber-2.jpg";
import { Barber, Service } from "@/types/booking";

export const barbers: Barber[] = [
  {
    id: "marco",
    name: "Marco Vidal",
    title: "Master Barber",
    image: barber1,
    specialty: "Classic cuts & beard sculpting",
  },
  {
    id: "leon",
    name: "Leon Hart",
    title: "Senior Stylist",
    image: barber2,
    specialty: "Modern fades & precision styling",
  },
];

export const services: Service[] = [
  {
    id: "haircut-wash",
    name: "Haircut + Wash",
    duration: "45 min",
    price: "$35",
    description: "Precision cut with a refreshing scalp wash and finish.",
  },
  {
    id: "haircut-beard",
    name: "Haircut + Beard",
    duration: "60 min",
    price: "$48",
    description: "Sharp cut paired with a hot-towel beard trim and shape-up.",
  },
  {
    id: "beard",
    name: "Beard Grooming",
    duration: "30 min",
    price: "$25",
    description: "Hot-towel beard trim, line-up, and conditioning oil.",
  },
  {
    id: "full-package",
    name: "Haircut + Beard + Wash",
    duration: "75 min",
    price: "$60",
    description: "The full ritual — cut, beard sculpt, wash and styling.",
  },
];
