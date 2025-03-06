import { PassedIcon } from "../assets/icons/PassedIcon";
import { FailedIcon } from "../assets/icons/FailedIcon";
import mock from "../../mock.json";
import { getButtonClass } from "../utils/buttonClass";
import { ArrowsIcon } from "../assets/icons/ArrowsIcon";

interface FilterButtonsProps {
  filter: string;
  onFilterChange: (newFilter: string) => void;
  onExpandAll: () => void;
}

export const FilterButtons = ({
  filter,
  onFilterChange,
  onExpandAll

}: FilterButtonsProps) => {


  return (
    <div className="flex justify-between items-center pb-4">
      <div className="flex items-center gap-[13px]">
        <button
          className={`flex items-center border border-black border-opacity-10 rounded-[10px] py-2 px-4 font-medium h-[32px] gap-1 ${getButtonClass(
            filter,
            "all"
          )}`}
          onClick={() => 
            onFilterChange("all")
          }
        >
          All Checks
          <span
            className={`${filter === "all" ? "text-white" : "text-[#8B8B8B]"}`}
          >
            {mock.logs.length}
          </span>
        </button>
        <button
          className={`flex items-center border border-black border-opacity-10 rounded-[10px] py-2 px-4 gap-1 font-medium h-[32px] ${getButtonClass(
            filter,
            "passed"
          )}`}
          onClick={() => onFilterChange("passed")}
        >
          <PassedIcon />
          Passed
          <span
            className={`${filter === "passed" ? "text-white" : "text-[#8B8B8B]"
              }`}
          >
            {mock.logs.filter((el) => el.result_counter.pass).length}
          </span>
        </button>
        <button
          className={`flex items-center border border-black border-opacity-10 rounded-[10px] py-2 px-4 gap-1 font-medium h-[32px] ${getButtonClass(
            filter,
            "fail"
          )}`}
          onClick={() => 
            onFilterChange("fail")
          }
        >
          <FailedIcon />
          All Failed
          <span
            className={`${filter === "fail" ? "text-white" : "text-[#8B8B8B]"}`}
          >
            {mock.logs.filter((el) => el.result_counter.fail).length}
          </span>
        </button>
           <button
          onClick={() => onFilterChange("failedCount")}
            className={`flex items-center border border-black border-opacity-10 rounded-[10px] py-2 px-4 gap-1 font-medium h-[32px] ${getButtonClass(
              filter,
              "failedCount"
            )}`}
          >
            Failed Count
            <span
              className={`${filter === "datacount" ? "text-white" : "text-[#8B8B8B]"}`}
            >
              {mock.logs.filter((el) => el.result_counter.fail).length}
            </span>
          </button>
          <button
              onClick={() => onFilterChange("failedData")}

            className={`flex items-center border border-black border-opacity-10 rounded-[10px] py-2 px-4 gap-1 font-medium h-[32px] ${getButtonClass(
              filter,
              "failedData"
            )}`}
          >
            Failed Data
            <span
              className={`${filter === "failedData" ? "text-white" : "text-[#8B8B8B]"}`}
            >
              {mock.logs.filter((el) => el.result_counter.fail).length}
            </span>
          </button>
      </div>
      <div className="flex items-center border border-[#000000] border-opacity-10 rounded-[10px] py-2 px-4">
        <button  onClick={onExpandAll} className="flex items-center gap-2 font-medium text-[14px] text-[#333333]">Expand All <ArrowsIcon /></button>
      </div>
    </div>
  );
};
