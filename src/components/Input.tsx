import { SearchIcon } from "../assets/icons/SearchIcon";
type Props = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
  className?: string;
};
export const Input: React.FC<Props> = ({
  onChange,
  value,
  placeholder,
  className,
}) => {
  return (
    <div className="relative w-full">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      <input
        onChange={onChange}
        value={value}
        type="text"
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};
