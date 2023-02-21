import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState, useEffect } from "react";

import Button from "~/components/button";
import BackButton from "~/components/backButton";
import OtpInput from "react-otp-input";
export async function action({ request }: ActionArgs) {
  return redirect("/reset-password");
}

export const meta: MetaFunction = () => {
  return {
    title: "Otp Verify",
  };
};

export default function ForgetPasswordPage() {
  const actionData = useActionData<any>();
  const [otp, setOtp] = useState<string>();
  const [seconds, setSeconds] = useState(60);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  const handleChange = (otp: string) => {
    setOtp(otp);
  };
  return (
    <>
      <BackButton url={"/forgetPassword"} />
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-[30rem] px-3">
          <p className="text-2xl font-medium">You have Got Mail ✉️</p>
          <p className="text-xl font-thin">
            We have sent the Otp Verification code to your email address. Check
            Your email and enter the code below.
          </p>
          <Form method="post" className="my-3">
            <div className="my-2">
              <OtpInput
                value={otp}
                onChange={handleChange}
                numInputs={4}
                inputStyle={
                  "max-w-[6rem] !w-full h-[54px] text-base text-black-default border-solid border-[1px] border-black-light"
                }
                containerStyle={"justify-evenly"}
                focusStyle={"outline-none"}
                isInputNum
              />
            </div>

            <p className="pb-2 text-center text-base font-thin">
              Didn't receive email?.
            </p>
            <p className="pb-4 text-center text-base font-thin">
              you can resend code in{" "}
              <span className="text-orange-default">
                {seconds < 10 ? `0${seconds}` : seconds}
              </span>{" "}
              s
            </p>
            <Button
              label="Confirm"
              maxWidth="max-w-full"
              fontSize="text-base"
              type="submit"
            />
          </Form>
        </div>
      </div>
    </>
  );
}
