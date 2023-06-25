import "./current-weather.scss";
import { BsWind } from "react-icons/bs";
import { WiHumidity, WiDaySunny } from "react-icons/wi";
import { BsEmojiNeutral } from "react-icons/bs";
import { Link } from "react-router-dom";

import moment from "moment";

const CurrentWeather = ({ currentWeatherData, currentUnit, forecastData }) => {
  if (!currentWeatherData || !currentWeatherData.current) {
    return (
      <h2 className="error">
        City not found <BsEmojiNeutral />
      </h2>
    );
  }
  const metricData = {
    temp: `${Math.round(currentWeatherData.current.temp_c)}°C`,
    wind: `${currentWeatherData.current.wind_kph}km/h`,
  };

  const imperialData = {
    temp: `${Math.round(currentWeatherData.current.temp_f)}°F`,
    wind: `${currentWeatherData.current.wind_mph}mph`,
  };

  const weatherData = {
    metric: metricData,
    imperial: imperialData,
  };

  const getImageSource = (code) => {
    return `/weather-img/${code}.jpg`;
  };

  return (
    <div className="wrapper-current">
      <div className="title-link">
        <h1 className="current-title">Weather now</h1>
        <Link
          className="link-current"
          to={`/details?city=${currentWeatherData.location.name} ${currentWeatherData.location.country} ${forecastData}`}
        >
          more details
        </Link>
      </div>
      <div className="current-weather-card">
        <img
          className="weather-image"
          src={getImageSource(currentWeatherData.current.condition.code)}
          alt="Weather"
        />
        <div className="location-top-part">
          <h2 className="location-name">
            {currentWeatherData.location.name},{" "}
            {currentWeatherData.location.country}
          </h2>
          <h2 className="location-time">
            {moment(currentWeatherData.location.localtime).format("HH:mm")}
          </h2>
        </div>
        <div className="icon-description-middle-part">
          <img
            className="current-weather-icon"
            src={currentWeatherData.current.condition.icon}
            alt="weather-icon"
          ></img>
          <p className="weather-description">
            {currentWeatherData.current.condition.text}
          </p>
        </div>
        <div className="info-temp-bottom-part">
          <div className="curent-weather-info">
            <div className="text-icon">
              <BsWind />
              <p> {weatherData[currentUnit].wind}</p>
            </div>
            <div className="text-icon">
              <WiHumidity />
              <p>{currentWeatherData.current.humidity}%</p>
            </div>
            <div className="text-icon">
              <WiDaySunny /> <p>{currentWeatherData.current.uv} uv</p>
            </div>
          </div>
          <p className="temperature">{weatherData[currentUnit].temp}</p>
        </div>
      </div>
    </div>
  );
};
export default CurrentWeather;
