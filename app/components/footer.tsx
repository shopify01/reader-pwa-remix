import React, { useState } from "react";
import { HiOutlineHome } from "react-icons/hi";
import { RiCompassDiscoverLine } from "react-icons/ri";
import { AiOutlineFileText } from "react-icons/ai";
import { BsCartDash } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { useNavigate } from "@remix-run/react";

interface footerProps {
  className?: string;
}
// interface Item {
//     icon: string;
//     label: string;
//   }
const Items = [
  {
    id: 1,
    icon: <HiOutlineHome size={25} />,
    label: "Home",
    urlPath: "home",
  },
  {
    id: 2,
    icon: <RiCompassDiscoverLine size={25} />,
    label: "Discover",
    urlPath: "book/discover",
  },
  {
    id: 3,
    icon: <AiOutlineFileText size={25} />,
    label: "Wishlist",
    urlPath: "book/wishlist-ebook",
  },
  {
    id: 4,
    icon: <BsCartDash size={25} />,
    label: "Purchased",
    urlPath: "book/purchased-ebook",
  },
  {
    id: 5,
    icon: <FaRegUser size={25} />,
    label: "Account",
    urlPath: "user/account",
  },
];
const Footer = ({ className }: footerProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>();

  const handleClick = (screen?: string, id?: number) => {
    setData(id);
    if (screen) {
      navigate(`/${screen}`);
    }
  };
  return (
    <div className="flex h-[80px] items-center justify-between px-5 text-sm text-grey-default block md:hidden bg-white-default sticky bottom-0">
      {Items.map((item) => {
        return (
          <div
            key={item}
            onClick={() => handleClick(item.urlPath, item.id)}
            className={item?.id === data ? "text-orange-dark" : ""}
          >
            <span className="flex justify-center">{item.icon}</span>
            <p>{item.label}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Footer;
