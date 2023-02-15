import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";
import Checkbox from "~/components/checkbox";
import Input from "~/components/input";
import Button from "~/components/button";
import BackButton from "~/components/backButton";
import Modal from "~/components/Modal";
import { resetPassword } from "~/utils/auth";
export async function action({ request }: ActionArgs) {
  try {
    const formData = await request.formData();
    const password = formData.get("password");
    const cnfpassword = formData.get("cnfpassword");
    if (typeof password !== "string" || password.length === 0) {
      return json(
        { errors: { cnfpassword: null, password: "Password is required" } },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return json(
        { errors: { cnfpassword: null, password: "Password is too short" } },
        { status: 400 }
      );
    }
    if (password !== cnfpassword) {
      return json(
        {
          errors: {
            password: null,
            cnfpassword: "Confirm Password did not match with Password",
          },
        },
        { status: 400 }
      );
    }
    const { data, error } = await resetPassword({ password,cnfpassword });
    if (data) {
      console.log(data);
    }
    throw error;
  } catch (error) {
    console.log("error", error);
    return json(error, { status: 500 });
  }
}
const ResetFormData = [
  {
    label: "New Password",
    type: "password",
    name: "password",
    placeholder: "Enter password",
  },
  {
    label: "Confirm New Password",
    type: "password",
    name: "cnfpassword",
    placeholder: "Enter password",
  },
];
export const meta: MetaFunction = () => {
  return {
    title: "Reset Password",
  };
};

export default function ResetPasswordPage() {
  const actionData = useActionData<any>();
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState<any>({
    password: "",
    cnfpassword: "",
  });
  useEffect(() => {
    if (actionData !==undefined ) {
      setOpenModal(true);
    }
  }, [actionData]);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <div className="max-w-[20rem]">
          <p className="text-semibold mb-2 text-center text-xl text-orange-dark">
            Reset PassWord <p>Successful!</p>
          </p>
          <p className="mb-4 text-center text-base font-thin">
            Your password has been successfully changed.
          </p>
          <Button
            label="Go to Home"
            maxWidth="max-w-full"
            fontSize="text-base"
            handleClick={() => redirect("/home")}
          />
        </div>
      </Modal>
      <BackButton url={"/login"} />
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-[30rem] px-3">
          <p className="text-2xl font-medium">Create New Password 🔐</p>
          <p className="text-xl font-thin">Please Create a new Password</p>
          <Form method="post" className="my-3">
            {ResetFormData?.map((item, index) => {
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
            <div className="py-4 mb-40">
              <Checkbox label="Remember me" />
            </div>
            <Button
              label="Continue"
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
