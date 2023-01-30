import { Link } from "@remix-run/react";
import BackArrow from "../../assets/arrow.svg";
interface BackButtonProps {
  url: String;
}
const BackButton = ({ url }: BackButtonProps) => {
  return (
    <Link to={`${url}`}>
      <img
        src={BackArrow}
        alt={"back_arrow"}
        className={"m-3 h-auto w-[2rem]"}
      />
    </Link>
  );
};

export default BackButton;
