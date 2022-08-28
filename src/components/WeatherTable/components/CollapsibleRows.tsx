import {
  TableCell,
  Collapse,
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
} from "@mui/material";
import { HeaderTypeEnum } from "../../../interfaces/HeaderTypeEnum";
import { WeatherData } from "../../../interfaces/weatherData";
import DataRow from "./DataRow";
import HeaderRow from "./HeaderRow";

interface CollapsibleCellProps {
  rows: WeatherData[];
  open: boolean;
}
function CollapsibleRows(props: CollapsibleCellProps) {
  const { rows, open } = props;

  return (
    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
      <Collapse in={open} timeout="auto">
        <Box sx={{ margin: 1 }}>
          <Typography variant="h6" gutterBottom component="div">
            Hour By Hour
          </Typography>
          <Table size="small" aria-label="purchases">
            <TableHead>
              <HeaderRow headerType={HeaderTypeEnum.Hour} />
            </TableHead>
            <TableBody>
              {rows.map((cRow) => (
                <TableRow key={cRow.date.getTime()}>
                  <DataRow row={cRow} headerType={HeaderTypeEnum.Hour} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Collapse>
    </TableCell>
  );
}

export default CollapsibleRows;
