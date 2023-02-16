import React, { useState, useEffect } from "react";
import BookCard from "~/components/card";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { RiSearchLine } from "react-icons/ri";
import { BsFillGridFill, BsFillFileTextFill } from "react-icons/bs";
import { useNavigate } from "@remix-run/react";
import BackButton from "~/components/backButton";
import SearchBar from "~/components/searchbar";
import FilterButton from "~/components/filterButton";
interface Book {
  volumeInfo: {
    title: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

interface LoaderData {
  items: Book[];
}

export const loader = async ({ request }): LoaderArgs => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/books/v1/volumes?q=search+terms"
    );
    if (response.status === 200) {
      const data: LoaderData = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.log("error", error);
    throw new Error(error?.message || error);
  }
};

const GenrePreference: React.FC = () => {
  const loaderData = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  console.log("====>", searchParams.get("genretype"));
  const [column, setShowColumn] = useState<boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const filterItem = [
    { label: "Short by Name" },
    { label: "Short by Rating" },
    { label: "Short by Price" },
  ];

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

  const handleSort = (type: string) => {
    switch (type) {
      case "title":
        setSearchResults(
          searchResults?.sort((a, b) => {
            if (a.volumeInfo?.title < b.volumeInfo?.title) return -1;
            if (a.volumeInfo?.title > b.volumeInfo?.title) return 1;
            return 0;
          })
        );
        break;
      case "price":
        setSearchResults(searchResults?.sort((a, b) => a.price - b.price));
        break;
      case "rating":
        setSearchResults(searchResults?.sort((a, b) => b.rating - a.rating));
        break;
      default:
        break;
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (loaderData) {
      setBooks(loaderData.items);
    }
  }, [loaderData]);

  const handleClick = (screen?: string) => {
    if (screen) {
      navigate(`/${screen}`);
    }
  };
  return (
    <div>
      <div className="fixed top-0 left-0 flex h-[80px] w-full justify-between bg-white-default p-5 shadow-md">
        <div className="flex items-center text-2xl font-medium">
          <BackButton ml="ml-0" url={"/genre"} />
          <p>GenreType</p>
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
          <FilterButton
            fields={filterItem}
            open={isOpen}
            setOpen={setIsOpen}
            handleClick={()=> handleSort("title")}
          />
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

export default GenrePreference;
