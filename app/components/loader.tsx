interface loaderProps {
  className?: string;
}
const Loader = ({ className }: loaderProps) => {
  return (
    <div
      className={
        className
          ? className
          : "inline-block h-24 w-24 animate-spin rounded-full border-t-8  border-t-orange-default"
      }
    ></div>
  );
};

export default Loader;
