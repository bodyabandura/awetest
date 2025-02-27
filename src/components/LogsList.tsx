import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  debounce,
} from "@mui/material";
import { ArrowIcon } from "../assets/icons/ArrowIcon";
import { FailedIcon } from "../assets/icons/FailedIcon";
import { PassedIcon } from "../assets/icons/PassedIcon";
import { useEffect, useState } from "react";
import { getButtonClass } from "../utils/buttonClass";
import { Input } from "./Input";
import { SourceIcon } from "../assets/icons/SourceIcon";
import { TargetIcon } from "../assets/icons/TargetIcon";
import { parseDataMismatch } from "../utils/parseData";
import { LogTable } from "./LogTable";
import { RightArrowIcon } from "../assets/icons/RightArrowIcon";
import { DataCheckResult } from "../types/dataCheckResult";
import { Organization } from "../types/filteredType";

interface LogsListProps {
  log: DataCheckResult;
}

export const LogsList = ({ log }: LogsListProps) => { 
  const { data_mismatch } = log;
  const [filterTable, setFilterTable] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [isDataCheck, setIsDataCheck] = useState(true);
  const [isDetails, setIsDetails] = useState(false);
  const [value, setValue] = useState("");
  const [expanded, setExpanded] = useState(false);

  const parsedData = data_mismatch
    ? parseDataMismatch(data_mismatch)
    : [];

  const handleChangeButton = (buttonType: "dataCheck" | "details") => {
    if (buttonType === "dataCheck") {
      setIsDataCheck(true);
      setIsDetails(false);
    } else {
      setIsDataCheck(false);
      setIsDetails(true);
    }
  };

  const handleAccordionToggle = () => {
    setExpanded(!expanded);
  };

  const filteredData = parsedData.filter((record: Organization) => {
    const name = record.name || "";
    const id = record.id || "";
    const userId = record.user_id || "";
    const website = record.website || "";
    // const db = record.db || "";

    return (
      name.toLowerCase().includes(searchValue.toLowerCase()) ||
      id.toLowerCase().includes(searchValue.toLowerCase()) ||
      userId.toLowerCase().includes(searchValue.toLowerCase()) && name.toLowerCase().includes(searchValue.toLowerCase()) ||
      website.toLowerCase().includes(searchValue.toLowerCase())  
      // db.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const handleSearchChange = debounce((searchTerm: string) => {
    setSearchValue(searchTerm);
  }, 1000);

  useEffect(() => {
    handleSearchChange(value);
  }, [value]);
  return (
    <Accordion
      className="py-2"
      sx={{ boxShadow: "none" }}
      expanded={expanded}
      onChange={handleAccordionToggle}
    >
      <AccordionSummary
        className="w-full gap-2"
        expandIcon={
          expanded ? (
            <ArrowIcon

            />
          ) : (
            <RightArrowIcon

            />
          )
        }
        aria-controls={`panel-content`}
        id={`panel-header`}
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0",
        }}
      >
        <div className="flex items-center">
          <span
            className={`inline-block px-2 py-1 rounded-[25px]  ${
              log.result_counter.pass === 0
                ? "bg-[#FFE9E7] border-[1px] border-[#EDA69E] text-[#7D3838]"
                : "bg-[#F4FCF8] border text-[#347353] border-[#9ACCB3]"
            }`}
          >
            {log.result_counter.pass === 0 ? "Failed" : "Passed"}
          </span>
          <span className="ml-4 text-[#333333] font-medium text-[14px]">
            Test Case name: {log.test_case_name}
          </span>
        </div>
        <div className="ml-auto flex items-center border border-black border-opacity-10 rounded-[20px] divide-x divide-[#0000001A] divide-opacity-10">
          <span className="px-3 flex items-center gap-2 font-medium text-[12px] text-[#333333]">
            {log.result_counter.pass === 0 ? <FailedIcon /> : <PassedIcon />}
            Data Check
          </span>
          <p className="px-3 font-medium text-[12px] text-[#666666]">
            Source:{" "}
            <span className="font-semibold text-xs text-[#333333]">
              {log.source_data_count}
            </span>
          </p>
          <p className="px-3 font-medium text-[12px] text-[#666666]">
            Target:{" "}
            <span className="font-semibold text-xs text-[#333333]">
              {log.target_data_count}
            </span>
          </p>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <div className="flex flex-col">
            <div className="flex items-center pl-[35px] gap-[24px] border-b border-b-[#D9D9D9] pb-[31px]">
              <button
                className={`text-[#929292] text-[13px] ${
                  isDataCheck
                    ? "text-[#05AEEE] border-b border-b-[#05AEEE]"
                    : ""
                }`}
                onClick={() => handleChangeButton("dataCheck")}
              >
                Data Check
              </button>
              <button
                className={`text-[#929292] text-[13px] ${
                  isDetails ? "text-[#05AEEE] border-b border-b-[#05AEEE]" : ""
                }`}
                onClick={() => handleChangeButton("details")}
              >
                Details
              </button>
            </div>

            {isDataCheck && (
              <div className="flex items-center justify-between gap-2 pl-[35px] pb-4 border-b pt-4 border-b-[#D9D9D9] mb-[15px]">
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilterTable("all")}
                    className={`border border-black border-opacity-10 rounded-[10px] py-2 px-4 font-medium h-[32px] flex items-center ${getButtonClass(
                      filterTable,
                      "all"
                    )}`}
                  >
                    All Checks{" "}
                  </button>

                  <button
                    onClick={() => setFilterTable("failed")}
                    className={`flex items-center border border-black border-opacity-10 rounded-[10px] py-2 px-4 gap-1 font-medium h-[32px] ${getButtonClass(
                      filterTable,
                      "failed"
                    )}`}
                  >
                    <FailedIcon />
                    Failed Only
                  </button>
                  <button
                    onClick={() => setFilterTable("passed")}
                    className={`flex items-center border border-black border-opacity-10 rounded-[10px] py-2 px-4 gap-1 font-medium h-[32px] ${getButtonClass(
                      filterTable,
                      "passed"
                    )}`}
                  >
                    <PassedIcon />
                    Skipped
                  </button>
                </div>

                <div>
                  <Input
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Search through failed records"
                    className="pl-10 border border-gray-300 rounded-[10px] py-2 px-3 h-[32px] w-[301px] focus:outline-none"
                  />
                </div>
              </div>
            )}

            {isDetails && (
              <table className="min-w-full bg-white mb-[36px] rounded-[10px]">
                <thead>
                  <tr className="rounded-tl-[10px] border">
                    <th className="py-2 px-4 border-b border-r text-[#6B7280] text-start font-medium text-xs rounded-tl-[10px]">
                      DB
                    </th>
                    <th className="py-2 px-4 border-b text-[#6B7280] text-start font-medium text-xs rounded-tr-[10px]">
                      QUERY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td className="py-2 px-4 border-b border-r flex items-center gap-1 text-[#3D3D3D] font-medium text-[13px]">
                      <SourceIcon /> Source Record
                    </td>
                    <td className="py-2 px-4 text-[#3D3D3D] font-medium text-[13px]">
                      {log.query_hash.source_data}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="py-2 px-4 border-r flex items-center gap-1 text-[#3D3D3D] font-medium text-[13px]">
                      <TargetIcon /> Target Record
                    </td>
                    <td className="py-2 px-4 text-[#3D3D3D] font-medium text-[13px]">
                      {log.query_hash.source_data}
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            {log.result_counter.fail > 0 && isDataCheck && (
              <div className="flex items-center gap-[20px] pb-[19px]">
                <div className="flex items-center">
                  <p className="text-[#333333] font-medium font text-sm">
                    Failure Columns:{" "}
                  </p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <p className="bg-[#FFE9E7] font-medium gap-1 border border-[#EDA69E] rounded-[10px] px-2 py-1 h-[23px] items-center flex text-[#7D3838]">
                    ID{" "}
                    <span className="text-[#7D383899] text-opacity-60">18</span>
                  </p>
                  <p className="bg-[#FFE9E7] font-medium gap-1 border border-[#EDA69E] rounded-[10px] px-2 py-1 h-[23px] items-center flex text-[#7D3838]">
                    user_id{" "}
                    <span className="text-[#7D383899] text-opacity-60">25</span>
                  </p>
                  <p className="bg-[#FFE9E7] font-medium gap-1 border border-[#EDA69E] rounded-[10px] px-2 py-1 h-[23px] items-center flex text-[#7D3838]">
                    access{" "}
                    <span className="text-[#7D383899] text-opacity-60">5</span>
                  </p>
                </div>
              </div>
            )}

            {isDataCheck && (
              <div className="overflow-x-auto">
                {filteredData.length > 0 ? (
                  <LogTable filteredData={filteredData} />
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-gray-500">No data found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
