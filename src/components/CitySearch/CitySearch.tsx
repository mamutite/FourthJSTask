import { fetchWeatherForecast } from "../../services/fetchWeatherForecast";
import { usePlacesWidget } from "react-google-autocomplete";
import { TextField } from "@mui/material";
import { getCoords } from "../../utils/parseCityToCords";
import { WeatherData } from "../../interfaces/weatherData";

import "./CitySearch.css";

interface CitySearchProps {
  handleLocationChange: (data: WeatherData[]) => void;
}

function CitySearch(props: CitySearchProps) {
  const { handleLocationChange } = props;

  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => handlePlaceSelected(place),
    language: "en",
  });

  function handlePlaceSelected(place: google.maps.places.PlaceResult) {
    if (place && place.address_components) {
      const city = place.address_components[0].long_name;

      getCoords(city).then((coords: google.maps.LatLng) =>
        fetchWeatherForecast(coords).then((data: WeatherData[]) => {
          handleLocationChange(data);
        })
      );
    }
  }

  return (
    <div style={{ width: "250px", marginTop: "20px" }}>
      <TextField
        fullWidth
        color="secondary"
        variant="outlined"
        inputRef={materialRef}
        placeholder="Enter location"
      />
    </div>
  );
}

export default CitySearch;
