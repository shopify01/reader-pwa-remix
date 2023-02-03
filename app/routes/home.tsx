import React from "react";
import BookImage from "~/../assets/book.jpg";
import Card from "~/components/card";
import { RiSearchLine } from "react-icons/ri";
import { MdOutlineNotificationAdd } from "react-icons/md";
const Home = () => {
  return (
    <div className="m-6">
      <div className="mb-8 flex justify-between ">
        <div className="flex items-center gap-6 font-medium text-3xl">
          <img
            src={BookImage}
            alt="Sonic Youth On Stage"
            className="h-auto max-w-[22px] rounded-lg"
          />
          <p>Erabook</p>
        </div>
        <div className="flex items-center gap-8 text-3xl">
          <RiSearchLine />
          <MdOutlineNotificationAdd />
        </div>
      </div>
      <div className="flex gap-6">
        <Card
          bookTitle="My Quiet Blacksmith Life in Another World..."
          rating="4.7"
          price="$7.99"
        />
        <Card
          bookTitle="My Quiet Blacksmith Life in Another World..."
          rating="4.7"
          price="$7.99"
        />
        <Card
          bookTitle="My Quiet Blacksmith Life in Another World..."
          rating="4.7"
          price="$7.99"
        />
        <Card
          bookTitle="My Quiet Blacksmith Life in Another World..."
          rating="4.7"
          price="$7.99"
        />
      </div>
    </div>
  );
};

export default Home;
