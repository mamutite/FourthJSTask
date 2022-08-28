import { Button } from "@mui/material";
import { WeatherData } from "../../interfaces/weatherData";
import { fetchWeatherForecast } from "../../services/fetchWeatherForecast";
import "./CurrentLocation.css";

interface CurrentLocationProps {
  handleLocationChange: (data: WeatherData[]) => void;
}

function CurrentLocation(props: CurrentLocationProps) {
  const { handleLocationChange } = props;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          fetchWeatherForecast(new google.maps.LatLng(lat, lng)).then(
            (data: WeatherData[]) => {
              handleLocationChange(data);
            }
          );
        },
        () => {
          console.log("Unable to get location");
        }
      );
    }
  }

  return (
    <div className="current-location">
      <Button onClick={getLocation} variant="outlined" color="secondary">
        Get location
      </Button>
    </div>
  );
}

export default CurrentLocation;
