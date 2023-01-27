interface selectProps {
  handleChange: () => void;
  name: string;
  data: string;
  value: string;
  label: string;
  className?: string;
  placeholder?: string;
  width?: string;
}
const Select = ({
  className,
  label,
  data,
  value,
  name,
  handleChange,
  placeholder,
  width,
}: selectProps) => {
  return (
    <div >
      <label className="text-black-default">{label}</label>
      <div className="mb-3 xl:w-96">
        <select
          name={name}
          value={value}
          onChange={handleChange}
          class="form-select text-black-default focus:text-black-default focus:bg-white mt-5 block w-full border-b-[1px] border-orange-dark bg-white-default bg-clip-padding px-3 py-1.5 pl-0 text-base font-normal transition ease-in-out focus:outline-none"
        >
          <option >{placeholder}</option>
          {data?.map((item, index)=>{
            return <option key={index} value={item} className="focus:bg-orange-dark">{item}</option>
          })}           
        </select>
      </div>
    </div>
  );
};

export default Select;
