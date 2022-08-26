import "./CurrentLocation.css";

function CurrentLocation() {
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

  return (
    <div className="current-location">
      <button onClick={getLocation}>Get location</button>
    </div>
  );
}

export default CurrentLocation;
