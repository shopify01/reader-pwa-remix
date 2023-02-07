import React from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { GiEmptyHourglass } from "react-icons/gi";
import BackButton from "~/components/backButton";

const Notification: React.FC = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 flex h-[80px] w-full justify-between bg-white-default p-5">
        <div className="flex items-center text-2xl font-medium">
          <BackButton ml="ml-0" url={"/home"} />
          <p className="w-[250px]">Notification</p>
        </div>
        <div className="flex items-center text-3xl">
          <AiOutlineSetting />
        </div>
      </div>
      <div className="mt-[100px]">
        <div className="flex justify-center">
          <GiEmptyHourglass
            size={220}
            className="mt-20 mb-10 text-grey-default"
          />
        </div>
        <div className="text-center">
          <p className="text-3xl font-medium">Empty</p>
          <p className="text-xl text-black-light">You don't have any notification at this time</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
