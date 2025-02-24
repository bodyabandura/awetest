import React, { useEffect, useRef, useState } from 'react';
import { CalendarIcon } from '../assets/icons/CalendarIcon';
import mock from '../../mock.json';
import { DataCards } from '../components/DataCards';
import TestCaseInfo from '../components/TestCaseInfo';
import { AdditionalDetails } from '../components/AditionalDetails';

const DataReport = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2025-01-08');
  const [currentTime, setCurrentTime] = useState('');
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
      setCurrentTime(formattedTime);
    }, 60000);

    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    setCurrentTime(formattedTime);

    return () => clearInterval(interval);
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleCalendarIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.click();
    }
  };

  return (
    <div className="p-4 w-[1684px]">
      <div className='shadow p-6 bg-white rounded-lg mb-2'>
        <h2 className="text-xl font-bold mb-4">Data Report</h2>
        <div className='flex justify-between'>
          <div className='flex mb-2'>
            <p className="mr-4">Job ID: {mock.summary.test_job_id}</p>
            <p>Run ID: {mock.summary.test_run_id}</p>
          </div>
          <div className="flex items-center border rounded p-1 max-w-[233px] h-[30px]">
            <span className="mr-2 cursor-pointer" onClick={handleCalendarIconClick}>
              <CalendarIcon />
            </span>
            <label htmlFor="date-picker" className="mr-2">Date:</label>
            <input
              ref={dateInputRef}
              type="date"
              id="date-picker"
              value={selectedDate}
              onChange={handleDateChange}
              className="focus:outline-none text-xs w-[80px]"
            />
            <p className='flex text-xs'>@{currentTime}</p>
          </div>
        </div>
      </div>
      <div className='w-full mb-[6px]'>
        <DataCards />
      </div>
      {mock.logs[0].result_counter.fail > 0 && (
      <TestCaseInfo />
      )}
      <AdditionalDetails />
    </div>
  );
};

export default DataReport;
