"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabaseServerClient } from "@/supabase/supabaseServer";

export async function login(formData: FormData) {
  const supabase = supabaseServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function registerWithEmail(formData: {
  email: string;
  password: string;
}) {
  const supabase = supabaseServerClient();
  const currentOrigin = process.env.NEXT_PUBLIC_CURRENT_ORIGIN;
  // type-casting here for convenience
  // in practice, you should validate your inputs

  const response = await supabase.auth.signInWithOtp({
    email: formData.email,
    options: {
      emailRedirectTo: `${currentOrigin}`,
    },
  });

  //   if (error) {
  //     redirect("/error");
  //   }

  return JSON.stringify(response);
}
