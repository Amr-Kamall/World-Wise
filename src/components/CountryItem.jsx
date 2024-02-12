import styles from "./CountryItem.module.css";

function CountryItem({ countryObj }) {
  const { emoji, countryName } = countryObj;

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

  return (
    <li className={styles.countryItem}>
      <span>{urlToEmoji(emoji.props.src)}</span>
      <span>{countryName}</span>
    </li>
  );
}

export default CountryItem;
