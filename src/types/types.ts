import { ReactNode } from "react";

export interface CityProps {
  cityName: string;
  country: string;
  emoji: string;
  date: string;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: string;
}

export interface NewCiyProps {
  cityName: string;
  countryName: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: string | null;
    lng: string | null;
  };
}

export type ChildrenProps = {
  children: ReactNode;
};
