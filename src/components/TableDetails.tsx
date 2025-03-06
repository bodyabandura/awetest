import { SourceIcon } from "../assets/icons/SourceIcon";
import { TargetIcon } from "../assets/icons/TargetIcon"
type Props = {
    log: any;
}
export const TableDetails: React.FC<Props> = ({ log }) => {
    return (
        <table className="min-w-full bg-white mb-[36px] rounded-[10px]">
                <thead>
                  <tr className="rounded-tl-[10px] border">
                    <th className="py-2 px-4 border-b border-r text-[#6B7280] text-start font-medium text-xs rounded-tl-[10px]">
                      DB
                    </th>
                    <th className="py-2 px-4 border-b text-[#6B7280] text-start font-medium text-xs rounded-tr-[10px]">
                      QUERY
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border">
                    <td className="py-2 px-4 border-b border-r flex items-center gap-1 text-[#3D3D3D] font-medium text-[13px]">
                      <SourceIcon /> Source Record
                    </td>
                    <td className="py-2 px-4 text-[#3D3D3D] font-medium text-[13px]">
                      {log.query_hash.source_data}
                    </td>
                  </tr>
                  <tr className="border">
                    <td className="py-2 px-4 border-r flex items-center gap-1 text-[#3D3D3D] font-medium text-[13px]">
                      <TargetIcon /> Target Record
                    </td>
                    <td className="py-2 px-4 text-[#3D3D3D] font-medium text-[13px]">
                      {log.query_hash.source_data}
                    </td>
                  </tr>
                </tbody>
              </table>
    )
}