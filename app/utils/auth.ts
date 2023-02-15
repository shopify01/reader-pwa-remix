import { supabase } from "~/utils.server";
import supabaseToken from "./cookieSession.server";

const getToken = async (request: Request) => {
const cookieHeader = request.headers.get("Cookie");
return await supabaseToken.parse(cookieHeader);
};

const getUserByToken = async (token: string) => {
const result = await supabase.auth.getUser(token);
return { user: result.user, error: result.error };
};

interface User {
user: any;
}

interface AuthResponse {
user?: User;
}

export const isAuthenticated = async (
request: Request,
validateAndReturnUser: boolean = false
): Promise<boolean | AuthResponse> => {
const token = await getToken(request);
if (!token && !validateAndReturnUser) return false;
if (validateAndReturnUser) {
const result = await getUserByToken(token);
if (result.error) return false;
return { user: result.user };
}
return true;
};

interface SignUpData {
username?: string;
email?: string;
password?: string;
fullname?: string;
phone?: string;
dob?: string;
age?: string;
gender?: string;
genre?: string;
}

interface SignUpResponse {
user?: any;
error?: any;
}

export const createUser = async (data: SignUpData) : Promise<SignUpResponse> => {
const result = await supabase.auth.signUp({
username: data.username,
email: data.email,
password: data.password,
});

const createProfile = await supabase
.from("profiles")
.upsert({
id: result.data.user.id,
full_name: data.fullname,
phone_number: data.phone,
birth_date: data.dob,
age_group: data.age,
gender: data.gender,
preference: data.genre,
});

console.log(createProfile);
return { user: result.data, error: result.error };
};

interface SignInData {
email: string;
password: string;
}

interface SignInResponse {
data?: any;
error?: any;
}

export const signInUser = async (data: SignInData): Promise<SignInResponse> => {
const result = await supabase.auth.signInWithPassword({
email: data.email,
password: data.password,
});
return { data: result.data, error: result.error };
};

export const signOutUser = async (request: Request) => {
  const token = await getToken(request);
  return await supabase.auth.signOut(token);
};

export const forgetPassword = async ({ email }: { email: string }) => {
  
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:3000/reset-password',
  })
  return { data, error };
};

export const resetPassword = async ({ password, cnfpassword}: { password: string, cnfpassword: string }) => {
  const { data, error } = await supabase.auth.updateUser({
    new_password: password,
    cnf_new_password: cnfpassword
  })  
  return { data, error };
};
