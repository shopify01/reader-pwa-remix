import React from "react";
import { ImStarHalf } from "react-icons/im";
interface cardProps {
  bookTitle: string;
  rating: string;
  price: string;
  className?: string;
}
const Card = ({ bookTitle, rating, price, className }: cardProps) => {
  return (
    <div className="w-full h-[70%] max-w-[fit-content]">
      <img
        src="https://www.designcap.com/res/template/medium/1f2f83a3c159b6d5fb7fab48b6ff6f55/page0.jpg?v=1602654191"
        alt="book_image"
        className="mb-4 h-full w-full rounded-lg border-[1px] border-black-light"
      />
      <p className="text-black-dark mb-2 text-xl font-medium">{bookTitle}</p>
      <div className="flex gap-5 font-medium text-grey-default">
        <span className="flex gap-2 ">
          {" "}
          <ImStarHalf className="mt-0.5" />
          {rating}
        </span>
        <span>{price}</span>
      </div>
    </div>
  );
};
export default Card;
