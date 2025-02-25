import mock from "../../mock.json";
import { SuccessCircleIcon } from "../assets/icons/SuccessCircle";
import { FailedCircleIcon } from "../assets/icons/FailedCircleIcon";
import { TablesCheckedIcon } from "../assets/icons/TablesCheckedIcon";
import { RecordCheckedIcon } from "../assets/icons/RecordsChecked";
export const ProgressCards = () => {
  const passedCount = mock.logs[2].result_counter.pass;
  const failedCount = mock.logs[2].result_counter.fail;
  const totalTests = passedCount + failedCount;
  const passPercentage = (passedCount / totalTests) * 100;
  const failPercentage = (failedCount / totalTests) * 100;

  return (
    <div className="flex gap-6 pb-2">
      <div className="p-5 w-[550px] rounded border shadow bg-white ">
        <h2 className="flex items-center gap-2 text-[12px] text-[#888888] font-normal pb-4">
          <TablesCheckedIcon />
          TABLES CHECKED
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-2xl">{mock.logs[2].source_data_count}</p>
          <div className="flex items-center">
            <p className="text-[#1BA34A] flex items-center gap-2 font-medium text-[13px]">
              <SuccessCircleIcon /> {passedCount} Passed
            </p>
            <p className="text-[#E55D5D] ml-2 flex items-center gap-2 font-medium text-[13px]">
              <FailedCircleIcon />
              {failedCount} Failed
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-300 h-2 mt-2 relative">
          <div
            className="bg-[#69CD91] h-full absolute rounded-[2px]"
            style={{ width: `${passPercentage}%` }}
          />
          <div
            className="bg-[#F36653] h-full absolute"
            style={{ width: `${failPercentage}%`, left: `${passPercentage}%` }}
          />
        </div>
      </div>
      <div className="p-5 w-[550px] rounded border border-[#E9ECF2] shadow bg-white">
        <h2 className="flex items-center gap-2 text-[12px] text-[#888888] font-normal  pb-4">
          TESTS
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-2xl">{mock.logs[2].source_data_count}</p>
          <div className="flex items-center">
            <p className="text-[#1BA34A] flex items-center gap-2 font-medium text-[13px]">
              <SuccessCircleIcon /> {passedCount} Passed
            </p>
            <p className="text-[#E55D5D] ml-2 flex items-center gap-2 font-medium text-[13px]">
              <FailedCircleIcon />
              {failedCount} Failed
            </p>
          </div>
        </div>
        <div className="w-full h-2 mt-2 relative">
          <div
            className="bg-[#69CD91] h-full absolute rounded-[2px]"
            style={{ width: `${passPercentage}%` }}
          />
          <div
            className="bg-[#F36653] h-full absolute"
            style={{ width: `${failPercentage}%`, left: `${passPercentage}%` }}
          />
        </div>
      </div>
      <div className="p-5 w-[550px] rounded border border-[#E9ECF2] shadow bg-white">
        <h2 className="flex items-center gap-2 text-[12px] text-[#888888] font-normal pb-4">
          <RecordCheckedIcon />
          RANDOM RECORD CHECK
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-2xl">{mock.logs[2].source_data_count}</p>
          <div className="flex items-center">
            <p className="text-[#1BA34A] flex items-center gap-2 font-medium text-[13px]">
              <SuccessCircleIcon /> {passedCount} Passed
            </p>
            <p className="text-[#E55D5D] ml-2 flex items-center gap-2 font-medium text-[13px]">
              <FailedCircleIcon />
              {failedCount} Failed
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-300 h-2 mt-2 relative">
          <div
            className="bg-[#69CD91] h-full absolute rounded-[2px]"
            style={{ width: `${passPercentage}%` }}
          />
          <div
            className="bg-[#F36653] h-full absolute"
            style={{ width: `${failPercentage}%`, left: `${passPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
