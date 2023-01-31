import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import Input from "~/components/input";
import Button from "~/components/button";
import Select from "~/components/select";
import { validatePhoneNumber, validateUsername } from "~/Validation/validation";
import BackButton from "~/components/backButton";
import { MdOutlineModeEditOutline } from "react-icons/md";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const fullname = formData.get("fullname");
  const phone = formData.get("phone");
  const formErrors = {
    username: validateUsername(fullname),
    phone: validatePhoneNumber(phone),
  };
  if (Object.values(formErrors).some(Boolean))
    return {
      formErrors,
    };
  return null;
}

export const meta: MetaFunction = () => {
  return {
    title: "Complete Profile",
  };
};
const Data = [
  {
    label: "Full Name",
    type: "text",
    name: "fullname",
    placeholder: "Enter Your Name",
  },
  {
    label: "Phone Number",
    type: "number",
    name: "phone",
    placeholder: "Enter Phone Number",
  },
  {
    label: "Date of Birth",
    type: "date",
    name: "date",
    placeholder: "Enter DOB",
  },
];

export default function StepFour() {
  const actionData = useActionData<typeof action>();
  const [formData, setFormData] = useState<{
    fullname: string;
    phone: string;
    dob: string;
    country: string;
  }>({
    fullname: "",
    phone: "",
    dob: "",
    country: "",
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  return (
    <>
      <div className="mt-6 mb-10 flex items-center">
        <BackButton url={"/welcome"} />
        <div className="bg-grey-light h-3 max-w-[50%] w-[50%] border-[0px] rounded-full ml-8">
          <div className="bg-orange-dark h-3 border-[0px] rounded-full" style={{ width: "40%" }}></div>
        </div>
      </div>
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-[30rem] px-3">
          <p className="text-2xl font-medium">
            Complete Your Profile? &#128203;
          </p>
          <p className="text-xl font-thin">
            Don't worry, only you can see your personal data. No one else will
            be able to see it.
          </p>
          <div className="w-25 my-8 flex justify-center">
            <div className="relative">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/8.webp"
                class="w-32 rounded-full shadow-lg"
                alt="Avatar"
              />
              <button
                type="file"
                className=" fixed absolute bottom-0 right-0 rounded-md bg-orange-dark"
              >
                <MdOutlineModeEditOutline size={24} />
              </button>
            </div>
          </div>
          <Form method="post" className="my-3">
            {Data?.map((item, index) => {
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
            <Select
              name="country"
              label="Country"
              placeholder="Select Country"
              value={formData.country}
              onChange={handleChange}
            />
            <div className="mt-20">
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
