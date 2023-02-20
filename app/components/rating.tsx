import React from "react";
import { ImStarHalf } from "react-icons/im";
interface ratingProps {
    rating?: string;
    reviews?: string;
  className?: string;
}
const Rating = ({ rating, reviews,className }: ratingProps) => {
  const ratingInput = [
    { value: "5", width: "75" },
    { value: "4", width: "60" },
    { value: "3", width: "45" },
    { value: "2", width: "30" },
    { value: "1", width: "15" },
  ];
  return (
    <div className="flex items-center border-b-[0.5px] border-grey-light pb-3">
      <div className="text-center w-[40%]">
              <p className="text-3xl font-3xl font-bold">{rating}</p>
          <ImStarHalf className="m-auto"/>
              <p className="text-grey-dark font-medium">{(reviews)}</p>
      </div>
      <div className="text-center w-[60%] pl-3 border-l-[1px] border-grey-light">
        {ratingInput.map((val) => {
          return (
            <span key={val} className="flex items-center gap-2">
              <p>{val.value}</p>
              <p className=" w-full h-[5px] rounded-full bg-grey-light">
                <p className="h-[5px] rounded-full bg-orange-dark" style={{width: `${val.width}%`}}></p>
              </p>
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Rating;
