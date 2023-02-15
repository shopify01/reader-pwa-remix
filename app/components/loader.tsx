interface loaderProps {
  width?: string;
  height?: string;
}
const Loader = ({ width = "w-24", height = "h-24" }: loaderProps) => {
  return (
    <div
      className={`inline-block ${width} ${height} animate-spin rounded-full border-t-8  border-t-orange-default`}
    ></div>
  );
};

export default Loader;
