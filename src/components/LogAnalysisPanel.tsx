import { useState } from "react";
import mock from "../../mock.json";
import { FilterButtons } from "./FilterButtons";
import { LogsList } from "./LogsList";

export const LogAnalysisPanel = () => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };
  
  const filteredLogs = mock.logs.filter((el) => {
    switch (filter) {
      case "passed":
        return el.result_counter.pass;
      case "fail":
        return el.result_counter.fail;
      case "failedCount":
        return el.source_data_count - el.target_data_count;
      case "failedData":
        return el.source_data_count - el.target_data_count;
      default:
        return true;
    }
  });

  return (
    <div className="bg-white rounded shadow border p-4">
      <FilterButtons filter={filter} onFilterChange={handleFilterChange} />
      {filteredLogs.map((el, index) => (
        <LogsList key={index} log={el} />
      ))}
    </div>
  );
};
