import type { InputHTMLAttributes } from "react";
import { RiSearchLine } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
interface searchbarProps {
  onChange?: (e: InputHTMLAttributes<HTMLInputElement>) => void;
  value?: string | undefined;
}
const SearchBar = ({
  value,
  onChange,
}: searchbarProps) => {
 
  return (
    <div className="mb-3">
      <label className="text-gray">{label}</label>
      <div className="relative flex justify-evenly">
        <input
          placeholder={<RiSearchLine/>}
          className="form-control  text-gray bg-white focus:text-gray focus:bg-white mt-5 block w-full border-b-[1px] border-orange-dark bg-clip-padding px-3 py-1.5 pl-0 text-base font-normal transition ease-in-out focus:outline-none"
          value={value}
          onChange={onChange}
        />
        <RxCross2/>
      </div>
    </div>
  );
};

export default SearchBar;
