import type { InputHTMLAttributes } from "react";

interface inputProps {
  onChange?: (e: InputHTMLAttributes<HTMLInputElement>) => void;
  name?: string;
  value?: string | undefined;
  label?: string;
  inputType?: string;
  placeholder?: string;
  error?: string;
}
const Input = ({
  label,
  inputType,
  placeholder,
  value,
  name,
  onChange,
  error,
}: inputProps) => {
  return (
    <div className="mb-3">
      <label className="text-gray">{label}</label>
      <input
        type={inputType}
        id="floatingInput"
        name={name}
        placeholder={placeholder}
        className="form-control  text-gray bg-white focus:text-gray focus:bg-white mt-5 block w-full border-b-[1px] border-orange-dark bg-clip-padding px-3 py-1.5 pl-0 text-base font-normal transition ease-in-out focus:outline-none"
        value={value}
        onChange={onChange}
      />
      {error && <p className="font-normal text-red-default">{error}</p>}
    </div>
  );
};

export default Input;
