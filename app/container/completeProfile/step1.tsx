import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/button";
import RadioButton from "~/components/radioButton";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const gender = formData.get("gender");
  return gender;
}

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

export default function StepOne() {
  const [gender, setGender] = useState();

  const onSelect = (e: any) => {
    setGender(e);
  };
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <div className="h-auto w-full max-w-[30rem] px-3">
        <p className="text-2xl font-medium">What is your gender? &#127886;</p>
        <p className="text-xl font-thin">Select gender for better content.</p>
        <Form method="post" className="my-3">
          <div className="mt-8">
            {Data?.map((item, index) => {           
              return (
                <RadioButton
                  key={index}
                  label={item.label}
                  value={gender}
                  handleClick={() => onSelect(item.label)}
                />
              );
            })}
          </div>
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
  );
}
