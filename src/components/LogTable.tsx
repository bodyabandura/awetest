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

type Props = {
  filteredData: any[];
  selectedColumn: "id" | "user_id" | "name" | "website" |  null;
};

export const LogTable: React.FC<Props> = ({ filteredData, selectedColumn }) => {
  const [page, setPage] = useState(0);
  const rowsPerPage = 30;

  const tableCellStyles = {
    border: "1px solid rgba(0, 0, 0, 0.1)",
    color: "#3D3D3D",
    fontSize: "13px",
    fontWeight: "500",
    fontFamily: "Geist, san-serif",
    padding: "11px 16px",
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

  const isColumnHighlighted = (column: string, sourceValue: string, targetValue: string) => {
    return selectedColumn === column && sourceValue !== targetValue;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ borderTopLeftRadius: "5px", borderTopRightRadius: "5px" }}
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
          {paginatedData.map((data, index) => (
            <React.Fragment key={data.id}>
              {data.sourceRecord && data.sourceRecord.length > 0 && (
                <TableRow>
                  <TableCell sx={tableCellStyles}>
                    {index + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell sx={{ ...tableCellStyles, display: "flex", gap: "10px" }}>
                    <SourceIcon /> Source Record
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableCellStyles,
                      backgroundColor: selectedColumn === "id" ? "#FFEBEB" : "transparent",
                    }}
                  >
                    {data.sourceRecord[0].id}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableCellStyles,
                      backgroundColor: selectedColumn === "user_id" ? "#FFEBEB" : "transparent",
                    }}
                  >
                    {data.sourceRecord[0].user_id}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableCellStyles,
                      backgroundColor: selectedColumn === "name" ? "#FFEBEB" : "transparent",
                    }}
                  >
                    {data.sourceRecord[0].name}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableCellStyles,
                    }}
                  >
                    {data.sourceRecord[0].access}
                  </TableCell>
                  <TableCell sx={tableCellStyles}>{data.sourceRecord[0].website}</TableCell>
                </TableRow>
              )}

              {data.targetRecord && data.targetRecord.length > 0 && (
                <TableRow>
                  <TableCell sx={tableCellStyles}>
                    {index + 1 + page * rowsPerPage}
                  </TableCell>
                  <TableCell sx={{ ...tableCellStyles, display: "flex", gap: "10px" }}>
                    <TargetIcon /> Target Record
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableCellStyles,
                      backgroundColor: selectedColumn && isColumnHighlighted(selectedColumn, data.targetRecord[0].id, data.sourceRecord[0]?.id) ? "#FFEBEB" : "transparent",
                    }}
                  >
                    {data.targetRecord[0].id}
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tableCellStyles,
                      backgroundColor: selectedColumn && isColumnHighlighted(selectedColumn, data.targetRecord[0].user_id, data.sourceRecord[0]?.user_id) ? "#FFEBEB" : "transparent",
                    }}
                  >
                    {data.targetRecord[0].user_id}
                  </TableCell>
                  <TableCell sx={tableCellStyles}>{data.targetRecord[0].name}</TableCell>
                  <TableCell
                    sx={{
                      ...tableCellStyles,
                      backgroundColor: selectedColumn && isColumnHighlighted(selectedColumn, data.targetRecord[0].name, data.sourceRecord[0]?.name) ? "#FFEBEB" : "transparent",
                    }}
                  >
                    {data.targetRecord[0].access}
                  </TableCell>
                  <TableCell   sx={{
                      ...tableCellStyles,
                      backgroundColor: selectedColumn && isColumnHighlighted(selectedColumn, data.targetRecord[0].website, data.sourceRecord[0]?.website || "") ? "#FFEBEB" : "transparent",
                    }}>{data.targetRecord[0].website}</TableCell>
                </TableRow>
              )}
            </React.Fragment>
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
