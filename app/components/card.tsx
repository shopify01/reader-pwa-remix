import React from "react";
import { ImStarHalf } from "react-icons/im";
interface bookCardProps {
  bookTitle: string;
  bookImage: string;
  rating: string;
  price: string;
  className?: string;
}
const BookCard = ({ bookTitle,bookImage, rating, price, className }: bookCardProps) => {
  return (
    <div className="w-full h-[70%] max-w-[fit-content]">
      <img
        src={bookImage}
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
export default BookCard;
