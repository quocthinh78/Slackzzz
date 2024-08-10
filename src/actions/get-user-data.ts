import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseServerClient } from "@/supabase/supabaseServer";
import supabaseServerClientPages from "@/supabase/supabaseSeverPages";

import { User } from "@/types/app";

export const getUserData = async (): Promise<User | null> => {
  const supabase = supabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);
  if (error) {
    console.log(error);
    return null;
  }
  return data ? data[0] : null;
};

export const getUserDataPages = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<User | null> => {
  const supabase = supabaseServerClientPages(req, res);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    console.log("NO USER", user);
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);

  if (error) {
    console.log(error);
    return null;
  }

  return data ? data[0] : null;
};
