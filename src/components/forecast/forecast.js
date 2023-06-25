import "./forecast.styles.scss";
import * as Accordion from "@radix-ui/react-accordion";
import moment from "moment/moment";

const Forecast = ({ forecastData, currentUnit }) => {
  if (
    !forecastData ||
    !forecastData.forecast ||
    !forecastData.forecast.forecastday
  ) {
    return null;
  }

  const WEEK_DAYS = forecastData.forecast.forecastday
    .slice(0, 3)
    .map((days) => {
      const metricData = {
        tempMax: `${Math.round(days.day.maxtemp_c)} °C`,
        tempMin: `${Math.round(days.day.mintemp_c)} °C`,
      };

      const imperialData = {
        tempMax: `${Math.round(days.day.maxtemp_f)} °F`,
        tempMin: `${Math.round(days.day.mintemp_f)} °F`,
      };

      const weatherData = {
        metric: metricData,
        imperial: imperialData,
      };

      return {
        dayoftheweek: moment(days.date).format("dddd, Do MMMM YYYY"),
        icon: days.day.condition.icon,
        description: days.day.condition.text,
        ...weatherData[currentUnit],
      };
    });

  return (
    <div className="wrapper">
      <h1 className="forecast-title-days">Forecast 3 days</h1>
      <div className="days-container">
        <Accordion.Root
          className="forecast-root"
          type="single"
          collapsible="true"
        >
          {WEEK_DAYS.map((day, index) => (
            <Accordion.Item
              className="forecast-item"
              key={index}
              value={`item-${index}`}
            >
              <Accordion.Trigger
                className={`days ${index === 0 ? "first-day" : ""}`}
              >
                <div className="left-info">
                  <div className="forecast-day-icon">
                    <img alt="weather-icon" src={day.icon}></img>
                  </div>
                  <div className="day-of-the-week-description">
                    <p className="day-of-the-week">{day.dayoftheweek}</p>
                    <p className="day-description">{day.description}</p>
                  </div>
                </div>
                <div className="right-forecast-info">
                  <p className="temp-max">{day.tempMax}</p>
                  <p className="temp-min">{day.tempMin}</p>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className="forecast-content">
                {forecastData.forecast.forecastday[index].hour
                  .slice(0, 24)
                  .filter((_, array) => array % 3 === 0)
                  .map((hours, hourIndex) => {
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
                    return (
                      <div className="forecast-mini-container" key={hourIndex}>
                        <p className="forecast-hour-small">
                          {moment(hours.time).format("HH:mm")}
                        </p>
                        <img
                          className="forecast-icon-small"
                          src={hours.condition.icon}
                          alt="weather-icon"
                        ></img>
                        <p className="forecast-temp-small">
                          {weatherData[currentUnit].temp}
                        </p>
                      </div>
                    );
                  })}
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
};

export default Forecast;
