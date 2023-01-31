import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/button";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const gender = formData.get("gender");
  return gender;
}

export const meta: MetaFunction = () => {
  return {
    title: "Choose Age Group",
  };
};
const Data = [
  { label: "14 - 17" },
  { label: "18 - 24" },
  { label: "25 - 29" },
  { label: "25 - 29" },
  { label: "25 - 29" },
  { label: "25 - 29" },
  { label: "25 - 29" },
  { label: "25 - 29" },
];

export default function StepTwo() {
    const [ageGroup, setAgeGroup] = useState();
    const onSelect = (e: any) => {
        setAgeGroup(e)
    };
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <div className="h-auto w-full max-w-[30rem] px-3">
        <p className="text-2xl font-medium">Choose Your Age &#127919;</p>
        <p className="text-xl font-thin">
          Select age range for better content.
        </p>
        <Form method="post" className="my-3">
          <div className="mt-8 flex justify-evenly flex-wrap gap-5">
            {Data?.map((item, index) => {
                return (
                    <Button key={index}
                        label={item.label}
                        value={ageGroup}
                        handleClick={() => onSelect(item.label)}
                        maxWidth="max-w-[200px]"
                        textColor={ageGroup ? "text-white-default": "text-orange-dark"}
                        backgroundColor={ageGroup ? "bg-orange-dark": "bg-white-default"}
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
