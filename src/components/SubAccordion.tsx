import React, { useState } from "react";
import { ArrowIcon } from "../assets/icons/ArrowIcon";
import { SearchIcon } from "../assets/icons/SearchIcon";
import { AccordionTable } from "./AccordionTable";

type Props = {
  toggleAccordion: (key: string) => void;
  openAccordions: { [key: string]: boolean };
  mock: any;
};

export const SubAccordion: React.FC<Props> = ({ toggleAccordion, openAccordions, mock }) => {
  const [activeButton, setActiveButton] = useState<"failed" | "all">("failed");
  const [searchTerm, setSearchTerm] = useState("");

  const handleButtonClick = (type: "failed" | "all") => {
    setActiveButton(type);
  };

  return (
    <div>
      {mock.logs[0].data_mismatch.slice(0, 6).map((item: any, index: number) => {
        const key = `subAccordion${index + 1}`;

        const regex = /"id"=>\"(\d+)\",.*?"user_id"=>\"(\d+)\",.*?"access"=>\"(\w+)\"/;
        const match = item.match(regex);

        const id = match ? match[1] : "N/A";
        const userId = match ? match[2] : "N/A";
        const access = match ? match[3] : "N/A";

        return (
          <div
            key={key}
            className="mt-2 border border-gray-300 rounded-lg shadow-sm py-[20px] px-[20px] bg-[#FCFCFC]"
          >
            <button
              className="flex items-center justify-between w-full text-sm font-medium text-left text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={() => toggleAccordion(key)}
            >
              <div className="flex items-center justify-between gap-1">
                <ArrowIcon isOpen={openAccordions[key]} />
                <p>
                  Record check failed for{" "}
                  <span className="bg-gray-200 rounded-lg py-1 px-2">INDEX {index + 1}</span> for:{" "}
                  <span className="bg-red-200 text-red-700 rounded-lg py-1 px-2 ml-2">ID</span>
                  <span className="bg-red-200 text-red-700 rounded-lg py-1 px-2 ml-2">USER_ID</span>
                  <span className="bg-red-200 text-red-700 rounded-lg py-1 px-2 ml-2">ACCESS</span>
                </p>
              </div>
              {openAccordions[key] && (
              <div className="flex mt-4 relative">
                <SearchIcon className="absolute top-[30%] left-1"/>
                <input
                  type="text"
                  placeholder="Search through failed records"
                  className="border border-gray-300 rounded-lg py-2 px-6 w-[301px]"
                  value={searchTerm}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
                <div className="flex ml-4">
                  <button
                    className={`py-2 px-4 text-gray-700 border border-gray-300 rounded-l-lg focus:outline-none ${activeButton === "failed" ? "bg-white" : "bg-gray-100"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleButtonClick("failed");
                    }}
                  >
                    Show Failed Only
                  </button>
                  <button
                    className={`py-2 px-4 text-gray-700 border border-gray-300 rounded-r-lg focus:outline-none ${activeButton === "all" ? "bg-white" : "bg-gray-100"}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleButtonClick("all");
                    }}
                  >
                    Show All
                  </button>
                </div>
              </div>
            )}
            </button>
         
            {openAccordions[key] && (
              <AccordionTable id={id} userId={userId} access={access} />
            )}
          </div>
        );
      })}
    </div>
  );
};
