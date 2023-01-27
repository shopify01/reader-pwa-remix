import { useNavigate } from "@remix-run/react";
import welcomeImage from "~/../assets/ebook_Welcome.jpg";
import GoogleImage from "~/../assets/google.svg";
import Button from "~/components/button";

export default function Index() {
  const navigate = useNavigate();
  const handleClick = (screen?: String) => {
    if (screen) {
      navigate(`/${screen}`);
    }
  };
  return (
    <main
      className={`relative flex min-h-screen flex-col items-center  bg-white-default dark:bg-black-default`}
    >
      <img
        src={welcomeImage}
        alt="Sonic Youth On Stage"
        class="bg-gradient-to-b-rgb-245-246-252-0-52-rgb-117-19-93-0-73 max-h-[400px] w-full h-[350px] object-fill"
      />
      <p className="mt-2 text-2xl font-medium">
        Welcome to <span className="text-orange-default">Erabook &#128075;</span>
      </p>
      <p className="max-w-xs text-center text-base font-light">
        The Number One Ebook Store & Reader Application in this Century.
      </p>
      <div className="mt-3 flex w-full max-w-[300px] flex-col gap-2">
        <Button
          backgroundColor={"bg-white-default"}
          borderColor={"border-white-light"}
          textColor={"text-black-default"}
          label={
            <span className="flex flex-wrap justify-center gap-1 align-middle">
              <img
                src={GoogleImage}
                alt={"google_Image"}
                className={"h-auto w-[1rem]"}
              />
              <p> Continue with Google</p>
            </span>
          }
          handleClick={() => handleClick()}
        />
        <Button
          label={"Get Started"}
          handleClick={() => handleClick("signUp")}
        />
        <Button
          label={"I Already Have an Account"}
          backgroundColor={"bg-orange-light"}
          borderColor={"border-orange-light"}
          textColor={"text-orange-default"}
          handleClick={() => handleClick("login")}
        />
      </div>
    </main>
  );
}
