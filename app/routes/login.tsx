import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, Link } from "@remix-run/react";
import { useState } from "react";
import { validateEmailUser } from "~/utils.server";
import Checkbox from "~/components/checkbox";
import Input from "~/components/input";
import Button from "~/components/button";
import BackButton from "~/components/backButton";
import { BsApple, BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { signInUser } from "~/utils/auth";
import supabaseToken from "~/utils/cookieSession.server";

export async function action({ request }: ActionArgs) {
  try {
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

    const { data, error } = await signInUser({
      email,
      password,
    });
  
    if (data) {
      return redirect("/home", {
        headers: {
          "Set-Cookie":
            await supabaseToken.serialize(
              data?.session?.access_token,
              {
                expires: new Date(
                  data?.expires_at
                ),
                maxAge: data?.session.expires_in,
              }
            ),
        },
      });
    }
    throw error;
  } catch (error) {
    console.log("error", error);
    return json({error}, { status: 500 });
  }
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
  const [formData, setFormData] = useState<any>({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <BackButton url={"/welcome"} />
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-[30rem] px-3">
        {actionData?.error && (
          <div
            className="mb-4 text-center border border-black-light text-xl text-red-default px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">
             Incorrect email/password !
            </strong>          
          </div>
        )}
          <p className="text-2xl font-medium">Hello there &#9995;</p>
          <p className="text-xl font-thin">
            Please enter your username / email and password to sign in
          </p>
          <Form method="post" className="my-3">
            {LoginFormData?.map((item, index) => {
              const { name, type, label, placeholder } = item;
              const error = actionData?.errors || "";
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
            <Link
              to={"/forgetPassword"}
              className="my-10 flex justify-center text-xl font-semibold text-orange-default"
            >
              Forgot Password
            </Link>
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
                    <FcGoogle size={40} />
                  </span>
                }
              />
              <Button
                backgroundColor="bg-white-default"
                borderColor="border-black-light border-opacity-20"
                label={
                  <span className="flex flex-wrap justify-center gap-1 align-middle">
                    <BsApple size={40} className={"text-black-default"} />
                  </span>
                }
              />
              <Button
                backgroundColor="bg-white-default"
                borderColor="border-black-light border-opacity-20"
                label={
                  <span className="flex flex-wrap justify-center gap-1 align-middle">
                    <BsFacebook size={40} className={"text-blue-default"} />
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
    </>
  );
}