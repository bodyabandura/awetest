import React, { useState } from "react";
import mock from "../../mock.json";
import { Accordion } from "./Accordion";

const TestCaseInfo: React.FC = () => {
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    accordion1: false,
    accordion2: false,
    subAccordion1: false,
    subAccordion2: false,
    subAccordion3: false,
    subAccordion4: false,
    subAccordion5: false,
    subAccordion6: false,
  });

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg">Test Results</h3>
      <div className="mt-2">
        <p className="text-[#666666] text-[12px]">
          Test Case Name: {mock.logs[0].test_case_name}
        </p>
      </div>

      <Accordion openAccordions={openAccordions} toggleAccordion={toggleAccordion} mock={mock} />
    </div>
  );
};

export default TestCaseInfo;
