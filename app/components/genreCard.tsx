import React from "react";
interface cardProps {
    genreTitle: string;
    genereImage: string;
  className?: string;
}
const GenreCard = ({ genreTitle, genereImage, className }: cardProps) => {
  return (
    <div className="relative w-full h-full">
      <img
        src={genereImage}
        alt="book_image"
        className="mb-4 rounded-lg"
      />
      <p className="text-black-dark mb-2 text-xl text-white-default font-medium fixed absolute left-2 bottom-5">{genreTitle}</p>
    </div>
  );
};
export default GenreCard;
