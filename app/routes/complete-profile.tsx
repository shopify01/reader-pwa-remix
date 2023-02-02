import { useState } from "react";
import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import StepOne from "../container/completeProfile/step1";
import StepTwo from "../container/completeProfile/step2";
import StepThree from "../container/completeProfile/step3";
import StepFour from "../container/completeProfile/step4";
import SignUpPage from "./signup";
import { validatePhoneNumber, validateUsername } from "~/Validation/validation";

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const fullname = form.get("fullname");
  const phone = form.get("phone");
  const formErrors = {
    username: validateUsername(fullname),
    phone: validatePhoneNumber(phone),
  };
  if (Object.values(formErrors).some(Boolean))
    return {
      formErrors,
    };
  return redirect("/signUp");
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
          <StepFour handleComponent={handleComponent} formData={formData} setFormData={setFormData}/>
        </div>
      }
      {countData === 5  && 
        <div>
          <SignUpPage group={gender} age={ageGroup} profileData={formData}/>
        </div>
      }
    </>
  );
};

export default CompleteProfile;
