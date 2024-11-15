import styles from "./CountryItem.module.css";

interface CountryItem {
  country: string;
  emoji: string;
}

type SingleCountryProps = {
  country: CountryItem;
};

function CountryItem({ country }: SingleCountryProps) {
  return (
    
    <li className={styles.countryItem}>
      <span>{country.emoji}</span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
