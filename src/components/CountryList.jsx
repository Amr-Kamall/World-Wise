import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const { isLoading: loading, cities } = useCities();

  if (loading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a city on the map" />
    );
  //   const countryCountry = countries.map((country) => country.country);
  //   const sorted = new Set(countries);

  // Create a temporary object to store unique countries
  const temp = {};

  // Use filter to filter out repeated country properties
  const uniqueCountries = cities.filter((country) => {
    // If the country is not in the temporary object, add it and return true (keep this country)
    if (!temp[country.countryName]) {
      temp[country.countryName] = true;
      return true;
    }
    // If the country is already in the temporary object, return false (remove this country)
    return false;
  });

  console.log(uniqueCountries);

  return (
    <ul className={styles.countryList}>
      {uniqueCountries.map((country) => (
        <CountryItem countryObj={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
