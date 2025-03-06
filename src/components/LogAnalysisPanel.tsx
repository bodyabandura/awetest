import { useState } from "react";
import mock from "../../mock.json";
import { FilterButtons } from "./FilterButtons";
import { LogsList } from "./LogsList";

export const LogAnalysisPanel = () => {
  const [filter, setFilter] = useState("all");
  const [expandedLogs, setExpandedLogs] = useState<Set<number>>(new Set());

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

  const toggleLog = (index: number) => {
    const newExpanded = new Set(expandedLogs);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedLogs(newExpanded);
  };

  const handleExpandAll = () => {
    if (expandedLogs.size === filteredLogs.length) {
      setExpandedLogs(new Set());
    } else {
      const allIndices = new Set(filteredLogs.map((_, index) => index));
      setExpandedLogs(allIndices);
    }
  };

  return (
    <div className="bg-white rounded shadow border p-4">
      <FilterButtons
        filter={filter}
        onFilterChange={handleFilterChange}
        onExpandAll={handleExpandAll}
      />
      {filteredLogs.map((el, index) => (
        <LogsList
          key={index}
          log={el}
          expanded={expandedLogs.has(index)}
          onToggle={() => toggleLog(index)}
        />
      ))}
    </div>
  );
};