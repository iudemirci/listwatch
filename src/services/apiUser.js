import supabase from "./supabase";

const data = await supabase.auth.getUser();
const userID = data.data.user?.id;

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

export async function setFavouriteItem(item) {
  const { data, error } = await supabase
    .from("users")
    .insert([{ favouriteItem: item }])
    .select();

  if (error)
    throw new Error("There was something wrong with setting favourite item");

  return data;
}

export async function updateFavouriteItem(item) {
  const { data, error } = await supabase
    .from("users")
    .update({ favouriteItem: item })
    .eq("userID", userID)
    .select();

  if (error)
    throw new Error("There was something wrong with updating favourite item");

  return data;
}

export async function getFavouriteItem() {
  let { data: res, error } = await supabase
    .from("users")
    .select("favouriteItem")
    .eq("userID", userID);

  if (error)
    throw new Error("There was something wrong with setting favourite item");

  return res;
}
