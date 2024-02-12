import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) => {
  if (!date) return ""; // Handle undefined or null dates
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return ""; // Handle invalid dates
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    //   weekday: "long",
  }).format(parsedDate);
};

const flagemojiToPNG = (flag) => {
  var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
    .map((char) => String.fromCharCode(char - 127397).toLowerCase())
    .join("");
  return (
    <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
  );
};

function urlToEmoji(url) {
  // Extract the country code from the URL
  const countryCode = url.match(/\/([a-z]{2})\.png$/i)?.[1]?.toUpperCase();

  // Convert the country code to emoji
  if (countryCode) {
    const emoji = countryCode.replace(/./g, (char) =>
      String.fromCodePoint(char.charCodeAt(0) + 127397)
    );
    return flagemojiToPNG(emoji);
  }

  return null; // Return null if country code extraction fails
}
function CityItem({ cityObj }) {
  const { cityName, emoji, date, position, id } = cityObj;
  const { deleteCity } = useCities();

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem}`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{urlToEmoji(emoji.props.src)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
