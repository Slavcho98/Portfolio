import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import useCities from "../hooks/useCities";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date: string | null | undefined) => {
  if (!date) return "Invalid date";

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return "Invalid date";

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(parsedDate);
};

function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();

  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat"); //the parameter needs to match the variable inside url
  // const lng = searchParams.get("lng");

  useEffect(
    function () {
      if (id) {
        getCity(id);
      }
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity || {};
  if (isLoading) {
    <Spinner />;
  }

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date ?? "no date recieved")}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      <div>
        <BackButton/>
      </div>
    </div>
  );
}

export default City;
