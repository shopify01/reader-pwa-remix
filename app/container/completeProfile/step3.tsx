import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import BackButton from "~/components/backButton";
import Button from "~/components/button";

interface Data {
  label: string;
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const genere = formData.get("genere");
  return genere;
}

export const meta: MetaFunction = () => {
  return {
    title: "Choose Genere",
  };
};
const data: Data[] = [
  { label: "Romance" },
  { label: "Fantasy" },
  { label: "Sci-Fi" },
  { label: "Horror" },
  { label: "Mystery" },
  { label: "Thriller" },
  { label: "Psychology" },
  { label: "Inspiration" },
  { label: "Comedy" },
  { label: "Action" },
  { label: "Adventure" },
  { label: "Comics" },
  { label: "Children's" },
  { label: "Art & Photography" },
  { label: "Food & Drink" },
  { label: "Biography" },
  { label: "Science & Technology" },
  { label: "Guide / How-to" },
  { label: "Travel" },
];

export default function StepThree() {
  const [genere, setGenere] = useState<Data[]>([]);

  const toggleSelection = (item: Data) => {
    const index = genere.indexOf(item);
    if (index === -1) {
      setGenere([...genere, item]);
    } else {
      setGenere(genere.filter(selectedItem => selectedItem !== item));
    }
  };
  return (
    <>
      <div className="mt-6 mb-10 flex items-center">
        <BackButton url={"/welcome"} />
        <div className="m-4 w-full md:flex justify-center ">
          <div className="ml-8 h-3 w-[50%] max-w-[50%] rounded-full border-[0px] bg-grey-light md:w-[40%] md:mr-20">
          {genere.length? (
              <div
                className="h-3 rounded-full border-[0px] bg-orange-dark"
                style={{ width: "60%" }}
              ></div>
            ) : (
              <div
                className="h-3 rounded-full border-[0px] bg-orange-dark"
                style={{ width: "40%" }}
              ></div>
            )}
          </div>
        </div>
      </div>
      <div className="flex min-h-full flex-col items-center justify-center">
        <div className="h-auto w-full max-w-[30rem] px-3">
          <p className="text-2xl font-medium">
            Choose the Book Genre You Like &#128151;
          </p>
          <p className="text-xl font-thin">
            Select your preferred book for better recommendations, or you can
            skip it.
          </p>
          <Form method="post" className="my-3">
            <div className="mt-8 flex flex-wrap justify-evenly gap-5">
              {data?.map((item, index) => {
                return (
                  <Button
                    key={index}
                    label={item.label}
                    value={genere}
                    handleClick={() => toggleSelection(item.label)}
                    maxWidth="max-w-[200px]"
                    textColor={ genere.includes(item.label) ? "text-white-default" : "text-orange-dark"}
                    backgroundColor={ genere.includes(item.label) ? "bg-orange-dark" : "bg-white-default"} 
                  />
                );
              })}
            </div>
            <div className="mt-40 flex justify-evenly gap-4">
              <Button
                label="Skip"
                maxWidth="max-w-[200px]"
                backgroundColor={"bg-orange-light"}
                borderColor={"border-orange-light"}
                textColor={"text-orange-default"}
                fontSize="text-base"
                type="reset"
              />
              <Button
                label="Continue"
                maxWidth="max-w-[200px]"
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
