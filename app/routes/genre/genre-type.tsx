import React, { useState, useEffect } from "react";
import BookCard from "~/components/card";
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

const GenrePreference: React.FC = () => {
  const navigate = useNavigate();
  const [column, setShowColumn] = useState<Boolean>(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>();
  const [isOpen, setIsOpen] = useState<Boolean>(false);

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
  const handleSort = (type) => {
    switch (type) {
      case "title":
        setSearchResults(
          searchResults.sort((a, b) => {
            if (a.volumeInfo?.title < b.volumeInfo?.title) return -1;
            if (a.volumeInfo?.title > b.volumeInfo?.title) return 1;
            return 0;
          })
        );
        break;
      case "price":
        setSearchResults(
          searchResults.sort((a, b) => a.price - b.price)
        );
        break;
      case "rating":
        setSearchResults(
          searchResults.sort((a, b) => b.rating - a.rating)
        );
        break;
      default:
        break;
    };
    setIsOpen(false);
  };

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
