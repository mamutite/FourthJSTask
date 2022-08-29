import { useState } from "react";
import { WeatherData } from "../../interfaces/weatherData";
import CitySearch from "../CitySearch";
import CurrentLocation from "../CurrentLocation";
import WeatherTable from "../WeatherTable";

import "./MainPage.css";

function MainPage() {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [location, setLocation] = useState<string>("");

  function handleLocationChange(data: WeatherData[], newLocation: string) {
    setWeatherData(data);
    setLocation(newLocation);
  }

  const weatherTable =
    weatherData.length > 0 ? (
      <WeatherTable weatherData={weatherData} location={location} />
    ) : (
      <div>
        Please select a location in the search field or click the button for
        current location weather!
      </div>
    );

  return (
    <div className="main__container">
      <div className="header-components__container">
        <div className="header-text">
          <h1>Weather Forecast</h1>
        </div>

        <div className="location-components__container">
          <div className="search-field">
            <CitySearch handleLocationChange={handleLocationChange} />
          </div>

          <div className="current-location">
            <CurrentLocation handleLocationChange={handleLocationChange} />
          </div>
        </div>
      </div>

      <div className="weather-table">{weatherTable}</div>
    </div>
  );
}

export default MainPage;
