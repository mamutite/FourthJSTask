import Autocomplete from "react-google-autocomplete";

const YOUR_GOOGLE_MAPS_API_KEY = "AIzaSyBlzs88A9ls5GLMa0LW5Sl8ge8uzVcPTFY";
const WEATHER_API_KEY = "8929a8f81f83e6cb778920ccf1b18e1d";

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
            `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
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
    console.log(place)
    if (place === undefined) return;
    const city = place.address_components[0].long_name;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  }

  return (
    <div className="App">
      <Autocomplete
        apiKey={YOUR_GOOGLE_MAPS_API_KEY}
        lang="en"
        onPlaceSelected={(place: any) =>
          handlePlaceSelected(place)
        }
      />
      <div className="current-location">
        <button onClick={getLocation}>Get location</button>
      </div>
    </div>
  );
}

export default App;
