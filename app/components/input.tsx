interface inputProps {
  onChange: () => void;
  name?: string;
  value?: string;
  label?: string;
  className?: string;
  width?: string;
  inputType?: string;
  placeholder?: string;
}
const Input = ({
  className,
  label,
  inputType,
  placeholder,
  value,
  name,
  onChange,
  width,
}: inputProps) => {
  return (
    <div className="flex justify-center">
      <div>
        <label className="text-gray">{label}</label>
        <div className="form-floating mb-3 xl:w-96">
          <input
            type={inputType}
            id="floatingInput"
            name={name}
            placeholder={placeholder}
            className="form-control  text-gray bg-white focus:text-gray focus:bg-white mt-5 block w-full border-b-[1px] border-orange-dark bg-clip-padding px-3 py-1.5 pl-0 text-base font-normal transition ease-in-out focus:outline-none"
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
