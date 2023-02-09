import type { InputHTMLAttributes } from "react";
import { RiSearchLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
interface searchbarProps {
  handleChange?: (e: InputHTMLAttributes<HTMLInputElement>) => void;
  handleRemove?: (e: InputHTMLAttributes<HTMLInputElement>) => void;
  value?: string | undefined;
}
const SearchBar = ({
  value,
  handleChange,
  handleRemove = () => {},
}: searchbarProps) => {
  return (
    <div className="flex h-[45px] items-center rounded-full border-[1px] border-orange-default p-4 text-xl">
      <RiSearchLine />
      <input
        className="ml-3 h-[30px] focus:outline-none w-full sm:w-auto"
        value={value}
        onChange={handleChange}
      />
      <RxCross2 className="ml-2" onClick={handleRemove} />
    </div>
  );
};

export default SearchBar;
