import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { ChangeEvent } from "react";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import { validateEmail } from "~/utils.server";
import Input from "~/components/input";
import Button from "~/components/button";
import BackButton from "~/components/backButton";
import { forgetPassword } from "~/utils/auth";
interface FormData {
  email: string;
}

const action: ActionFunction = async ({ request }): ActionArgs => {
  try {
    const formData = await request.formData();
    const email = formData.get("email") as string;
    if (!validateEmail(email)) {
      return json(
        { errors: { email: "Email is invalid", password: null } },
        { status: 400 }
      );
    }
    const { data, error } = await forgetPassword({ email });
    if (data) {
      console.log("data", data);
      return data;
    }
    throw error;
  } catch (error) {
    console.log("error", error);
    return json(error, { status: 500 });
  }
};

export const meta: MetaFunction = () => {
  return {
    title: "Forget Password",
  };
};

const ForgetPasswordPage: React.FC = () => {
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <BackButton url={"/login"} />
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-[30rem] px-3">
          {actionData?.error && (
            <div
              className="relative mb-4 rounded border border-black-light px-4 py-3 text-center text-xl text-red-default"
              role="alert"
            >
              <strong className="font-bold">Incorrect email !</strong>
            </div>
          )}
          <p className="text-2xl font-medium">Forget Password &#128273;</p>
          <p className="text-xl font-thin">
            Please Enter Your email address. we can send an Otp Code for
            verification in the next step.
          </p>
          <Form method="post" className="my-3">
            <Input
              inputType={"email"}
              name={"email"}
              label={"Email"}
              placeholder={"Enter Email"}
              value={formData?.email}
              error={actionData?.errors?.["email"] || ""}
              onChange={handleChange}
            />
            {actionData !== undefined ? (
              <div className="text-sm text-green-default">
                Email sent successfull, please check your mail.
              </div>
            ) : null}
            <div className="mt-40">
              <Button
                label="Continue"
                maxWidth="max-w-full"
                fontSize="text-base"
                type="submit"
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};
export default ForgetPasswordPage;
