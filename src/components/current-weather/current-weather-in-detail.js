import { useEffect, useState } from "react";
import "./current-weather-in-detail.styles.scss";
import { useSearchParams } from "react-router-dom";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../../api";
import { Link } from "react-router-dom";
import moment from "moment";
import { WiHumidity, WiDaySunny } from "react-icons/wi";
import { CgCompressV } from "react-icons/cg";
import { BsWind, BsEye, BsSunrise, BsSunset } from "react-icons/bs";
import { RiArrowGoBackLine } from "react-icons/ri";

const InDetail = () => {
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [currentUnit, setCurrentUnit] = useState("metric");
  const [searchCurrentWeather] = useSearchParams();
  const city = searchCurrentWeather.get("city");

  useEffect(() => {
    if (city !== "") {
      fetch(
        `${WEATHER_API_URL}/current.json?key=${WEATHER_API_KEY}&q=${city}&aqi=no`
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrentWeatherData(data);
          console.log(data);
        });
    }
  }, [city]);

  useEffect(() => {
    if (city !== "") {
      fetch(
        `${WEATHER_API_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${city}&days=3&aqi=no&alerts=no`
      )
        .then((response) => response.json())
        .then((data) => {
          setForecastData(data);
          console.log(data);
        });
    }
  }, [city]);

  if ((!currentWeatherData, !forecastData)) {
    return null;
  }
  const metricData = {
    temp: `${Math.round(currentWeatherData.current.temp_c)}°C`,
    feelslike: `${Math.round(currentWeatherData.current.feelslike_c)}°C`,
    distance: `${currentWeatherData.current.vis_km}km`,
    wind: `${currentWeatherData.current.wind_kph}km/h`,
    pressure: `${currentWeatherData.current.pressure_mb}mb`,
    tempMax: `${Math.round(
      forecastData.forecast.forecastday[0].day.maxtemp_c
    )}°C`,
    tempMin: `${Math.round(
      forecastData.forecast.forecastday[0].day.mintemp_c
    )}°C`,
    time: moment(currentWeatherData.location.localtime).format("dddd, HH:mm"),
    sunRiseTime: moment(
      forecastData.forecast.forecastday[0].astro.sunrise,
      "LT"
    ).format("HH:mm"),
    sunSetTime: moment(
      forecastData.forecast.forecastday[0].astro.sunset,
      "LT"
    ).format("HH:mm"),
  };

  const imperialData = {
    temp: `${Math.round(currentWeatherData.current.temp_f)}°F`,
    feelslike: `${Math.round(currentWeatherData.current.feelslike_f)}°F`,
    distance: `${currentWeatherData.current.vis_miles}mi`,
    wind: `${currentWeatherData.current.wind_mph}mph`,
    pressure: `${currentWeatherData.current.pressure_in}in`,
    tempMax: `${Math.round(
      forecastData.forecast.forecastday[0].day.maxtemp_f
    )}°F`,
    tempMin: `${Math.round(
      forecastData.forecast.forecastday[0].day.mintemp_f
    )}°F`,
    time: moment(currentWeatherData.location.localtime).format("dddd, LT"),
    sunRiseTime: forecastData.forecast.forecastday[0].astro.sunrise,
    sunSetTime: forecastData.forecast.forecastday[0].astro.sunset,
  };

  const weatherData = {
    metric: metricData,
    imperial: imperialData,
  };

  const getImageSource = (code) => {
    return `/weather-img/${code}.jpg`;
  };

  return (
    <div>
      <div className="InDetail-container">
        <div className="location-top">
          <div className="top-city-time">
            <p className="top-city">
              {currentWeatherData.location.name},{" "}
              {currentWeatherData.location.country}
            </p>
            <div className="border-location-time"></div>
            <p className="top-hours">{weatherData[currentUnit].time}</p>
          </div>
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
          <Link className="top-back-icon" to="/">
            <RiArrowGoBackLine />
          </Link>
        </div>
        <div className="top-side">
          <div className="temp-description">
            <div className="temp-icon-top-side">
              <img
                className="icon-top-side"
                src={currentWeatherData.current.condition.icon}
                alt="weather-icon"
              ></img>
              <p className="temp-top-side">{weatherData[currentUnit].temp}</p>
            </div>
            <p className="description-top-side">
              {currentWeatherData.current.condition.text}
            </p>
            <img
              className="details-code-icon"
              alt="weather"
              src={getImageSource(currentWeatherData.current.condition.code)}
            ></img>
          </div>
          <div className="sun-min-max-temps">
            <div className="sun-position-container">
              <div className="sun-rise">
                <div className="sun-icons">
                  <BsSunrise />
                </div>
                <p>{weatherData[currentUnit].sunRiseTime}</p>
              </div>
              <div className="sun-set">
                <div className="sun-icons">
                  <BsSunset />
                </div>
                <p>{weatherData[currentUnit].sunSetTime}</p>
              </div>
            </div>
            <div className="min-max-rain-chanse">
              <div className="max-min-temps-display">
                <p className="details-max-temp">
                  {weatherData[currentUnit].tempMax}
                </p>
                <p className="details-min-temp">
                  {weatherData[currentUnit].tempMin}
                </p>
              </div>
              <p className="details-chanse-of-rain">
                Chanse to rain:{" "}
                {forecastData.forecast.forecastday[0].day.daily_chance_of_rain}%
              </p>
            </div>
          </div>
        </div>
        <div className="bottom-side">
          <div className="right-side-inside">
            <div className="info-sepparation">
              <p className="info-for-RealFeel">RealFeel:</p>
              <p className="data-for-each">
                {weatherData[currentUnit].feelslike}
              </p>
            </div>
            <div className="info-sepparation">
              <div className="icon-info-for-each">
                <WiHumidity />
                <p className="info-for-each">Humidity:</p>
              </div>
              <p className="data-for-each">
                {currentWeatherData.current.humidity}%
              </p>
            </div>
            <div className="info-sepparation">
              <div className="icon-info-for-each">
                <CgCompressV />
                <p className="info-for-each">Pressure:</p>
              </div>
              <p className="data-for-each">
                {weatherData[currentUnit].pressure}
              </p>
            </div>
          </div>
          <div className="left-side-inside">
            <div className="info-sepparation">
              <div className="icon-info-for-each">
                <WiDaySunny />
                <p className="info-for-each">UV Index:</p>
              </div>
              <p className="data-for-each">{currentWeatherData.current.uv}</p>
            </div>
            <div className="info-sepparation">
              <div className="icon-info-for-each">
                <BsEye />
                <p className="info-for-each">Visibility:</p>
              </div>

              <p className="data-for-each">
                {weatherData[currentUnit].distance}
              </p>
            </div>
            <div className="info-sepparation">
              <div className="icon-info-for-each">
                <BsWind />
                <p className="info-for-each">Wind:</p>
              </div>
              <p className="data-for-each">
                {currentWeatherData.current.wind_dir}{" "}
                {weatherData[currentUnit].wind}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InDetail;
