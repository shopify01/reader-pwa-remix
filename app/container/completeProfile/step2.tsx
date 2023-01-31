import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import BackButton from "~/components/backButton";
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
  { id:1, label: "14 - 17" },
  { id:2, label: "18 - 24" },
  { id:3, label: "25 - 29" },
  { id:4, label: "30 - 34" },
  { id:5, label: "35 - 39" },
  { id:6, label: "40 - 44" },
  { id:7, label: "45 - 49" },
  { id:8, label: ">=50" },
];

export default function StepTwo() {
  const [ageGroup, setAgeGroup] = useState(null);

  return (
    <>
      <div className="mt-6 mb-10">
        <BackButton url={"/welcome"} />
      </div>
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-[30rem] px-3">
          <p className="text-2xl font-medium">Choose Your Age &#127919;</p>
          <p className="text-xl font-thin">
            Select age range for better content.
          </p>
          <Form method="post" className="my-3">
            <div className="mt-8 flex flex-wrap justify-evenly gap-5">
              {Data?.map((item) => {
                return (
                  <Button
                    key={item.id}
                    label={item.label}
                    value={ageGroup}
                    handleClick={() => setAgeGroup(item.label)}
                    maxWidth="max-w-[200px]"
                    textColor={ item.label === ageGroup ? "text-white-default" : "text-orange-dark"}
                    backgroundColor={ item.label === ageGroup ? "bg-orange-dark" : "bg-white-default"} 
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
    </>
  );
}
