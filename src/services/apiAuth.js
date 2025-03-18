import supabase from "../services/supabase";

export async function login(info) {
  const { data, error } = await supabase.auth.signInWithPassword(info);

  if (error) throw new Error("There was something wrong with logging");

  return data;
}
