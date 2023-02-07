import React, { useState, useEffect } from "react";
import BookImage from "~/../assets/book.jpg";
import BookCard from "~/components/card";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineNotificationAdd } from "react-icons/md";
import { BsArrowRight } from "react-icons/bs";
import { GenreData } from "~/components/data";
import GenreCard from "~/components/genreCard";
import { useNavigate } from "@remix-run/react";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("https://www.googleapis.com/books/v1/volumes?q=search+terms")
      .then((res) => res.json())
      .then((data) => setBooks(data.items))
      .catch((error) => console.error(error));
  }, []);
  const handleClick = (screen?: String) => {
    if (screen) {
      navigate(`/${screen}`);
    }
  };

  return (
    <div>
      <div className="header shadow-md p-5 flex justify-between w-full h-[80px] fixed bg-white-default top-0 left-0">
        <div className="flex items-center gap-6 text-3xl font-medium">
          <img
            src={BookImage}
            alt="Sonic Youth On Stage"
            className="h-auto max-w-[22px] rounded-lg"
          />
          <p>Erabook</p>
        </div>
        <div className="flex items-center gap-8 text-3xl">
          <RiSearchLine />
          <MdOutlineNotificationAdd onClick={() => handleClick("notification")}/>
        </div>
      </div>
      <div className="m-5">
      <div className="flex-wrap-no flex gap-6 overflow-x-auto mt-[100px]">
        {books.map((item,index) => {
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
        <p>Explore by Genre</p>
        <span className="text-orange-dark">
            <BsArrowRight onClick={() => handleClick("genre")}/>
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
        {books.map((item,index) => {
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
        {books.map((item,index) => {
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
        <p>On Your Wishlist</p>
        <span className="text-orange-dark">
          <BsArrowRight />
        </span>
      </div>
      <div className="flex-wrap-no flex gap-6 overflow-x-auto">
        {books.map((item,index) => {
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

export default Home;
