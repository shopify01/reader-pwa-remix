import React from "react";
import { RiSearchLine } from "react-icons/ri";
import BackButton from "~/components/backButton";
import { GenreData } from "~/components/data";
import GenreCard from "~/components/genreCard";

const Genre: React.FC = () => {
  return (
    <div>
      <div className="flex w-full justify-between p-5">
        <div className="flex items-center text-2xl font-medium">
          <BackButton ml="ml-0" url={"/home"} />
          <p className="w-[250px]">Explore by Genre</p>
        </div>
        <div className="flex items-center text-3xl">
          <RiSearchLine />
        </div>
      </div>
      <div className="m-5">
        <div className="mt-[10px] flex flex-wrap justify-center gap-6">
          {GenreData.map((item: GenreData) => {
            return (
              <GenreCard
                key={item.label}
                genreTitle={item.label}
                genereImage={item.image}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Genre;
