import { createContext, useReducer, useEffect } from "react";
import { ChildrenProps, CityProps, NewCiyProps } from "../types/types";

interface CitiesContextProps {
  cities: CityProps[];
  isLoading: boolean;
  currentCity: CityProps | null;
  getCity: (id: string) => Promise<void>;
  createCity: (newCity: NewCiyProps) => Promise<void>;
  deleteCity: (id: string) => void;
}

const CitiesContext = createContext<CitiesContextProps | undefined>(undefined);

type initialStateProps = {
  cities: CityProps[];
  isLoading: boolean;
  currentCity: CityProps | null;
  error: string;
};

const initialState: initialStateProps = {
  cities: [],
  isLoading: false,
  currentCity: null,
  error: "",
};

type Action =
  | { type: "cities/loaded"; payload: CityProps[] }
  | { type: "cities/created"; payload: CityProps }
  | { type: "cities/deleted"; payload: string }
  | { type: "isLoading" }
  | { type: "currentCity"; payload: CityProps }
  | { type: "rejected"; payload: string };

function reducer(state: initialStateProps, action: Action): initialStateProps {
  switch (action.type) {
    case "isLoading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: null,
      };
    case "currentCity":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new Error("There was an error");
  }
}

function CitiesProvider({ children }: ChildrenProps) {
  const URL = "http://localhost:3000";

  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "isLoading" });

      try {
        const res = await fetch(`${URL}/cities`);
        if (!res.ok) {
          throw new Error("Failed to fetch cities");
        }
        const data: CityProps[] = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload:
            "There was an error loading data: " +
            (error instanceof Error ? error.message : "Unknown error"),
        });
      }
    }
    fetchCities();
  }, []);

  async function getCity(id: string) {
    if (id === currentCity?.id) return;

    dispatch({ type: "isLoading" });
    try {
      const res = await fetch(`${URL}/cities/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch city");
      }
      const data: CityProps = await res.json();
      dispatch({ type: "currentCity", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload:
          "There was an error loading data: " +
          (error instanceof Error ? error.message : "Unknown error"),
      });
    }
  }

  async function createCity(newCity: NewCiyProps) {
    dispatch({ type: "isLoading" });
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch city");
      }
      const data: CityProps = await res.json();

      dispatch({ type: "cities/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload:
          "There was an error creating the city: " +
          (error instanceof Error ? error.message : "Unknown error"),
      });
    }
  }
  async function deleteCity(id: string) {
    dispatch({ type: "isLoading" });
    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      dispatch({
        type: "cities/deleted",
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload:
          "There was an error deleting the city: " +
          (error instanceof Error ? error.message : "Unknown error"),
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider, CitiesContext };
