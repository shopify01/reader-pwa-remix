import { redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { signOutUser } from "~/utils/auth";
import supabaseToken from "~/utils/cookieSession.server";

export const action = async({ request }: ActionArgs) => {
  try {
    await signOutUser(request);
    return redirect("/login", {
      headers: {
        "Set-Cookie":
          await supabaseToken.serialize("", {
            maxAge: 0,
          }),
      },
    });
  } catch (error) {
    console.log(error);
  }
};