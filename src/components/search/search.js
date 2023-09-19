import { useEffect, useState } from "react";
import "./search.styles.scss";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../../api";
import { useDebounce } from "./debounce";
import CurrentWeather from "../current-weather/current-weather";
import Forecast from "../forecast/forecast";
import ForecastHour from "../forecast/forecast.hour";
import SelectBar from "./select";
import HomePage from "../home/home.page";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [selectedSelectItem, setSelectedSelectItem] = useState("");
  const [forecastData, setForecastData] = useState(null);
  const [currentUnit, setCurrentUnit] = useState("metric");
  const debouncedValue = useDebounce(search, 700);

  useEffect(() => {
    if (debouncedValue !== "") {
      fetch(
        `${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${debouncedValue}&aqi=no`
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentWeatherData(data);
          console.log(data);
        });
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (debouncedValue !== "") {
      fetch(
        `${WEATHER_API_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${debouncedValue}&days=3&aqi=no&alerts=yes`
      )
        .then((response) => response.json())
        .then((data) => {
          setForecastData(data);
          console.log(data);
        });
    }
  }, [debouncedValue]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSelectChange = (selectedValue) => {
    setSelectedSelectItem(selectedValue);
    setSearch(selectedValue);
  };

  if ((!currentWeatherData, !forecastData))
    return (
      <HomePage
        search={search}
        handleChange={handleChange}
        handleSelectChange={handleSelectChange}
        selectedSelectItem={selectedSelectItem}
      />
    );

  return (
    <div className="search-container">
      <div className="input-location">
        <input
          className="input-look"
          type="text"
          placeholder="Search for cities"
          onChange={handleChange}
          value={search}
        />
        <span className="icon-input-look">
          <AiOutlineSearch />
        </span>
        <button
          className="units-button"
          onClick={() =>
            setCurrentUnit((unit) =>
              unit === "metric" ? "imperial" : "metric"
            )
          }
        >
          {currentUnit === "metric" ? "Imperial" : "Metric"}
        </button>
      </div>
      <SelectBar
        classNameSelection={"selection-inside"}
        classNameContent={"select-content-inside"}
        handleSelectChange={handleSelectChange}
        selectedSelectItem={selectedSelectItem}
      />
      <div className="current-hour-day">
        <div className="current-weather-display">
          <CurrentWeather
            currentUnit={currentUnit}
            currentWeatherData={currentWeatherData}
          />
        </div>
        <div className="forecast-days-hour">
          <Forecast currentUnit={currentUnit} forecastData={forecastData} />
          <ForecastHour currentUnit={currentUnit} forecastData={forecastData} />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
