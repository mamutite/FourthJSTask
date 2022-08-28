import { TableRow, TableCell, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { WeatherData } from "../../../interfaces/weatherData";
import { useState, Fragment } from "react";
import { HeaderTypeEnum } from "../../../interfaces/HeaderTypeEnum";
import CollapsibleRows from "./CollapsibleRows";
import DataRow from "./DataRow";

interface WeatherTableRowProps {
  row: WeatherData;
  collapsibleRows: WeatherData[] | undefined;
}
function WeatherTableRow(props: WeatherTableRowProps) {
  const { row, collapsibleRows } = props;
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <DataRow row={row} headerType={HeaderTypeEnum.Date} />
      </TableRow>
      <TableRow>
        {collapsibleRows && (
          <CollapsibleRows open={open} rows={collapsibleRows} />
        )}
      </TableRow>
    </Fragment>
  );
}

export default WeatherTableRow;
