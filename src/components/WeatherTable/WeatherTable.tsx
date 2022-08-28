import {
  TableRow,
  TableCell,
  Table,
  TableHead,
  TableBody,
  Paper,
  TableContainer,
} from "@mui/material";
import { WeatherData } from "../../interfaces/weatherData";
import { parseWeatherTableRows } from "../../utils/parseWeatherTableRows";
import { separateWeatherDataByDay } from "../../utils/separateWeatherDataByDay";
import WeatherTableRow from "./components/TableRow";

import "./WeatherTable.css";

interface WeatherTableProps {
  weatherData: WeatherData[];
}

function WeatherTable(props: WeatherTableProps) {
  const { weatherData } = props;
  const weatherRows = parseWeatherTableRows(weatherData);
  const collapsibleWeatherRows = separateWeatherDataByDay(weatherData);
  console.log(collapsibleWeatherRows);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="left">Date</TableCell>
            <TableCell align="center">Temperature</TableCell>
            <TableCell align="center">Feels Like</TableCell>
            <TableCell align="center">Weather Type</TableCell>
            <TableCell align="center">Rain</TableCell>
            <TableCell align="center">Cloudiness</TableCell>
          </TableRow>
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
