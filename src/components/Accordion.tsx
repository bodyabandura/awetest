import { useNavigate } from "react-router-dom";
import { ArrowIcon } from "../assets/icons/ArrowIcon";

type Props = {
  openAccordions: { [key: string]: boolean };
  toggleAccordion: (key: string) => void;
  mock?: any;
  bg: string;
  text: string;
};

export const Accordion: React.FC<Props> = ({
  openAccordions,
  mock,
  bg,
  text,
}) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/dataDetails");
  };

  return (
    <div className="mt-4 border-t border-gray-200">
      <button
        className="flex mb-[20px] items-center justify-between w-full py-2 text-sm font-medium text-left text-gray-700 hover:text-gray-900 focus:outline-none"
        onClick={() => handleRedirect()}
      >
        <div className="flex items-center">
          <span
            className={`${bg} mr-2 rounded-lg text-[12px] text-white py-[2px] px-[7px]`}
          >
            {text}
          </span>
          <p>Record Count Check</p>
        </div>
        <ArrowIcon isOpen={openAccordions["accordion1"]} />
      </button>
      {openAccordions["accordion1"] && (
        <div className="mt-2 text-sm text-gray-600 min-h-[100px]">
          <p>Didn't find any data</p>
        </div>
      )}
      <div className="border-b border-gray-200"></div>

      <button
        className="flex items-center justify-between w-full py-2 text-sm font-medium text-left text-gray-700 hover:text-gray-900 focus:outline-none"
        onClick={() => handleRedirect()}
      >
        <div className="flex items-center">
          <span
            className={`${bg} mr-2 rounded-lg text-[12px] text-white py-[2px] px-[7px]`}
          >
            {text} {mock.logs[0].source_data_count}
          </span>

          <p>Record Count Check</p>
        </div>
        <ArrowIcon isOpen={openAccordions["accordion2"]} />
      </button>
      {/* {openAccordions["accordion2"] && (
        <div className="mt-2 text-sm text-gray-600">
          <SubAccordion toggleAccordion={toggleAccordion} openAccordions={openAccordions} mock={mock}/>
        </div>
      )} */}
    </div>
  );
};
