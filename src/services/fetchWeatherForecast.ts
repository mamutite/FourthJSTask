import { WeatherData } from "../interfaces/weatherData";

export async function fetchWeatherForecast(
  coords: google.maps.LatLng
): Promise<WeatherData[]> {
  console.log(coords);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat()}&lon=${coords.lng()}&appid=${
      process.env.REACT_APP_WEATHER_API_KEY
    }&units=metric`
  );
  const res = await response.json();
  return res.list.map(
    (element: any) =>
      ({
        temp: element.main.temp,
        feelsLikeTemp: element.main.feels_like,
        weatherType: element.weather[0].main,
        clouds: element.clouds.all,
        rain: element.pop,
      } as WeatherData)
  );
}
