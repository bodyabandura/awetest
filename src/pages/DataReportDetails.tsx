import { DataReportHeader } from "../components/DataReportHeader";
import { LogAnalysisPanel } from "../components/LogAnalysisPanel";
import { ProgressCards } from "../components/ProgressCards";

const DataReportDetails = () => {
  return (
    <div className="p-4">
      <DataReportHeader
        type="details"
        className="flex justify-between items-center"
      />
      <ProgressCards />
      <LogAnalysisPanel />
    </div>
  );
};

export default DataReportDetails;
