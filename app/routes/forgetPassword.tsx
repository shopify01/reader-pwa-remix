import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";

import { validateEmail } from "~/utils";
import Input from "~/components/input";
import Button from "~/components/button";
import BackButton from "~/components/backButton";
export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  if (!validateEmail(email)) {
    return json(
      { errors: { email: "Email  is invalid", password: null } },
      { status: 400 }
    );
  }

  return redirect("/Otp-verify");
}

export const meta: MetaFunction = () => {
  return {
    title: "Forget Password",
  };
};

export default function ForgetPasswordPage() {
  const actionData = useActionData<any>();
  const [formData, setFormData] = useState<{
    email: string;
  }>({
    email: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <BackButton url={"/login"} />
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-[30rem] px-3">
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
}
