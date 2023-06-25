import "./forecast.hour.styles.scss";
import moment from "moment";
import { useRef, useEffect } from "react";

const ForecastHour = ({ forecastData, currentUnit }) => {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [forecastData]);

  if (
    !forecastData ||
    !forecastData.forecast ||
    !forecastData.forecast.forecastday ||
    !forecastData.forecast.forecastday[0].hour
  ) {
    return null;
  }

  const currentHour = moment(forecastData.location.localtime).format("HH");

  const DAY_HOURS = forecastData.forecast.forecastday[0].hour
    .slice(0, 24)
    .map((hours) => {
      const metricData = {
        temp: `${Math.round(hours.temp_c)}°C`,
      };

      const imperialData = {
        temp: `${Math.round(hours.temp_f)}°F`,
      };

      const weatherData = {
        metric: metricData,
        imperial: imperialData,
      };

      return {
        time: moment(hours.time).format("HH:mm"),
        hourTarget: moment(hours.time).format("HH"),
        icon: hours.condition.icon,
        description: hours.condition.text,
        ...weatherData[currentUnit],
      };
    });

  return (
    <div className="wrapper-hours">
      <h1 className="forecast-title-hours">Forecast by hour</h1>
      <div className="hours-info-container">
        {DAY_HOURS.map((hour, index) => (
          <div
            className={`info ${
              currentHour === hour.hourTarget ? "active" : ""
            }`}
            ref={currentHour === hour.hourTarget ? ref : undefined}
            key={index}
          >
            <div className="hour-icon-info-description">
              <div className="hour-icon">
                <img alt="weather-icon" src={hour.icon}></img>
              </div>
              <div className="hour-info-description">
                <p className="hour-info">{hour.time}</p>
                <p className="hour-description">{hour.description}</p>
              </div>
            </div>
            <p className="hour-temp">{hour.temp}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ForecastHour;
