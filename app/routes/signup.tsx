import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import Checkbox from "~/components/checkbox";
import Input from "~/components/input";
import Button from "~/components/button";
import { validateConfirmPassword, validateEmail, validatePassword, validateUsername } from "../Validation/validation";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');
  const cpassword = formData.get('cpassword');
  const formErrors = {
		username: validateUsername(username),
		email: validateEmail(email),
		password: validatePassword(password),
		cpassword: validateConfirmPassword(password, cpassword),
	}
	if (Object.values(formErrors).some(Boolean))
		return {
			formErrors,
		}
  return null;
}

export const meta: MetaFunction = () => {
  return {
    title: "Sign Up",
  };
};
const SignupFormData = [
  {
    label: "Username",
    type: "text",
    name: "username",
    placeholder: "Enter Username",
  },
  {
    label: "Email",
    type: "email",
    name: "email",
    placeholder: "Enter Email",
  },
  {
    label: "Password",
    type: "password",
    name: "password",
    placeholder: "Enter password",
  },
  {
    label: "Confirm Password",
    type: "password",
    name: "cpassword",
    placeholder: "Enter Confirm Password",
  },
];

export default function SignUpPage() {
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState<{
    username: string;
    email: string;
    password: string;
    cpassword: string;
  }>({
    username: "",
    email: "",
    password: "",
    cpassword: ""
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <div className="h-auto w-full max-w-[30rem] px-3">
        <p className="text-2xl font-medium">Create an Account &#128272;</p>
        <p className="text-xl font-thin">
          Enter your username, email & password. If you forget it, then you have to do forgot password.
        </p>
        <Form method="post" className="my-3">
          {SignupFormData?.map((item, index) => {
            const { name, type, label, placeholder } = item;
            const error = actionData?.formErrors?.[name] || "";
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
          <div className="py-4 mb-20">
            <Checkbox label="Remember me" />
          </div>
          <Button
            label="Sign Up"
            maxWidth="max-w-full"
            fontSize="text-base"
            type="submit"
          />
        </Form>
      </div>
    </div>
  );
}

