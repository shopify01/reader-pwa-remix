import { Link } from "@remix-run/react";
import { BiArrowBack } from "react-icons/bi";
interface BackButtonProps {
  url: String;
  ml?: String
}
const BackButton = ({ url, ml }: BackButtonProps) => {
  return (
    <div className={`m-4 ${ml} w-full max-w-[2rem]`}>
      <Link to={`${url}`}>
        <BiArrowBack size={24} />
      </Link>
    </div>
  );
};

export default BackButton;
