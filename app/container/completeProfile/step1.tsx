import type { MetaFunction } from "@remix-run/node";
import React, { useEffect } from "react";
import { Form } from "@remix-run/react";
import BackButton from "~/components/backButton";
import Button from "~/components/button";
import  RadioButton from "~/components/radioButton";

export const meta: MetaFunction = () => {
  return {
    title: "Choose Gender",
  };
};
const Data = [
  {
    label: "I am male",
  },
  {
    label: "I am female",
  },
  {
    label: "Rather not to say",
  },
];

export default function StepOne({ gender, setGender, handleComponent }) {
  
  return (
    <>
      <div className="mt-6 mb-10 flex items-center">
        <BackButton url={"/welcome"} />
        <div className="m-4 w-full md:flex justify-center ">
          <div className="ml-8 h-3 w-[50%] max-w-[50%] rounded-full border-[0px] bg-grey-light md:w-[40%] md:mr-20">
          {gender.length? (
              <div
                className="h-3 rounded-full border-[0px] bg-orange-dark"
                style={{ width: "20%" }}
              ></div>
            ) : (
              <div
                className="h-3 rounded-full border-[0px] bg-orange-dark"
                style={{ width: "0%" }}
              ></div>
            )}
          </div>
        </div>
      </div>
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-[30rem] px-3">
          <p className="text-2xl font-medium">What is your gender? &#127886;</p>
          <p className="text-xl font-thin">Select gender for better content.</p>
          <Form className="my-3">
            <div className="mt-8">
              {Data?.map((item, index) => {
                return (
                  <RadioButton
                    key={index}
                    label={item.label}
                    value={gender}
                    handleClick={() => setGender(item.label)}
                  />
                );
              })}
            </div>
            <div className="mt-40">
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
