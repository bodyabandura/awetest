import React from 'react';
import { SourceIcon } from '../assets/icons/SourceIcon';
import { TargetIcon } from '../assets/icons/TargetIcon';
import { TablesCheckedIcon } from '../assets/icons/TablesCheckedIcon';
import { RecordCheckedIcon } from '../assets/icons/RecordsChecked';
import { TotalTimeIcon } from '../assets/icons/TotalTimeIcon';
import { PassedIcon } from '../assets/icons/PassedIcon';
import { FailedIcon } from '../assets/icons/FailedIcon';
import mock from '../../mock.json';

const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
};

export const DataCards: React.FC = () => {
  const jobStartTime = new Date(mock.summary.job_start_time).getTime();
  const jobEndTime = new Date(mock.summary.job_end_time).getTime();
  const totalTime = formatTime(jobEndTime - jobStartTime);

  const cards = [
    {
      title: 'Source Database',
      value: mock.logs[0].query_hash.source_data,
      icon: <SourceIcon />,
    },
    {
      title: 'Target Database',
      value: mock.logs[0].query_hash.target_data,
      icon: <TargetIcon />,
    },
    {
      title: 'Tables Checked',
      value: '1',
      icon: <TablesCheckedIcon />,
    },
    {
      title: 'Records Checked',
      value: mock.logs[0].source_data_count,
      icon: <RecordCheckedIcon />,
    },
    {
      title: 'Total Time',
      value: totalTime,
      icon: <TotalTimeIcon />,
    },
    {
      title: 'Passed',
      value: mock.logs[0].result_counter.pass,
      icon: <PassedIcon />,
    },
    {
      title: 'Failed',
      value: mock.logs[0].result_counter.fail,
      icon: <FailedIcon />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-1">
      {cards.map((card, index) => (
        <div
          key={index}
          className="p-2 bg-white rounded shadow w-[232px] py-[16px] px-[20px] max-h-[85px] overflow-hidden"
        >
          <h3 className="flex text-[13px] gap-2 items-center font-semibold text-[#475059] mb-[8px]">
            {card.icon} {card.title}
          </h3>
          <p className="flex items-center text-[#475059BF] text-[13px] break-words overflow-hidden">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DataCards;
