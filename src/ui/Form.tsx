import { FormEvent, useEffect, useReducer } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useCities from "../hooks/useCities";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

interface initialStateProps {
  cityName: string;
  countryName: string;
  date: Date | null;
  notes: string;
  emoji: string;
  geocodingError: string;
  geocodingLoading: boolean;
}

const initialState: initialStateProps = {
  cityName: "",
  countryName: "",
  date: new Date(),
  notes: "",
  emoji: "",
  geocodingError: "",
  geocodingLoading: false,
};

type Action =
  | { type: "cityName"; payload: string }
  | { type: "countryName"; payload: string }
  | { type: "date"; payload: Date | null }
  | { type: "notes"; payload: string }
  | { type: "emoji"; payload: string }
  | { type: "geocodingLoading"; payload: boolean }
  | { type: "geocodingError"; payload: string };

function reducer(state: initialStateProps, action: Action): initialStateProps {
  switch (action.type) {
    case "cityName":
      return { ...state, cityName: action.payload };
    case "countryName":
      return { ...state, countryName: action.payload };
    case "date":
      return { ...state, date: action.payload };
    case "notes":
      return { ...state, notes: action.payload };
    case "emoji":
      return { ...state, emoji: action.payload };
    case "geocodingLoading":
      return { ...state, geocodingLoading: action.payload };
    case "geocodingError":
      return { ...state, geocodingError: action.payload };
    default:
      return state;
  }
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [
    {
      cityName,
      countryName,
      date,
      notes,
      emoji,
      geocodingLoading,
      geocodingError,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();
  // const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);

  // const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const dateValue = new Date(e.target.value);
  //   if (!isNaN(dateValue.getTime())) {
  //     dispatch({ type: "date", payload: dateValue });
  //   } else {
  //     console.error("Invalid date format");
  //   }
  // };

  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          dispatch({ type: "geocodingLoading", payload: true });
          dispatch({ type: "geocodingError", payload: "" });
          const res = await fetch(
            `${BASE_URL}?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          console.log(data);

          if (!data.countryCode)
            throw new Error("That doesn't seem to be a city");
          dispatch({
            type: "cityName",
            payload: data.city || data.locality || "",
          });
          dispatch({ type: "countryName", payload: data.countryName });
          dispatch({
            type: "emoji",
            payload: convertToEmoji(data.countryCode),
          });
        } catch (err) {
          if (err instanceof Error) {
            dispatch({ type: "geocodingError", payload: err.message });
          }
        } finally {
          dispatch({ type: "geocodingLoading", payload: false });
        }
      }

      fetchCityData();
    },
    [lat, lng]
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!cityName || !date) return;

    const newCity = {
      cityName,
      countryName,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    await createCity(newCity);
    navigate("/app/cities");
  }

  if (geocodingLoading) return <Spinner />;

  if (!lat && !lng) return <Message message="Start by clicking on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) =>
            dispatch({ type: "cityName", payload: e.target.value })
          }
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          type="date"
          onChange={handleDateChange}
          value={date.toISOString().split("T")[0]}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => dispatch({ type: "date", payload: date })}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => dispatch({ type: "notes", payload: e.target.value })}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button el="button">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
