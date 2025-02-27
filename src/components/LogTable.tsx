import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { SourceIcon } from "../assets/icons/SourceIcon";
import { TargetIcon } from "../assets/icons/TargetIcon";
import { Organization } from "../types/filteredType";


type Props = {
  filteredData:  Organization[];
};

export const LogTable: React.FC<Props> = ({ filteredData }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 30;

  const tableCellStyles = {
    border: "1px solid rgba(0, 0, 0, 0.1)",
    color: "#3D3D3D",
    fontSize: "13px",
    fontWeight: "500",
    fontFamily: "Geist, san-serif",
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer
      component={Paper}
      sx={{ borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={tableCellStyles}>INDEX</TableCell>
            <TableCell sx={tableCellStyles}>DB</TableCell>
            <TableCell sx={tableCellStyles}>ID</TableCell>
            <TableCell sx={tableCellStyles}>USER_ID</TableCell>
            <TableCell sx={tableCellStyles}>NAME</TableCell>
            <TableCell sx={tableCellStyles}>ACCESS</TableCell>
            <TableCell sx={tableCellStyles}>WEBSITE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableCell></TableCell>
          {paginatedData.map((data, index) => (
            <TableRow key={data.id}>
              <TableCell sx={tableCellStyles}>
                {index + 1 + page * rowsPerPage}
              </TableCell>
              <TableCell sx={{...tableCellStyles, display: "flex", gap: "10px"}}>
              {index % 2 === 0 ? <SourceIcon /> : <TargetIcon />}{" "}
              {index % 2 === 0 ? "Source Record" : "Target Record"}
              </TableCell>
              <TableCell sx={tableCellStyles}>{data.id}</TableCell>
              <TableCell sx={tableCellStyles}>{data.user_id}</TableCell>
              <TableCell sx={tableCellStyles}>{data.name}</TableCell>
              <TableCell sx={tableCellStyles}>{data.access}</TableCell>
              <TableCell sx={tableCellStyles}>{data.website}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[30]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
};
