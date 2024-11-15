import { Link } from "react-router-dom";
import { CityProps } from "../types/types";
import Button from "./Button";
import styles from "./CityItem.module.css";
import useCities from "../hooks/useCities";
import { FormEvent } from "react";
type SingleCityProps = {
  city: CityProps;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }: SingleCityProps) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleClick(e: FormEvent) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <Button el="button" className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </Button>
      </Link>
    </li>
  );
}

export default CityItem;
