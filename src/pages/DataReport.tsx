import React from "react";
import mock from "../../mock.json";
import TestCaseInfo from "../components/TestCaseInfo";
import { DataReportHeader } from "../components/DataReportHeader";
import DataCards from "../components/DataCards";

const DataReport: React.FC = () => {
  return (
    <div className="p-4 w-[1684px]">
      <DataReportHeader type="report" />
      <div className="w-full mb-[6px]">
        <DataCards type="report" />
      </div>
      {mock.logs[2].result_counter.fail > 0 ? (
        <TestCaseInfo text="Failed" bg="bg-red-400" />
      ) : mock.logs[2].result_counter.pass > 0 ? (
        <TestCaseInfo text="Passed" bg="bg-[#26C080]" />
      ) : null}
    </div>
  );
};

export default DataReport;
