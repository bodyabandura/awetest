import { SourceIcon } from "../assets/icons/SourceIcon";
import { TargetIcon } from "../assets/icons/TargetIcon";
import mock from "../../mock.json";

const cards = [
  {
    title: "SOURCE DATABASE",
    value: mock.logs[0].query_hash.source_data,
    icon: <SourceIcon />,
  },
  {
    title: "SOURCE ENVIRONMENT",
    value: "EnvironmentName1",
    icon: <SourceIcon />,
  },
  {
    title: "TARGET DATABASE",
    value: mock.logs[0].query_hash.target_data,
    icon: <TargetIcon />,
  },
  {
    title: "TARGET ENVIRONMENT",
    value: "EnvironmentName1",
    icon: <TargetIcon />,
  },
];
export const DetailCards = () => {
  return (
    <div className="flex items-center gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-2 w-[232px] py-[16px] px-[20px] max-h-[85px] overflow-hidden"
        >
          <h3 className="flex gap-2 items-center text-[#888888] font-normal mb-[8px] text-[12px]">
            {card.title}
          </h3>
          <p className="flex items-center text-[#333333] text-[14px] font-medium break-words overflow-hidden">
            {/* Limit the icon size */}
            <span className="w-[16px] h-[16px] mr-2">{card.icon}</span>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap">
              {card.value}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
};
