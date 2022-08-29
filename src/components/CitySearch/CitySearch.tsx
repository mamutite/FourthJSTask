import { fetchWeatherForecast } from "../../services/fetchWeatherForecast";
import { usePlacesWidget } from "react-google-autocomplete";
import { TextField } from "@mui/material";
import {
  getCityFromAddressComponents,
} from "../../utils/parseCords";
import { WeatherData } from "../../interfaces/weatherData";

import "./CitySearch.css";

interface CitySearchProps {
  handleLocationChange: (data: WeatherData[], newLocation: string) => void;
}

function CitySearch(props: CitySearchProps) {
  const { handleLocationChange } = props;

  const { ref: materialRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    onPlaceSelected: (place) => handlePlaceSelected(place),
    language: "en",
  });

  function handlePlaceSelected(place: google.maps.places.PlaceResult) {
    if (place && place.formatted_address && place.geometry && place.geometry.location) {
      const location = getCityFromAddressComponents(place);
      const coords = place.geometry.location;

      fetchWeatherForecast(coords).then((data: WeatherData[]) => {
        handleLocationChange(data, location);
      })
    }
  }

  return (
    <div style={{ width: "100%", marginTop: "3rem" }}>
      <TextField
        fullWidth
        color="primary"
        variant="outlined"
        inputRef={materialRef}
        placeholder="Enter location"
      />
    </div>
  );
}

export default CitySearch;
