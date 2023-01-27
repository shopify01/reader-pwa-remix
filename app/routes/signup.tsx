import { Form } from "@remix-run/react";
import Button from "~/components/button";
import Checkbox from "~/components/checkbox";
import Input from "~/components/input";

const SignUp = () => {
    const handleChange = () => {
        
    };
  return (
    <div className="m-auto min-h-full flex-col mt-20 justify-center px-5 sm:max-w-[100%] md:max-w-[40%]">
      <h2 className="text-3xl font-medium">Create an Account</h2>
      <div className="">
        Enter your username, email & password. If you forget it, then you have
        to do forgot pasword.
      </div>
      <Form method="post" className="my-3">
        <div className="mb-6">
          <Input inputType="text" name="username" label="Username" placeholder="Enter Username" value={""} onChange={handleChange} />
          <Input inputType="email" name="email" label="Email" placeholder="Enter Email" value={""} onChange={handleChange} />
          <Input inputType="password" name="password" label="Password" placeholder="Enter password" value={""} onChange={handleChange} />
          <Input inputType="password" name="cpassword" label="Confirm Password" placeholder="Enter Confirm Password" value={""} onChange={handleChange}/>
        </div>
        <div className="mb-20">
          <Checkbox label="Remember me"/>
        </div>
        <div className="">
          <Button label="Sing Up" maxWidth="100%" fontSize="1rem" htmlType="submit"/>
        </div>
      </Form>
    </div>
  );
};
export default SignUp;
