import { Record } from "../types/Record";

const tableHeaders = [
  { title: "INDEX", key: "id" },
  { title: "DB", key: "db" },
  { title: "ID", key: "id" },
  { title: "USER_ID", key: "user_id" },
  { title: "NAME", key: "name" },
  { title: "ACCESS", key: "access" },
  { title: "WEBSITE", key: "website" },
];
type Props = {
  filteredData: Record[];
};
export const LogTable: React.FC<Props> = ({ filteredData }) => {
  return (
    <table className="min-w-full bg-white mb-[36px]">
      <thead>
        <tr className="rounded-tl-[10px] border">
          {tableHeaders.map((header, index) => (
            <th
              key={index}
              className={`py-2 px-4 border-b border-r text-[#6B7280] text-start font-medium text-xs ${
                index === 0 ? "rounded-tl-[10px]" : ""
              } ${
                index === tableHeaders.length - 1 ? "rounded-tr-[10px]" : ""
              }`}
            >
              {header.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredData.map((record) => (
          <tr key={record.id} className="border">
            {tableHeaders.map((header, index) => (
              <td
                key={index}
                className={`py-2 px-4 border-b ${
                  index !== tableHeaders.length - 1 ? "border-r" : ""
                }`}
              >
                {record[header.key as keyof Record]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
