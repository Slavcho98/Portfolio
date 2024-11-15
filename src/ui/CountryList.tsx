import useCities from "../hooks/useCities";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, isLoading } = useCities();

  const countries = cities.reduce<{ country: string; emoji: string }[]>(
    (arr, city) => {
      if (!arr.some((el) => el.country === city.country)) {
        return [...arr, { country: city.country, emoji: city.emoji }];
      }
      return arr;
    },
    []
  );

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.countryList}>
      {countries.map((country, index) => (
        <CountryItem key={`${country.country}-${index}`} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
