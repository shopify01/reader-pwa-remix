import type { MetaFunction } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useState } from "react";
import Input from "~/components/input";
import Button from "~/components/button";
import Select from "~/components/select";
import BackButton from "~/components/backButton";
import { MdOutlineModeEditOutline } from "react-icons/md";

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
    name: "dob",
    placeholder: "Enter DOB",
  },
];

export default function StepFour({ formData, setFormData, handleComponent }) {
  
  const actionData = useActionData<typeof action>();
  const [profileImage, setProfileImage] = useState(null);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileSelect = () => {
    document.getElementById("fileInput").click();
  };

  const handleUploadImage = (e: any) => {
    setProfileImage(e.target.files[0]);
  };
  return (
    <>
      <div className="mt-6 mb-10 flex items-center">
        <BackButton url={"/welcome"} />
        <div className="m-4 w-full justify-center md:flex ">
          <div className="ml-8 h-3 w-[50%] max-w-[50%] rounded-full border-[0px] bg-grey-light md:mr-20 md:w-[40%]">
            {formData.length ? (
              <div
                className="h-3 rounded-full border-[0px] bg-orange-dark"
                style={{ width: "80%" }}
              ></div>
            ) : (
              <div
                className="h-3 rounded-full border-[0px] bg-orange-dark"
                style={{ width: "60%" }}
              ></div>
            )}
          </div>
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
                src={
                  profileImage !== null
                    ? profileImage
                    : "https://i.pinimg.com/236x/47/5a/86/475a86177aeedacf8dc7f5e2b4eff61f.jpg"
                }
                class="w-32 rounded-full shadow-lg"
                alt="profile_picture"
              />
               <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleUploadImage}
                />
              <button
                className=" fixed absolute bottom-0 right-0 rounded-md bg-orange-dark"
                onClick={handleFileSelect}
              >
                <MdOutlineModeEditOutline size={24} />
              </button>
            </div>
          </div>
          <Form className="my-3">
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
                handleClick={() => handleComponent()}
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
