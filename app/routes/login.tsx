import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";

import { validateEmailUser } from "~/utils";
import Checkbox from "~/components/checkbox";
import Input from "~/components/input";
import Button from "~/components/button";
import fbImage from "~/../assets/facebook.svg";
import appleImage from "~/../assets/apple.svg";
import googleImage from "~/../assets/google.svg";
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  if (!validateEmailUser(email)) {
    return json(
      { errors: { email: "Email or Username is invalid", password: null } },
      { status: 400 }
    );
  }

  if (typeof password !== "string" || password.length === 0) {
    return json(
      { errors: { email: null, password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json(
      { errors: { email: null, password: "Password is too short" } },
      { status: 400 }
    );
  }
  return null;
}

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};
const LoginFormData = [
  {
    label: "Username / Email",
    type: "text",
    name: "email",
    placeholder: "Enter Username / Email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter password",
  },
];

export default function LoginPage() {
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <div className="h-auto w-full max-w-[30rem] px-3">
        <p className="text-2xl font-medium">Hello there &#9995;</p>
        <p className="text-xl font-thin">
          Please enter your username / email and password to sign in
        </p>
        <Form method="post" className="my-3">
          {LoginFormData?.map((item, index) => {
            const { name, type, label, placeholder } = item;
            const error = actionData?.errors?.[name] || "";
            const value = formData?.[name];
            return (
              <Input
                key={`${name}${index}`}
                inputType={type}
                name={name}
                label={label}
                placeholder={placeholder}
                value={value}
                error={error}
                onChange={handleChange}
              />
            );
          })}
          <div className="py-4">
            <Checkbox label="Remember me" />
          </div>
          <div className="border-[1px] border-solid border-black-light opacity-[.15]" />
          <p className="my-10 flex justify-center text-xl font-semibold text-orange-default">
            Forgot Password
          </p>
          <div className="mb-8 flex items-center justify-center gap-2">
            <div className="h-[0px] w-full max-w-full border-[1px] border-solid border-black-light opacity-30" />
            <p className="whitespace-pre text-center text-xl font-medium opacity-50">
              or continue with
            </p>
            <div className="h-[0px] w-full max-w-full  border-[1px] border-solid border-black-light opacity-30" />
          </div>

          <div className="mb-20 flex gap-2">
            <Button
              backgroundColor="bg-white-default"
              borderColor="border-black-light border-opacity-20"
              label={
                <span className="flex flex-wrap justify-center gap-1 align-middle">
                  <img
                    src={googleImage}
                    alt={"google_Image"}
                    className={"h-auto w-[2rem]"}
                  />
                </span>
              }
            />
            <Button
              backgroundColor="bg-white-default"
              borderColor="border-black-light border-opacity-20"
              label={
                <span className="flex flex-wrap justify-center gap-1 align-middle">
                  <img
                    src={appleImage}
                    alt={"Apple_Image"}
                    className={"h-auto w-[2em]"}
                  />
                </span>
              }
            />
            <Button
              backgroundColor="bg-white-default"
              borderColor="border-black-light border-opacity-20"
              label={
                <span className="flex flex-wrap justify-center gap-1 align-middle">
                  <img
                    src={fbImage}
                    alt={"facebook_Image"}
                    className={"h-auto w-[2rem]"}
                  />
                </span>
              }
            />
          </div>
          <Button
            label="Sign In"
            maxWidth="max-w-full"
            fontSize="text-base"
            type="submit"
          />
        </Form>
      </div>
    </div>
  );
}
