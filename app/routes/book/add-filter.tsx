import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Button from "~/components/button";
import { GenreData, Language, Rating, SortArr, Age } from "~/components/data";
import RadioButton from "~/components/radioButton";
type FilterOption = {
  label: string;
  };
  
  const AddFilter: React.FC = () => {
  const [filteredData, setFilteredData] = useState<Array>([]);
  const filterBy: FilterOption[] = [
  { label: "Sort" },
  { label: "Price" },
  { label: "Rating" },
  { label: "Genre" },
  { label: "Language" },
  { label: "Age" },
  ];
  
  const handleSort: React.FC = () => {

  };
  
  
  return (
    <div className="mt-6 flex flex-col items-center justify-center">
      <div className="h-auto w-full max-w-[30rem] px-4">
        <div className="flex items-center gap-3 text-2xl font-medium">
          <RxCross2 />
          <p>Filter</p>
        </div>
        <div className="my-5 flex flex-wrap gap-3">
          {filterBy.map((item) => {
            return (
              <Button
                key={item}
                label={item.label}
                value={""}
                handleClick={""}
                maxWidth="w-auto"
                textColor={"text-orange-dark"}
                backgroundColor={"bg-white-default"}
              />
            );
          })}
        </div>
        <div className="rounded-xl border-[0.5px] border-grey-light bg-gray-light p-5">
          <p className=" mb-5 text-xl font-medium ">Sort</p>
          {SortArr.map((e) => {
            return <RadioButton key={e} label={e?.label} />;
          })}
        </div>
        <div className="my-5 rounded-xl border-[0.5px] border-grey-light bg-gray-light p-5">
          <p className="my mb-5 text-xl font-medium ">Price</p>
          <div></div>
        </div>
        <div className="rounded-xl border-[0.5px] border-grey-light bg-gray-light p-5">
          <p className="my mb-5 text-xl font-medium ">Rating</p>
          {Rating.map((e) => {
            return <RadioButton key={e} label={e?.label} />;
          })}
        </div>
        <div className="my-5 rounded-xl border-[0.5px] border-grey-light bg-gray-light p-5">
          <p className="my mb-5 text-xl font-medium ">Genre</p>
          {GenreData.map((e) => {
            return <RadioButton key={e} label={e?.label} />;
          })}
        </div>
        <div className="rounded-xl border-[0.5px] border-grey-light bg-gray-light p-5">
          <p className="my mb-5 text-xl font-medium ">Language</p>
          {Language.map((e) => {
            return <RadioButton key={e} label={e?.label} />;
          })}
        </div>
        <div className="my-5 rounded-xl border-[0.5px] border-grey-light bg-gray-light p-5">
          <p className="my mb-5 text-xl font-medium ">Age</p>
          {Age.map((e) => {
            return <RadioButton key={e} label={e?.label} />;
          })}
        </div>
        <div className="mb-6 flex justify-evenly gap-4">
          <Button
            label="Reset"
            maxWidth="max-w-[200px]"
            backgroundColor={"bg-orange-light"}
            borderColor={"border-orange-light"}
            textColor={"text-orange-dark"}
            fontSize="text-base"
            handleClick={() => setFilteredData(null)}
          />
          <Button
            label="Apply"
            maxWidth="max-w-[200px]"
            fontSize="text-base"
            handleClick={() => handleSort()}
          />
        </div>
      </div>
    </div>
  );
};

export default AddFilter;
