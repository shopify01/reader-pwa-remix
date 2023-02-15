import React from "react";
import type { InputHTMLAttributes } from "react";
import { RiFilter3Line } from "react-icons/ri";
interface filterButtonProps {
  fields: string;
  value: string;
  handleClick?: (e: InputHTMLAttributes<HTMLInputElement>) => void;
  className?: string;
  open: boolean;
  setOpen: boolean;
}
const FilterButton = ({
  fields,
  value,
  handleClick = () => {},
  open,
  setOpen,
}: filterButtonProps) => {
  return (
    <div className="relative">
      <button
        className="bg-white text-gray-800 rounded-lg py-2 px-4 font-medium focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        <RiFilter3Line />
      </button>
      {open && (
        <div className="absolute right-0 w-[125px] rounded bg-white-default text-sm text-black-default shadow-lg">
          <ul className="list-reset">
            {fields.map((item) => {
              return (
                <li
                  key={item}
                  onClick={handleClick}
                  className="py-2 px-4 hover:bg-grey-light"
                >
                  {item.label}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
export default FilterButton;
