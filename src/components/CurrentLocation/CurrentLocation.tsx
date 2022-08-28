import { Button } from "@mui/material";
import { useState } from "react";
import { WeatherData } from "../../interfaces/weatherData";
import { fetchWeatherForecast } from "../../services/fetchWeatherForecast";
import { getLocationFromCoords } from "../../utils/parseCords";
import "./CurrentLocation.css";

interface CurrentLocationProps {
  handleLocationChange: (data: WeatherData[]) => void;
}

function CurrentLocation(props: CurrentLocationProps) {
  const [currentLocation, setCurrentLocation] = useState<string>();
  const { handleLocationChange } = props;

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const coords = new google.maps.LatLng(lat, lng);

          getLocationFromCoords(coords).then((location) =>
            setCurrentLocation(location)
          );

          fetchWeatherForecast(coords).then((data: WeatherData[]) => {
            handleLocationChange(data);
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
      <Button onClick={getLocation} variant="outlined" color="primary">
        Get Current Location Weather
      </Button>
      {currentLocation && (
        <div className="location">Your current location: {currentLocation}</div>
      )}
    </div>
  );
}

export default CurrentLocation;
