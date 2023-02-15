import type { ReactElement, MouseEvent } from "react";

interface buttonProps {
  label: string | ReactElement;
  handleClick?: (e: MouseEvent) => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  maxWidth?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  fontSize?: string;
}
const Button = ({
  handleClick = () => {},
  label,
  disabled = false,
  type = "button",
  maxWidth = "max-w-[300px]",
  backgroundColor = "bg-orange-dark",
  textColor = "text-white-default",
  borderColor = "border-orange-default",
  fontSize = "text-sm"
}: buttonProps) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${backgroundColor} w-full ${textColor} ${maxWidth} border-2 ${fontSize} ${borderColor} inline-block rounded-full px-6 py-4 font-medium leading-tight disabled:opacity-30`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;
