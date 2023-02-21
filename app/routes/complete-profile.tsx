import { useState } from "react";
import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import StepOne from "../container/completeProfile/step1";
import StepTwo from "../container/completeProfile/step2";
import StepThree from "../container/completeProfile/step3";
import StepFour from "../container/completeProfile/step4";
import SignUpPage from "../container/completeProfile/step5";
import { validateConfirmPassword, validateEmail, validatePassword,validateUsername } from "~/Validation/validation";
import { createUser } from "~/utils/auth";

type FormData = {
  fullname: string;
  phone: string;
  dob: string;
  country?: string;
};

type SignUpData = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

type Data = {
  id: number;
  name: string;
};

export async function action({ request }: ActionArgs): Promise<object> {
  try {
    const form = await request.formData();
    const username = form.get("username");
    const email = form.get("email");
    const password = form.get("password");
    const cpassword = form.get("cpassword");
    const gender = form.get("gender");
    const age = form.get("age");
    const genre = form.get("genre");
    const fullname = form.get("fullname");
    const phone = form.get("phone");
    const dob = form.get("dob");

    const formErrors = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password),
      cpassword: validateConfirmPassword(password, cpassword),
    };
    if (Object.values(formErrors).some(Boolean)) {
      return {
        formErrors,
      };
    }

    const fields = {
      username,
      email,
      password,
      gender,
      age,
      genre,
      fullname,
      phone,
      dob,
    };
    const { user, error } = await createUser(fields);

    if (user) {
      return json({ res: user }, { status: 200 });
    }
    throw error;
  } catch (error) {
    console.log("error", error);
    return json({ error }, { status: 500 });
  }
}

const CompleteProfile: React.FC = () => {
  const [gender, setGender] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<null>(null);
  const [genere, setGenere] = useState<Data[]>([]);
  const [countData, setCountData] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    phone: "",
    dob: "",
  });
  const [signUpData, setSignupData] = useState<SignUpData>({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const handleComponent = () => {
    setCountData(countData + 1);
  };

  return (
    <>
      {countData === 1 && (
        <div>
          <StepOne
            handleComponent={handleComponent}
            gender={gender}
            setGender={setGender}
          />
        </div>
      )}
      {countData === 2 && (
        <div>
          <StepTwo
            handleComponent={handleComponent}
            ageGroup={ageGroup}
            setAgeGroup={setAgeGroup}
          />
        </div>
      )}
      {countData === 3 && (
        <div>
          <StepThree
            handleComponent={handleComponent}
            genere={genere}
            setGenere={setGenere}
          />
        </div>
      )}
      {countData === 4 && (
        <div>
          <StepFour
            handleComponent={handleComponent}
            formData={formData}
            setFormData={setFormData}
          />
        </div>
      )}
      {countData === 5 && (
        <div>
          <SignUpPage
            formData={signUpData}
            setFormData={setSignupData}
            group={gender}
            age={ageGroup}
            preference={genere}
            profileData={formData}
          />
        </div>
      )}
    </>
  );
};

export default CompleteProfile;