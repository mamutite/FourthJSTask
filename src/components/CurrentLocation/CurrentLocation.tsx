import { Button } from "@mui/material";
import { WeatherData } from "../../interfaces/weatherData";
import { fetchWeatherForecast } from "../../services/fetchWeatherForecast";
import { getLocationFromCoords } from "../../utils/parseCords";

import "./CurrentLocation.css";

interface CurrentLocationProps {
  handleLocationChange: (data: WeatherData[], newLocation: string) => void;
}

function CurrentLocation(props: CurrentLocationProps) {
  const { handleLocationChange } = props;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const coords = new google.maps.LatLng(lat, lng);

          getLocationFromCoords(coords).then((location) => {
            fetchWeatherForecast(coords).then((data: WeatherData[]) => {
              handleLocationChange(data, location);
            });
          });
        },
        () => {
          console.log("Unable to get location");
        }
      );
    }
  }

  return (
    <div className="current-location__container">
      <Button
        data-testid="currentLocation"
        onClick={getLocation}
        variant="outlined"
        color="primary"
      >
        Get Current Location Weather
      </Button>
    </div>
  );
}

export default CurrentLocation;
