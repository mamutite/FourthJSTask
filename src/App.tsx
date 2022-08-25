import Autocomplete from "react-google-autocomplete";

interface AddressComponentI {
  long_name: string;
  short_name: string;
  types: string[];
}

interface PlaceResultI {
  address_components: AddressComponentI[];
  formatted_address: string;
}

function App() {
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          fetch(
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
          )
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
            });
        },
        () => {
          console.log("Unable to get location");
        }
      );
    }
  }

  function handlePlaceSelected(place: PlaceResultI) {
    console.log(place);
    if (place === undefined) return;
    const city = place.address_components[0].long_name;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  return (
    <div className="App">
      <Autocomplete
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        lang="en"
        onPlaceSelected={(place: any) => handlePlaceSelected(place)}
      />
      <div className="current-location">
        <button onClick={getLocation}>Get location</button>
      </div>
    </div>
  );
}

export default App;
