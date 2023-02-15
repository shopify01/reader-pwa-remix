import { supabase } from "~/utils.server";

export const createUser = async (data) => {
  const { user, error } = await supabase.auth.signUp({
    username: data?.username,
    email: data?.email,
    password: data?.password,
  });
  console.log("~~~~~~~", user);
  const createProfile = await supabase.from("profiles").upsert({
    id: user?.id,
    full_name: data?.fullname,
    phone_number: data?.phoneNumber,
    birth_date: data?.dob,
    country: data?.country,
    age_group: data?.age,
    gender: data?.gender,
    preference: data?.preference,
  });

  return { user:createProfile, error };
};

export const signInUser = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};


export const forgetPassword = async ({ email}) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  return { data, error };
};