import React, { useState, useEffect } from "react";
import BookCard from "~/components/card";
import type { LoaderArgs } from "@remix-run/node";
import { useNavigate, useLoaderData } from "@remix-run/react";
import { BsFillGridFill, BsFillFileTextFill } from "react-icons/bs";
import BackButton from "~/components/backButton";
import SearchBar from "~/components/searchbar";
import { RiFilter3Line } from "react-icons/ri";

interface Book {
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}export const loader = async ({ request }): LoaderArgs => {
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

const SearchPage: React.FC = () => {
  const loaderData = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const [column, setShowColumn] = useState<Boolean>(false);
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
      setBooks(loaderData.items)
    }
  }, [loaderData]);
    
  const handleClick = (screen?: String) => {
    if (screen) {
      navigate(`/${screen}`);
    }
  };
  return (
    <div>
      <div className="fixed top-0 left-0 flex h-[80px] w-full items-center justify-between bg-white-default p-5 shadow-md">
        <BackButton ml="ml-0" url={"/genre"} />
        <div className="flex items-center gap-2 text-3xl">
          <SearchBar
            value={searchTerm}
            handleChange={handleChange}
            handleRemove={() => setSearchTerm("")}
          />
          <RiFilter3Line onClick={() => handleClick("book/add-filter")} /> 
        </div>
      </div>
      <div className="mt-[80px] flex h-[80px] w-full justify-between p-5">
        <p className="flex items-center text-xl font-medium">Show in</p>
        <div className="flex items-center gap-8 text-3xl">
          <BsFillGridFill
            className={!column ? "text-orange-dark" : "text-grey-default"}
            onClick={() => setShowColumn(false)}
          />
          <BsFillFileTextFill
            className={column ? "text-orange-dark" : "text-grey-default"}
            onClick={() => setShowColumn(true)}
          />
        </div>
      </div>
      <div className="m-5">
        <div className={!column ? "flex flex-wrap justify-center gap-6" : null}>
          {searchResults &&
            searchResults.map((item, index) => {
              return (
                <BookCard
                  key={index}
                  bookImage={item?.volumeInfo?.imageLinks?.thumbnail}
                  bookTitle={item?.volumeInfo?.title}
                  rating="4.7"
                  price="$7.99"
                  showInColumn={column}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
