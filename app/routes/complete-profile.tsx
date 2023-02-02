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

export async function action({ request }: ActionArgs) {
  try {
    const form = await request.formData();
    const username = form.get("username");
    const email = form.get("email");
    const password = form.get("password");
    const cpassword = form.get("cpassword");
    console.log("--------------------",username,email, password, cpassword);
    
    const formErrors = {
      username: validateUsername(username),
      email: validateEmail(email),
      password: validatePassword(password),
      cpassword: validateConfirmPassword(password, cpassword),
    };
    if (Object.values(formErrors).some(Boolean))
      return {
        formErrors,
      };
    const fields = {username, email, password}
    const { user, error } = createUser(fields);
    console.log("@@@@",user);
    
    if (user?.status === 201) {
      return json({ user }, { status: 200 });
    }
    throw error;
  } catch (error) {
    console.log("error", error);
    return json({ error }, { status: 500 });
  }
}

const CompleteProfile = () => {
  const [gender, setGender] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<null>(null);
  const [genere, setGenere] = useState<Data[]>([]);
  const [countData, setCountData] = useState(1);
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
  const [signUpData, setSignupData] = useState<{
    username: string;
    email: string;
    password: string;
    cpassword: string;
  }>({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const handleComponent = () => {
    setCountData(countData+1)
  }

  return (
    <> 
      {countData === 1 &&
        <div>
          <StepOne handleComponent={handleComponent} gender={gender} setGender={setGender} />
        </div>}
      {countData === 2  && (
        <div>
          <StepTwo handleComponent={handleComponent} ageGroup={ageGroup} setAgeGroup={setAgeGroup}/>
        </div>
      )}
      { countData === 3  && 
        <div>
          <StepThree handleComponent={handleComponent} genere={genere} setGenere={setGenere} />
        </div>
      }
      {countData === 4  && 
        <div>
          <StepFour handleComponent={handleComponent} formData={formData} setFormData={setFormData} />
        </div>
      }
      {countData === 5  && 
        <div>
          <SignUpPage formData={signUpData} setFormData={setSignupData} group={gender} age={ageGroup} preference={genere} profileData={formData}/>
        </div>
      }
    </>
  );
};

export default CompleteProfile;
