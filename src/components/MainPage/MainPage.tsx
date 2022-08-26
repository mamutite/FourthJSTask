import CitySearch from "../CitySearch";
import CurrentLocation from "../CurrentLocation";
import WeatherTable from "../WeatherTable";
import "./MainPage.css";

function MainPage() {
  return (
    <div className="main__container">
      <div className="header-components__container">
        <div className="header-text">
          <h1>Weather Forecast</h1>
        </div>

        <div className="location-components__container">
          <div className="search-field">
            <CitySearch />
          </div>

          <div className="current-location">
            <CurrentLocation />
          </div>
        </div>
      </div>

      <div className="weather-table__container">
        <WeatherTable />
      </div>
    </div>
  );
}

export default MainPage;
