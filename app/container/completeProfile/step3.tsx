import type { ActionArgs, MetaFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useState } from "react";
import Button from "~/components/button";

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
const Data = [
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
  const [genere, setGenere] = useState();
  const onSelect = (e: any) => {
    setGenere(e);
  };
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <div className="h-auto w-full max-w-[30rem] px-3">
        <p className="text-2xl font-medium">
          Choose the Book Genre You Like &#128151;
        </p>
        <p className="text-xl font-thin">
          Select your preferred book for better recommendations, or you can skip
          it.
        </p>
        <Form method="post" className="my-3">
          <div className="mt-8 flex flex-wrap justify-evenly gap-5">
            {Data?.map((item, index) => {
              return (
                <Button
                  key={index}
                  label={item.label}
                  value={genere}
                  handleClick={() => onSelect(item.label)}
                  maxWidth="max-w-[200px]"
                  textColor={genere ? "text-white-default" : "text-orange-dark"}
                  backgroundColor={
                    genere ? "bg-orange-dark" : "bg-white-default"
                  }
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
  );
}
