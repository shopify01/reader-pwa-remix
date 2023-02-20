import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "@remix-run/react";
import BackButton from "~/components/backButton";
import { GenreData } from "~/components/data";
import GenreCard from "~/components/genreCard";
import SearchBar from "~/components/searchbar";

const Genre: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<String>("");
  const [searchResults, setSearchResults] = useState<GenreData[]>(GenreData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    setSearchResults(
      GenreData.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };
  const handleClick = (screen?: String) => {
    if (screen) {
      navigate(`/${screen}`);
    }
  };
  return (
    <div>
      <div className="shadow-md top-0 left-0 bg-white-default flex w-full justify-between p-5">
        <div className="flex items-center text-2xl font-medium">
          <BackButton ml="ml-0" url={"/home"} />
          <p className="w-[250px]">Explore by Genre</p>
        </div>
        <div className="flex items-center text-3xl">
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
      <div className="m-5 mt-[40px]">
        <div className=" flex flex-wrap justify-center gap-6">
          {searchResults && searchResults.map((item: GenreData) => {
            return (
              <GenreCard
                key={item.label}
                genreTitle={item.label}
                genereImage={item.image}
                handleClick={() => handleClick(`genre/genretype=${item?.label}`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Genre;
