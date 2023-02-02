import React from "react";
import type { InputHTMLAttributes } from "react";
interface radioProps {
  label: string;
  value: string;
  handleClick?: (e: InputHTMLAttributes<HTMLInputElement>) => void;
  className?: string;
}
const RadioButton = ({
  label,
  value,
  className,
  handleClick = () => {},
}: radioProps) => {
  return (
    <>
      <div className="form-check mb-6 flex-col items-center">
        <input
          className="form-check-input mt-2 mr-4 h-4 w-4 cursor-pointer appearance-none rounded-full border-[2px] border-orange-dark bg-white-default bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-orange-dark checked:bg-orange-dark"
          type="radio"
          name="flexRadioDefault"
          value={value}
          onClick={handleClick}
        />
        <label className="form-check-label inline-block text-xl text-black-default">
          {label}
        </label>
      </div>
      <div className="mb-5 border-[1px] border-solid border-black-light opacity-[.15]" />
    </>
  );
};
export default RadioButton;