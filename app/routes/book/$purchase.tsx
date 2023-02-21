import React, { useState } from "react";
import BookCard from "~/components/card";
import { useNavigate } from "@remix-run/react";
import BackButton from "~/components/backButton";
import { BsFileEarmarkPlus, BsArrowRight } from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import { ImStarHalf } from "react-icons/im";
import Button from "~/components/button";

const BookPurchase: React.FC = () => {
  return (
    <div>
      <div className="flex h-[80px] w-full items-center justify-between p-5">
        <BackButton ml="ml-0" url={"/home"} />
        <div className="flex items-center gap-2 text-3xl">
          {/* BsFileEarmarkMinus */}
          <BsFileEarmarkPlus />
          <FiShare2 onClick={() => handleClick("")} />
        </div>
      </div>
      <div className="m-5">
        <BookCard
          key={""}
          bookImage={""}
          bookTitle={"Google Power Search"}
          rating="4.7"
          price="$7.99"
          showInColumn={true}
        />
        <div className="mb-5 flex items-center justify-between">
          <span className="text-center">
            <p className="text-xl font-medium">
              <ImStarHalf />
            </p>
            <p className="text-sm">6.8k reviews</p>
          </span>
          <span className="text-center">
            <p className="text-xl font-medium">5.6 MB</p>
            <p className="text-sm">size</p>
          </span>
          <span className="text-center">
            <p className="text-xl font-medium">784</p>
            <p className="text-sm">page</p>
          </span>
          <span className="text-center">
            <p className="text-xl font-medium">50M+</p>
            <p className="text-sm">purchases</p>
          </span>
        </div>
        <Button
          label="Buy USD $9.99"
          maxWidth="max-w-full"
          fontSize="text-base"
          type="submit"
        />
        <div className="mt-7 mb-4 flex items-center justify-between text-2xl font-medium">
          <p>About this Ebook</p>
          <span className="text-orange-dark">
            <BsArrowRight onClick={() => handleClick("genre")} />
          </span>
        </div>
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder the copy is available...
        </p>
        <div className="mt-7 mb-4 flex items-center justify-between text-2xl font-medium">
          <p>Ratings & Reviews</p>
          <span className="text-orange-dark">
            <BsArrowRight onClick={() => handleClick("genre")} />
          </span>
        </div>
        <div>4.9</div>
      </div>
    </div>
  );
};

export default BookPurchase;
