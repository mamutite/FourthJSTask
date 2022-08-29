import { TableCell } from "@mui/material";
import { WeatherData } from "../../../interfaces/weatherData";
import { HeaderTypeEnum } from "../../../interfaces/HeaderTypeEnum";

interface DataRowProps {
  row: WeatherData;
  headerType: HeaderTypeEnum;
}
function DataRow(props: DataRowProps) {
  const { row, headerType } = props;

  const headerCell =
    headerType === HeaderTypeEnum.Date ? (
      <TableCell component="th" scope="row" align="center">
        {(row.date.getDate() + "").padStart(2, "0") +
          "." +
          (row.date.getMonth() + "").padStart(2, "0")}
      </TableCell>
    ) : (
      <TableCell component="th" scope="row" align="center">
        {(row.date.getHours() + "").padStart(2, "0") +
          ":" +
          (row.date.getMinutes() + "").padStart(2, "0")}
      </TableCell>
    );

  return (
    <>
      {headerCell}
      <TableCell align="center">{Math.round(row.temp)}°C</TableCell>
      <TableCell align="center">{Math.round(row.feelsLikeTemp)}°C</TableCell>
      <TableCell align="center">{row.weatherType}</TableCell>
      <TableCell align="center">{Math.round(row.rain * 100)}%</TableCell>
      <TableCell align="center">{Math.round(row.clouds)}%</TableCell>
    </>
  );
}

export default DataRow;
