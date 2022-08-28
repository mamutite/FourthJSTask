import { WeatherData } from "../interfaces/weatherData";

export function separateWeatherDataByDay(
  data: WeatherData[]
): Map<number, WeatherData[]> {
  let weatherMap = new Map<number, WeatherData[]>();
  data.forEach((element) => {
    const mapEl = weatherMap.get(element.date.getDate());
    if (mapEl) {
      weatherMap.set(element.date.getDate(), [...mapEl, element]);
    } else if (weatherMap.size + 1 <= 5) {
      weatherMap.set(element.date.getDate(), [element]);
    }
  });

  return weatherMap;
}
