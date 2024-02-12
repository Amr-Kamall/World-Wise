// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate, useSearchParams } from "react-router-dom";
import ButtonBack from "./ButtonBack";
import Message from "./Message";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const flagemojiToPNG = (flag) => {
  // Check if flag is a string
  if (typeof flag !== "string") {
    // If flag is not a string, return null or handle the error appropriately
    return null;
  }

  // Convert flag to lowercase
  const countryFlag = flag.toLowerCase();

  // Return the flag image component
  return (
    <img src={`https://flagcdn.com/24x18/${countryFlag}.png`} alt="flag" />
  );
};

function Form() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [cityName, setCityName] = useState("");
  const [countryName, setCountryName] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();
  const [emoji, setEmoji] = useState("");
  const { createCity } = useCities();

  const [isLoadingGeoLocation, setIsLoadingGeoLocation] = useState(false);
  const [geoCodingError, setGeoCodingError] = useState("");

  useEffect(
    function () {
      async function getData() {
        try {
          setIsLoadingGeoLocation(true);
          setGeoCodingError("");
          const res = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
          );
          const data = await res.json();
          if (!data.countryCode) {
            throw new Error(
              "that doesn't seem to be a city , Click somewhere else 😔"
            );
          }
          setCityName(data.city || data.locality || "");
          setCountryName(data.countryName || "");
          setEmoji(flagemojiToPNG(data.countryCode));
          console.log(data);
        } catch (error) {
          setGeoCodingError(error.message);
        } finally {
          setIsLoadingGeoLocation(false);
        }
      }
      getData();
    },
    [lat, lng]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      countryName,
      notes,
      emoji,
      position: { lat, lng },
      date,
    };
    console.log(newCity);
    createCity(newCity);
    navigate("/app/cities");
  }

  if (geoCodingError) return <Message message={geoCodingError} />;
  if (isLoadingGeoLocation) return <Spinner />;
  if (!lat && !lng)
    return <Message message="start by clicking somewhere on the map" />;
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
