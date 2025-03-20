import supabase from "./supabase";

export async function login(info) {
  const { data, error } = await supabase.auth.signInWithPassword(info);

  if (error) throw new Error("There was something wrong with logging");

  return data;
}

export async function getUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error)
    throw new Error("There was something wrong with getting user data");

  return user;
}
