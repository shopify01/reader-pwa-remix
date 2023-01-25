import React from "react";
interface checkboxProps {
  label: string;
  value: string;
  className?: string;
}
const Checkbox = ({ label, value, className }: checkboxProps) => {
  return (
    <div className="flex">
      <div className="form-check">
        <input
          id="bordered-checkbox-1"
          type="checkbox"
          name="bordered-checkbox"
          className="mr-2 h-4 w-4 rounded border-orange-dark bg-orange-dark text-orange-dark focus:ring-2 focus:ring-orange-dark dark:border-orange-dark dark:bg-orange-dark dark:ring-offset-orange-dark dark:focus:ring-orange-dark"
        />
        <label className="form-check-label inline-block text-black-default">
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
