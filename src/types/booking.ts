export type Barber = {
  id: string;
  name: string;
  title: string;
  image: string;
  specialty: string;
};

export type Service = {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
};

export type BookingState = {
  barber?: Barber;
  service?: Service;
  date?: Date;
  time?: string;
  customer?: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
  };
};
