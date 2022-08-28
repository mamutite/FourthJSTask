import { TableCell, TableRow } from "@mui/material";
import { HeaderTypeEnum } from "../../../interfaces/HeaderTypeEnum";

interface HeaderRowProps {
  headerType: HeaderTypeEnum;
}
function HeaderRow(props: HeaderRowProps) {
  const { headerType } = props;

  const headerCell =
    headerType === HeaderTypeEnum.Date ? (
      <>
        <TableCell />
        <TableCell align="center">Date</TableCell>
      </>
    ) : (
      <TableCell align="center">Hour</TableCell>
    );

  return (
    <TableRow>
      {headerCell}
      <TableCell align="center">Temperature</TableCell>
      <TableCell align="center">Feels Like</TableCell>
      <TableCell align="center">Weather Type</TableCell>
      <TableCell align="center">Rain</TableCell>
      <TableCell align="center">Cloudiness</TableCell>
    </TableRow>
  );
}

export default HeaderRow;
