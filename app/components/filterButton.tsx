import React, { useState } from "react";
import type { InputHTMLAttributes } from "react";
import {  RiFilter3Line } from "react-icons/ri";
interface filterButtonProps {
  fields: string;
  value: string;
  handleClick?: (e: InputHTMLAttributes<HTMLInputElement>) => void;
  className?: string;
}
const FilterButton = ({
  fields,
  value,
  handleClick = () => {},
}: filterButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          className="bg-white text-gray-800 font-medium py-2 px-4 rounded-lg focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
         <RiFilter3Line/>
        </button>
        {isOpen && (
          <div className="absolute bg-white-default text-gray-700 rounded shadow-lg text-sm">
            <ul className="list-reset">
              <li className="py-2 px-4 hover:bg-gray-200">Option 1</li>
              <li className="py-2 px-4 hover:bg-gray-200">Option 2</li>
              <li className="py-2 px-4 hover:bg-gray-200">Option 3</li>
            </ul>
          </div>
        )}
      </div>
    );
  };
export default FilterButton;
