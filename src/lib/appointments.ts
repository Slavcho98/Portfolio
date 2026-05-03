import { Barber, Service } from "@/types/booking";

const KEY = "nb_appointments_v1";

export type StoredAppointment = {
  id: string;
  barberId: string;
  barberName: string;
  serviceName: string;
  servicePrice: string;
  serviceDuration: string;
  date: string; // ISO
  time: string;
  customer: { firstName: string; lastName: string; phone: string; email: string };
  createdAt: string;
};

export const loadAppointments = (): StoredAppointment[] => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as StoredAppointment[]) : [];
  } catch {
    return [];
  }
};

export const saveAppointment = (input: {
  barber: Barber;
  service: Service;
  date: Date;
  time: string;
  customer: { firstName: string; lastName: string; phone: string; email: string };
}): StoredAppointment => {
  const appointment: StoredAppointment = {
    id: crypto.randomUUID(),
    barberId: input.barber.id,
    barberName: input.barber.name,
    serviceName: input.service.name,
    servicePrice: input.service.price,
    serviceDuration: input.service.duration,
    date: input.date.toISOString(),
    time: input.time,
    customer: input.customer,
    createdAt: new Date().toISOString(),
  };
  const all = loadAppointments();
  all.push(appointment);
  localStorage.setItem(KEY, JSON.stringify(all));
  return appointment;
};

export const deleteAppointment = (id: string) => {
  const all = loadAppointments().filter((a) => a.id !== id);
  localStorage.setItem(KEY, JSON.stringify(all));
};

export const ADMIN_PASSCODE = "1234";
const AUTH_KEY = "nb_admin_auth_v1";

export const isAdminAuthed = () => {
  try {
    return sessionStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
};

export const setAdminAuthed = (v: boolean) => {
  try {
    if (v) sessionStorage.setItem(AUTH_KEY, "1");
    else sessionStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore
  }
};
