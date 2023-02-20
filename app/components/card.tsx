import React from "react";
import { ImStarHalf } from "react-icons/im";
interface bookCardProps {
  bookTitle: string;
  bookImage: string;
  rating: string;
  price: string;
  author?: string;
  category?: string;
  publishedDate?: string;
  className?: string;
  showInColumn?: boolean;
  handleClick?: () => void;
}
const BookCard = ({
  bookTitle,
  bookImage,
  rating,
  price,
  author,
  category,
  publishedDate,
  className,
  showInColumn,
  handleClick = () => {},
}: bookCardProps) => {
  return (
    <div>
      {!showInColumn ? (
        <div className="h-[70%]">
          <img
            src={bookImage}
            alt="book_image"
            className="mb-4 h-[240px] w-[170px] max-w-[170px] rounded-lg border-[1px] border-black-light"
            onClick={handleClick}
          />
          <p className="text-black-dark mb-2 text-xl font-medium">
            {bookTitle.length > 20
              ? bookTitle.substring(0, 20) + "..."
              : bookTitle}
          </p>
          <div className="flex gap-5 font-medium text-grey-default">
            <span className="flex gap-2 ">
              <ImStarHalf className="mt-0.5" />
              {rating}
            </span>
            <span>{price}</span>
          </div>
        </div>
      ) : (
        <div className="flex h-[70%] w-full gap-5">
          <img
            src={bookImage}
            alt="book_image"
            className="mb-4 h-[240px] w-[170px] max-w-[170px] rounded-lg border-[1px] border-black-light"
          />
          <div>
            <p className="text-black-dark mb-4 text-xl font-medium">
              {bookTitle}
            </p>
            {author && category && publishedDate ? (
              <div className="font-medium text-grey-default">
                <p className="mb-4 flex gap-2 text-xl text-orange-dark font-normal">{author}</p>
                <p className="font-normal mb-3">Released on. {publishedDate}</p>
                <span className="font-normal text-sm p-2 bg-grey-light rounded-lg">{category}</span>
              </div>
            ) : (
              <div className="font-medium text-grey-default">
                <span className="mb-4 flex gap-2">
                  <ImStarHalf className="mt-0.5" />
                  {rating}
                </span>
                <span>{price}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default BookCard;
