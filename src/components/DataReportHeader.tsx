import React, { useEffect, useRef, useState } from "react";
import mock from "../../mock.json";
import { CalendarIcon } from "../assets/icons/CalendarIcon";
import { getFormattedTime } from "../utils/timeHelper";
import { formatTime } from "../utils/formatTimeHelpers";
import { TotalTimeIcon } from "../assets/icons/TotalTimeIcon";
import DataCards from "./DataCards";

type Props = {
  type?: string;
  className?: string;
  col?: string;
};

export const DataReportHeader: React.FC<Props> = ({
  type = "report",
  className,
  col,
}) => {
  const [selectedDate, setSelectedDate] = useState<string>("2025-01-08");
  const [currentTime, setCurrentTime] = useState("");
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const jobStartTime = new Date(mock.summary.job_start_time).getTime();
  const jobEndTime = new Date(mock.summary.job_end_time).getTime();
  const totalTime = formatTime(jobEndTime - jobStartTime);

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(getFormattedTime());

    updateCurrentTime();
    const interval = setInterval(updateCurrentTime, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleCalendarIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <div className={`${col} shadow p-6 bg-white rounded-lg mb-2`}>
      <div className={`${className}`}>
        <h2 className="text-xl font-bold mb-4">Data Report</h2>
        <div className="flex justify-between items-center gap-4">
          {type === "details" && (
            <p className="flex items-center text-[#888888] text-[12px] gap-1">
              <TotalTimeIcon />
              TOTAL TIME
              <span className="text-[#333333] font-semibold text-[13px]">
                {totalTime}
              </span>
            </p>
          )}
          <div className="flex">
            <p className="mr-4 text-[#888888] text-[12px]">
              Job ID:{" "}
              <span className="text-[#333333] font-semibold text-[13px]">
                {mock.summary.test_job_id}
              </span>
            </p>
            <p className="mr-4 text-[#888888] text-[12px]">
              Run ID:{" "}
              <span className="text-[#333333] font-semibold text-[13px]">
                {mock.summary.test_run_id}
              </span>
            </p>
          </div>

          <div className="flex items-center border rounded p-1 max-w-[233px] h-[30px]">
            <span
              className="mr-2 cursor-pointer"
              onClick={handleCalendarIconClick}
            >
              <CalendarIcon />
            </span>
            <label htmlFor="date-picker" className="mr-2">
              Date:
            </label>
            <input
              ref={dateInputRef}
              type="date"
              id="date-picker"
              value={selectedDate}
              onChange={handleDateChange}
              className="focus:outline-none text-xs w-[80px]"
            />
            <p className="flex text-xs">@{currentTime}</p>
          </div>
        </div>
      </div>
      {type === "details" && <DataCards type="details" />}
    </div>
  );
};
