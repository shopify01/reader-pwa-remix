import { useEffect } from "react";
import BookImage from "~/../assets/book.jpg";
import Loader from "~/components/loader";
import { useNavigate } from "@remix-run/react";

const Index: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/welcome");
    }, 2000);
  }, [navigate]);

  return (
    <main
      className={`relative flex min-h-screen flex-col items-center justify-center bg-white-default dark:bg-black-default`}
    >
      <img
        src={BookImage}
        alt="Sonic Youth On Stage"
        className="h-auto max-w-[200px] rounded-lg"
      />
      <p
        className={`text-4xl font-black text-black-default dark:text-white-default`}
      >
        Erabook
      </p>
      <div className="mt-[30px]">
        <Loader />
      </div>
    </main>
  );
}
export default Index;