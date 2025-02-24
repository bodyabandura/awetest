import { SourceIcon } from "../assets/icons/SourceIcon";
import { TargetIcon } from "../assets/icons/TargetIcon";

type Props = {
  id: string;
  userId: string;
  access: string;
};

export const AccordionTable: React.FC<Props> = ({ id, userId, access }) => {
  return (
    <div className="mt-2 text-sm text-gray-600 p-2 bg-gray-50 rounded-b-lg">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">DB</th>
            <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">USER_ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">ACCESS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 flex gap-1"><SourceIcon /> Source Record</td>
            <td className="border border-gray-300 px-4 py-2">{id}</td>
            <td className="border border-gray-300 px-4 py-2">{userId}</td>
            <td className="border border-gray-300 px-4 py-2">{access}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 flex gap-1"><TargetIcon /> Target Record</td>
            <td className="border border-gray-300 px-4 py-2">{id}</td>
            <td className="border border-gray-300 px-4 py-2">{userId}</td>
            <td className="border border-gray-300 px-4 py-2">{access}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};