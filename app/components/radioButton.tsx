import React from "react";
interface radioProps {
  label: string;
  className?: string;
}
const RadioButton = ({ label, className }: radioProps) => {
  return (
    <div className="flex">
      <div className="form-check">
          <input
            className="form-check-input mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border-[2px] border-orange-dark bg-white-default bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-orange-dark checked:bg-orange-dark"
            type="radio"
            name="flexRadioDefault"
          />
          <label className="form-check-label inline-block text-black-default">
            {label}
          </label>
      </div>
    </div>
  );
};

export default RadioButton;
