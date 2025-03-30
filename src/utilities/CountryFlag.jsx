import "/node_modules/flag-icons/css/flag-icons.min.css";

function CountryFlag({ countryCode }) {
  return <span className={`fi fi-${countryCode.toLowerCase()} mr-2`} />;
}

export default CountryFlag;
