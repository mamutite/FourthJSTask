import {
  TableRow,
  TableCell,
  IconButton,
  Box,
  Collapse,
  Table,
  TableBody,
  Typography,
  TableHead,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import { WeatherData } from "../../../interfaces/weatherData";

interface WeatherTableRowProps {
  row: WeatherData;
  collapsibleRows: WeatherData[] | undefined;
}
function WeatherTableRow(props: WeatherTableRowProps) {
  const { row, collapsibleRows } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="left">
          {(row.date.getDate() + "").padStart(2, "0") +
            "." +
            (row.date.getMonth() + "").padStart(2, "0")}
        </TableCell>
        <TableCell align="center">{row.temp}</TableCell>
        <TableCell align="center">{row.feelsLikeTemp}</TableCell>
        <TableCell align="center">{row.weatherType}</TableCell>
        <TableCell align="center">{row.rain}</TableCell>
        <TableCell align="center">{row.clouds}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Day By Day
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="right">Temperature</TableCell>
                    <TableCell align="right">Feels Like</TableCell>
                    <TableCell align="right">Weather Type</TableCell>
                    <TableCell align="right">Rain</TableCell>
                    <TableCell align="right">Cloudiness</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {collapsibleRows &&
                    collapsibleRows.map((cRow) => (
                      <TableRow key={cRow.date.getTime()}>
                        <TableCell component="th" scope="row">
                          {cRow.date.toTimeString()}
                        </TableCell>
                        <TableCell>{cRow.temp}</TableCell>
                        <TableCell align="right">
                          {cRow.feelsLikeTemp}
                        </TableCell>
                        <TableCell align="right">{cRow.weatherType}</TableCell>
                        <TableCell align="right">{cRow.rain}</TableCell>
                        <TableCell align="right">{cRow.clouds}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default WeatherTableRow;
