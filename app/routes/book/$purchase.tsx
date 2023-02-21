import React, { useState, useEffect } from "react";
import type { LoaderArgs } from "@remix-run/node";
import BookCard from "~/components/card";
import { useNavigate, useSearchParams, useLoaderData } from "@remix-run/react";
import BackButton from "~/components/backButton";
import {
  BsFileEarmarkPlus,
  BsArrowRight,
  BsFileEarmarkMinus,
} from "react-icons/bs";
import { FiShare2 } from "react-icons/fi";
import { ImStarHalf } from "react-icons/im";
import Button from "~/components/button";
import Rating from "~/components/rating";

type Book = {
  volumeInfo: {
  imageLinks: {
  thumbnail: string;
  };
  title: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  categories?: string[];
  pageCount?: number;
  };
  searchInfo?: {
  textSnippet: string;
  };
  };
  
  type Data = {
  label: JSX.Element | string;
  heading: string;
  };
  
  export const loader = async ({ request }): Promise<LoaderArgs> => {
  try {
  const response = await fetch(
  "https://www.googleapis.com/books/v1/volumes?q=search+terms"
  );
  if (response.status === 200) {
  const data = await response.json();
  return data;
  } else {
  throw new Error("Failed to fetch data");
  }
  } catch (error) {
  console.log("error", error);
  return json({ error }, { status: 500 });
  }
  };
  
  const BookPurchase: React.FC = (): JSX.Element => {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const [books, setBooks] = useState<Book[]>([]);
  const [icon, setIcon] = useState<JSX.Element>(<BsFileEarmarkPlus />);
  const selectedBook = books.find((book) => book.volumeInfo.title === title);
  
  const data: Data[] = [
  { label: <ImStarHalf />, heading: "6.8k reviews" },
  { label: "5.6 MB", heading: "size" },
  { label: selectedBook?.volumeInfo?.pageCount, heading: "pages" },
  { label: "50M+", heading: "purchases" },
  ];
  
  useEffect(() => {
  if (loaderData) {
  setBooks(loaderData.items as Book[]);
  }
  }, [loaderData]);
  
  const handleToggle = (): void => {
  setIcon(<BsFileEarmarkMinus className="text-orange-dark" />);
  alert("Added to Wishlist");
  };
  
  const handleClick = (screen?: string): void => {
  if (screen) {
  navigate(`/${screen}`);
  }
  };
  return (
    <div>
      <div className="flex h-[80px] w-full items-center justify-between p-5">
        <BackButton ml="ml-0" url={"/home"} />
        <div className="flex items-center gap-2 text-3xl">
          <span onClick={handleToggle}>{icon}</span>
          <FiShare2 onClick={() => handleClick("")} />
        </div>
      </div>
      <div className="m-5">
        <BookCard
          key={""}
          bookImage={selectedBook?.volumeInfo?.imageLinks?.thumbnail}
          bookTitle={selectedBook?.volumeInfo.title}
          author={
            selectedBook?.volumeInfo.authors
              ? selectedBook?.volumeInfo.authors[0]
              : selectedBook?.volumeInfo?.publisher
          }
          publishedDate={selectedBook?.volumeInfo.publishedDate}
          category={
            selectedBook?.volumeInfo.categories
              ? selectedBook?.volumeInfo.categories[0]
              : null
          }
          showInColumn={true}
        />
        <div className="mb-5 mt-2 flex items-center justify-between">
          {data.map((item) => {
            return (
              <span
                key={item}
                className="border-r-[1px] border-grey-light px-3 text-center text-grey-dark"
              >
                <p className="text-xl font-bold">{item.label}</p>
                <p className="text-sm">{item.heading}</p>
              </span>
            );
          })}
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
            <BsArrowRight
              onClick={() =>
                handleClick(
                  `book/ebookdetail/search?book=${selectedBook?.volumeInfo?.title}`
                )
              }
            />
          </span>
        </div>
        <p className="text-grey-dark">
          {selectedBook?.searchInfo?.textSnippet}{" "}
        </p>
        <div className="mt-7 mb-4 flex items-center justify-between text-2xl font-medium">
          <p>Ratings & Reviews</p>
          <span className="text-orange-dark">
            <BsArrowRight onClick={() => handleClick("ratings")} />
          </span>
        </div>
        <Rating rating="4.9" reviews="6.8k reviews" />
        <div className="my-5">
          <p className="mb-4 text-center text-xl font-medium text-grey-dark">
            Rate this Ebook
          </p>
          <p className="mb-4 flex w-auto justify-center gap-4 text-grey-dark">
            <ImStarHalf size={30} />
            <ImStarHalf size={30} />
            <ImStarHalf size={30} />
            <ImStarHalf size={30} />
            <ImStarHalf size={30} />
          </p>
          <div className="flex justify-center">
            <Button
              label="Write a Review"
              maxWidth="max-w-[200px]"
              fontSize="text-xl"
              borderColor="border-orange-dark"
              textColor="text-orange-dark"
              backgroundColor="bg-white-default"
            />
          </div>
        </div>
        <div className="mt-7 mb-4 flex items-center justify-between text-2xl font-medium">
          <p>Selected Book Series</p>
          <span className="text-orange-dark">
            <BsArrowRight onClick={() => handleClick("")} />
          </span>
        </div>
        <div className="flex-wrap-no flex gap-6 overflow-x-auto">
          {books.map((item, index) => {
            return (
              <BookCard
                key={index}
                bookImage={item?.volumeInfo?.imageLinks?.thumbnail}
                bookTitle={item?.volumeInfo?.title}
                rating="4.7"
                price="$7.99"
              />
            );
          })}
        </div>
        <div className="mt-7 mb-4 flex items-center justify-between text-2xl font-medium">
          <p>Similar Ebooks</p>
          <span className="text-orange-dark">
            <BsArrowRight onClick={() => handleClick("")} />
          </span>
        </div>
        <div className="flex-wrap-no mb-5 flex gap-6 overflow-x-auto">
          {books.map((item, index) => {
            return (
              <BookCard
                key={index}
                bookImage={item?.volumeInfo?.imageLinks?.thumbnail}
                bookTitle={item?.volumeInfo?.title}
                rating="4.7"
                price="$7.99"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookPurchase;
