import React, { useState, useEffect } from "react";
import type { MetaFunction,LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import BookImage from "~/../assets/book.jpg";
import BookCard from "~/components/card";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { GenreData } from "~/components/data";
import GenreCard from "~/components/genreCard";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { isAuthenticated } from "~/utils/auth";
import SearchBar from "~/components/searchbar";

interface Book {
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}
export const loader = async ({ request }): LoaderArgs => {
  let errors = {};
  try {
    const userAuthenticated = await isAuthenticated(request, true);
    if (!userAuthenticated) {
      return redirect("/login");
    }
    const response = await fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms")
    if (response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.log("error", error);
    errors.server = error?.message || error;
    return json({ errors }, { status: 500 });
  }
};
export const meta: MetaFunction = () => {
  return {
    title: "Home",
  };
};

const Home : React.FC = () => {
  const loaderData = useLoaderData<typeof loader>();
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
    if (loaderData) {
      setBooks(loaderData.items as Book[])
    }
  }, [loaderData]);

  const handleClick = (screen?: string) => {
    if (screen) {
      navigate(`/${screen}`);
    }
  };

  return (
    <div>
      <div className="header fixed top-0 left-0 flex h-[80px] w-full justify-between bg-white-default p-5 shadow-md">
        <div className="flex items-center gap-6 text-3xl font-medium">
          <img
            src={BookImage}
            alt="Sonic Youth On Stage"
            className="h-auto max-w-[22px] rounded-lg"
          />
          <p>Erabook</p>
        </div>
        <div className="flex items-center gap-8 text-3xl">
          <div className="hidden md:block">
            <SearchBar
              value={searchTerm}
              handleChange={handleChange}
              handleRemove={() => setSearchTerm("")}
            />
          </div>
          <RiSearchLine className="block md:hidden" onClick={()=> handleClick("book/book-search") }/>
          <MdOutlineNotificationAdd
            onClick={() => handleClick("notification")}
          />
        </div>
      </div>
      <div className="m-5">
        <div className="flex-wrap-no mt-[100px] flex gap-6 overflow-x-auto">
          {searchResults &&
            searchResults.map((item) => {
              return (
                <BookCard
                  key={item}
                  bookImage={item?.volumeInfo?.imageLinks?.thumbnail}
                  bookTitle={item?.volumeInfo?.title}
                  rating="4.7"
                  price="$7.99"
                />
              );
            })}
        </div>
        <div className="mt-7 mb-4 flex items-center justify-between text-2xl font-medium">
          <p>Explore by Genre</p>
          <span className="text-orange-dark">
            <BsArrowRight onClick={() => handleClick("genre")} />
          </span>
        </div>
        <div className="flex-wrap-no flex gap-6 overflow-x-auto">
          {GenreData.map((item) => {
            return (
              <GenreCard
                key={item}
                genreTitle={item.label}
                genereImage={item.image}
              />
            );
          })}
        </div>
        <div className="mt-7 mb-4 flex items-center justify-between text-2xl font-medium">
          <p>Recommended For You</p>
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
          <p>On Your Purchased</p>
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
          <p>On Your Wishlist</p>
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

export default Home;
