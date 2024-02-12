import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useEffect } from "react";
import { useCities } from "../contexts/CitiesContext";
import Spinner from "./Spinner";
import ButtonBack from "./ButtonBack";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

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
    return emoji;
  }

  return null; // Return null if country code extraction fails
}

function City() {
  const { curretnCity, isLoading, getCity } = useCities();
  // TEMP DATA

  console.log(curretnCity);
  const { id } = useParams();

  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );

  const { cityName, date, emoji, notes } = curretnCity;
  console.log(emoji);
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        {emoji && (
          <h3>
            <span>{flagemojiToPNG(urlToEmoji(emoji.props.src))}</span>{" "}
            {cityName}
          </h3>
        )}
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
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
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
