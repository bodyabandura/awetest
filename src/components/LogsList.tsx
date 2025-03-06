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

import { parseDataMismatch } from "../utils/parseData";
import { LogTable } from "./LogTable";
import { RightArrowIcon } from "../assets/icons/RightArrowIcon";
import { DataCheckResult } from "../types/dataCheckResult";
import { TableDetails } from "./TableDetails";

interface LogsListProps {
  log: DataCheckResult;
  expanded: boolean;
  onToggle: () => void;
}

export const LogsList = ({ log, expanded, onToggle  }: LogsListProps) => {
  const { data_mismatch } = log;
  const [filterTable, setFilterTable] = useState("all");
  const [searchValue, setSearchValue] = useState("");
  const [changeTable, setChangeTable] = useState<"dataCheck" | "details">("dataCheck")
  const [value, setValue] = useState("");
  const [openInfoFails, setOpenInfoFails] = useState(true);
  const parsedData = data_mismatch ? parseDataMismatch(data_mismatch) : [];
  const [filteredColumnData, setFilteredColumnData] = useState<any[]>(parsedData);
  const [selectedColumn, setSelectedColumn] = useState<
    "id" | "user_id" | "name" | "website" | null
  >(null);


  const handleChangeButton = (buttonType: "dataCheck" | "details") => {
    if (buttonType === "dataCheck") {
      setChangeTable('dataCheck')
    } else {
      setChangeTable('details')
    }
  };

  const filteredData = parsedData.filter((record: any) => {
    const name =
      record.sourceRecord[0]?.name || "" || record.targetRecord[0]?.name || "";
    const id =
      record.sourceRecord[0]?.id || "" || record.targetRecord[0]?.id || "";
    const userId =
      record.sourceRecord[0]?.user_id ||
      "" ||
      record.targetRecord[0]?.user_id ||
      "";
    const website =
      record.sourceRecord[0]?.website ||
      "" ||
      record.targetRecord[0]?.website ||
      "";
    const access =
      record.sourceRecord[0]?.access ||
      "" ||
      record.targetRecord[0]?.access ||
      "";
  
    const matchesSearch = (
      name.toLowerCase().includes(searchValue.toLowerCase()) ||
      id.toLowerCase().includes(searchValue.toLowerCase()) ||
      userId.toLowerCase().includes(searchValue.toLowerCase()) ||
      website.toLowerCase().includes(searchValue.toLowerCase()) ||
      access.toLowerCase().includes(searchValue.toLowerCase())
    );
  
    if (selectedColumn) {
      const sourceVal = record.sourceRecord?.[0]?.[selectedColumn];
      const targetVal = record.targetRecord?.[0]?.[selectedColumn];
      return sourceVal !== targetVal && matchesSearch;
    }
  
    return matchesSearch;
  });

  useEffect(() => {
    const filtered = parsedData.filter((record: any) => {
      const matchesSearch = (
        (record.sourceRecord[0]?.name || "").toLowerCase().includes(searchValue.toLowerCase()) ||
        (record.sourceRecord[0]?.id || "").toLowerCase().includes(searchValue.toLowerCase()) ||
        (record.sourceRecord[0]?.user_id || "").toLowerCase().includes(searchValue.toLowerCase()) ||
        (record.sourceRecord[0]?.website || "").toLowerCase().includes(searchValue.toLowerCase()) ||
        (record.sourceRecord[0]?.access || "").toLowerCase().includes(searchValue.toLowerCase())
      );
  
      if (selectedColumn) {
        const sourceVal = record.sourceRecord?.[0]?.[selectedColumn];
        const targetVal = record.targetRecord?.[0]?.[selectedColumn];
        return sourceVal !== targetVal && matchesSearch;
      }
  
      return matchesSearch;
    });
  
    setFilteredColumnData(filtered);
  }, [searchValue, selectedColumn]);

  const handleSearchChange = debounce((searchTerm: string) => {
    setSearchValue(searchTerm);
  }, 1000);

  useEffect(() => {
    handleSearchChange(value);
  }, [value]);

  const handleColumnClick = (column: "id" | "user_id" | "name" | "website") => {
    setSelectedColumn((prevColumn) => {
      if (prevColumn === column) {
        setFilteredColumnData(parsedData);
        return null;
      }
  
      const filtered = parsedData.filter((el) => {
        const sourceVal = el.sourceRecord?.[0]?.[column];
        const targetVal = el.targetRecord?.[0]?.[column];
        const matchesSearch = (
          (el.sourceRecord[0]?.name || "").toLowerCase().includes(searchValue.toLowerCase()) ||
          (el.sourceRecord[0]?.id || "").toLowerCase().includes(searchValue.toLowerCase()) ||
          (el.sourceRecord[0]?.user_id || "").toLowerCase().includes(searchValue.toLowerCase()) ||
          (el.sourceRecord[0]?.website || "").toLowerCase().includes(searchValue.toLowerCase()) ||
          (el.sourceRecord[0]?.access || "").toLowerCase().includes(searchValue.toLowerCase())
        );
  
        return sourceVal !== targetVal && matchesSearch;
      });
  
      setFilteredColumnData(filtered);
      return column;
    });
  };
  return (
    <div className={`${expanded ? "bg-white" : 'bg-gray'}`}>
      <Accordion
      className="py-2  border-b border-black border-opacity-10"
      sx={{ boxShadow: "none" }}
      expanded={expanded}
      onChange={onToggle}
    >
      <AccordionSummary
        className={`w-full gap-2 ${expanded ? "bg-light-blue" : "bg-transparent"}`}
        expandIcon={expanded ? <ArrowIcon /> : <RightArrowIcon />}
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
        <div className="flex items-center ">
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
              {log.result_counter.pass === 0 && (
                <button
                className={`text-[13px] ${
                  changeTable === 'dataCheck'
                    ? "text-[#05AEEE] border-b border-b-[#05AEEE]"
                    : "text-[#929292]"
                }`}
                onClick={() => handleChangeButton("dataCheck")}
              >
                Data Check
              </button>
              )}
              <button
                className={`text-[13px] ${
                  changeTable === 'details' ? "text-[#05AEEE] border-b border-b-[#05AEEE]" : "text-[#929292]"
                }`}
                onClick={() => handleChangeButton("details")}
              >
                Details
              </button>
            </div>

            {changeTable === "dataCheck" && (
              <>

                <div className="flex items-center justify-between py-[23px]">
                 <div className="flex gap-[40px] items-center">
                 {log.result_counter.fail > 0 &&
                    openInfoFails && (
                      <div className="flex items-center gap-[20px]">
                        <div className="flex items-center">
                          <p className="text-[#333333] font-medium font text-sm">
                            Failure Columns:{" "}
                          </p>
                        </div>
                        <div className="flex items-center gap-[10px]">
                          <button
                            className="bg-[#EDA69E] font-medium gap-1  text-[12px]  rounded-[10px] px-2 py-1 h-[23px] items-center flex text-[#ffffff]"
                            onClick={() => handleColumnClick("id")}
                          >
                            ID{" "}
                            <span className="text-[#7D383899] text-opacity-60">
                              {
                                filteredData.filter(
                                  (el) =>
                                    el.sourceRecord[0].id -
                                    el.targetRecord[0].id
                                ).length
                              }
                            </span>
                          </button>
                          <button
                            className="bg-[#EDA69E] font-medium gap-1 text-[12px]  rounded-[10px] px-2 py-1 h-[23px] items-center flex text-[#ffffff]"
                            onClick={() => handleColumnClick("user_id")}
                          >
                            user_id{" "}
                            <span className="text-[#7D383899] text-opacity-60">
                              {
                                filteredData.filter(
                                  (el) =>
                                    el.sourceRecord[0].user_id -
                                    el.targetRecord[0].user_id
                                ).length
                              }
                            </span>
                          </button>
                          <button
                            className="bg-[#EDA69E] font-medium gap-1 text-[12px]  border border-[#EDA69E] rounded-[10px] px-2 py-1 h-[23px] items-center flex text-[#ffffff]"
                            onClick={() => handleColumnClick("name")}
                          >
                            name{" "}
                            <span className="text-[#7D383899] text-opacity-60">
                              {
                                filteredData.filter(
                                  (el) =>
                                    el.sourceRecord[0].name -
                                    el.targetRecord[0].name
                                ).length
                              }
                            </span>
                          </button>
                          <button
                            className="bg-[#EDA69E] font-medium text-[12px] gap-1 border rounded-[10px] px-2 py-1 h-[23px] 
                                  items-center flex text-[#ffffff]"
                            onClick={() => handleColumnClick("website")}
                          >
                            website{" "}
                            <span className="text-[#7D383899] text-opacity-60">
                              {
                                filteredData.filter(
                                  (el) =>
                                    el.sourceRecord[0].website -
                                    el.targetRecord[0].website
                                ).length
                              }
                            </span>
                          </button>
                        </div>
                      </div>
                    )}

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setOpenInfoFails(true)}
                      className=" font-medium text-sm text-[#333333] transition-all duration-200 border-b border-[#333333]"
                    >
                      All
                    </button>
                    <span>/</span>
                    <button
                      onClick={() => {
                        setOpenInfoFails(false), setSelectedColumn(null);
                      }}
                      className="font-medium text-sm text-[#333333] transition-all duration-200 border-b border-[#333333]"
                    >
                      None
                    </button>
                  </div>
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
              </>
            )}

            {changeTable === 'details' && (
              <TableDetails log={log}/>
            )}

            {changeTable === 'dataCheck' &&  (
              <div className="overflow-x-auto">
                {filteredColumnData.length > 0 ? (
  <LogTable
    filteredData={filteredColumnData}
    selectedColumn={selectedColumn}
  />
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
    </div>
  );
};
