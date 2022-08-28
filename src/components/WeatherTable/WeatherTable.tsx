import {
  Table,
  TableHead,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import { HeaderTypeEnum } from "../../interfaces/HeaderTypeEnum";
import { WeatherData } from "../../interfaces/weatherData";
import { parseWeatherTableRows } from "../../utils/parseWeatherTableRows";
import { separateWeatherDataByDay } from "../../utils/separateWeatherDataByDay";
import HeaderRow from "./components/HeaderRow";
import WeatherTableRow from "./components/WeatherTableRow";

import "./WeatherTable.css";

interface WeatherTableProps {
  weatherData: WeatherData[];
}
function WeatherTable(props: WeatherTableProps) {
  const { weatherData } = props;
  const weatherRows = parseWeatherTableRows(weatherData);
  const collapsibleWeatherRows = separateWeatherDataByDay(weatherData);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <HeaderRow headerType={HeaderTypeEnum.Date} />
        </TableHead>
        <TableBody>
          {weatherRows.map((row) => (
            <WeatherTableRow
              key={row.date.getDate()}
              row={row}
              collapsibleRows={collapsibleWeatherRows.get(row.date.getDate())}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WeatherTable;
