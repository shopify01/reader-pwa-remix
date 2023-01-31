import type { InputHTMLAttributes } from "react";
import { useState } from "react";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
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
  const [passwordType, setpasswordType] = useState(inputType);
  const [icon, setIcon] = useState(<AiFillEyeInvisible />);
  
  const handleToggle = () => {
    if (passwordType === 'password') {
      setIcon(<AiFillEye/>)
      setpasswordType('text')
    } else {
      setIcon(<AiFillEyeInvisible/>)
      setpasswordType('password')
    }
  }
  return (
    <div className="mb-3">
      <label className="text-gray">{label}</label>
      <div className="relative flex justify-evenly">
        <input
          type={passwordType}         
          name={name}
          placeholder={placeholder}
          className="form-control  text-gray bg-white focus:text-gray focus:bg-white mt-5 block w-full border-b-[1px] border-orange-dark bg-clip-padding px-3 py-1.5 pl-0 text-base font-normal transition ease-in-out focus:outline-none"
          value={value}
          onChange={onChange}
        />
        {inputType === "password" ? (
          <div className="absolute right-0 top-7">
            <span onClick={handleToggle} className="text-orange-dark">
               {icon}
            </span>
          </div>
        ) : null}
      </div>
      {error && <p className="font-normal text-red-default">{error}</p>}
    </div>
  );
};

export default Input;
