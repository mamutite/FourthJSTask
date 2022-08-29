import { WeatherData } from "../interfaces/weatherData";
import { separateWeatherDataByDay } from "./separateWeatherDataByDay";

export function parseWeatherTableRows(data: WeatherData[]): WeatherData[] {
  const weatherMap = separateWeatherDataByDay(data);

  let res: WeatherData[] = [];
  weatherMap.forEach((value) => {
    const joinedResult = parseDataForDay(value);
    res = [...res, joinedResult];
  });

  return res;
}

function parseDataForDay(data: WeatherData[]): WeatherData {
  let res: WeatherData = { ...data[0] };
  const timestamps = data.length;

  data.slice(1).forEach((el) => {
    res.temp += el.temp;
    res.clouds += el.clouds;
    res.feelsLikeTemp += el.feelsLikeTemp;
    res.rain += el.rain;
  });

  res.weatherType = findMostOftenWeatherType(data);
  res.temp = res.temp / timestamps;
  res.rain = +(res.rain / timestamps);
  res.clouds = res.clouds / timestamps;
  res.feelsLikeTemp = res.feelsLikeTemp / timestamps;

  return res;
}

function findMostOftenWeatherType(data: WeatherData[]): string {
  let occurences = new Map<string, number>();

  data.forEach((el) => {
    const value = occurences.get(el.weatherType);
    if (value) occurences.set(el.weatherType, value + 1);
    else occurences.set(el.weatherType, 1);
  });

  let res = "",
    maxOcc = 0;
  occurences.forEach((value, key) => {
    if (value > maxOcc) {
      maxOcc = value;
      res = key;
    }
  });

  return res;
}
