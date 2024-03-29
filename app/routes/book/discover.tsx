import React, { useState, useEffect } from "react";
import BookImage from "~/../assets/book.jpg";
import BookCard from "~/components/card";
import { RiSearchLine } from "react-icons/ri";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "@remix-run/react";
import SearchBar from "~/components/searchbar";

interface Book {
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

const Discover = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>();

  useEffect(() => {
    if (books) {
      setSearchResults(books);
    }
  }, [books]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    setSearchResults(
      books.filter((item) =>
        item.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms")
      .then((res) => res.json())
      .then((data) => setBooks(data.items as Book[]))
      .catch((error) => console.error(error));
  }, []);

//   const handleClick = (screen?: string) => {
//     if (screen) {
//       navigate(`/${screen}`);
//     }
//   };

  return (
    <div>
      <div className="header fixed top-0 left-0 flex h-[80px] w-full justify-between bg-white-default p-5 shadow-md">
        <div className="flex items-center gap-6 text-3xl font-medium">
          <img
            src={BookImage}
            alt="Sonic Youth On Stage"
            className="h-auto max-w-[22px] rounded-lg"
          />
          <p>Discover</p>
        </div>
        <div className="flex items-center gap-8 text-3xl">
          <div className="hidden md:block">
            <SearchBar
              value={searchTerm}
              handleChange={handleChange}
              handleRemove={() => setSearchTerm("")}
            />
          </div>
          <RiSearchLine className="block md:hidden" />
        </div>
      </div>
      <div className="m-5 mt-[100px]">
        <div className="mt-7 mb-4 flex items-center justify-between text-2xl font-medium">
          <p>Top Charts</p>
          <span className="text-orange-dark">
            <BsArrowRight />
          </span>
        </div>
        <div className="flex-wrap-no flex gap-6 overflow-x-auto">
          {searchResults &&
            searchResults.map((item, index) => {
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
          <p>Top Selling</p>
          <span className="text-orange-dark">
            <BsArrowRight />
          </span>
        </div>
        <div className="flex-wrap-no flex gap-6 overflow-x-auto">
          {searchResults &&
            searchResults.map((book) => {
              return (
                <BookCard
                  key={book}
                  bookImage={book?.volumeInfo?.imageLinks?.thumbnail}
                  bookTitle={book?.volumeInfo?.title}
                  rating="4.7"
                  price="$7.99"
                />
              );
            })}
        </div>
        <div className="mt-7 mb-4 flex items-center justify-between text-2xl font-medium">
          <p>Top Free</p>
          <span className="text-orange-dark">
            <BsArrowRight />
          </span>
        </div>
        <div className="flex-wrap-no flex gap-6 overflow-x-auto">
          {searchResults &&
            searchResults.map((item, i) => {
              return (
                <BookCard
                  key={i}
                  bookImage={item?.volumeInfo?.imageLinks?.thumbnail}
                  bookTitle={item?.volumeInfo?.title}
                  rating="4.7"
                  price="$7.99"
                />
              );
            })}
        </div>
        <div className="mt-7 mb-4 flex items-center justify-between text-2xl font-medium">
          <p>Top New Releases</p>
          <span className="text-orange-dark">
            <BsArrowRight />
          </span>
        </div>
        <div className="flex-wrap-no flex gap-6 overflow-x-auto">
          {searchResults &&
            searchResults.map((item, i) => {
              return (
                <BookCard
                  key={i}
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

export default Discover;
