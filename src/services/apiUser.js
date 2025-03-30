import supabase from "./supabase";

export async function getUserInfo() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return user;
}

export async function login(info) {
  const { data, error } = await supabase.auth.signInWithPassword(info);

  if (error) throw new Error(error);

  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) throw new Error("There was something wrong with logging out");
}

export async function signup(info) {
  const { data, error } = await supabase.auth.signUp({
    email: info.email,
    password: info.password,
    options: {
      emailRedirectTo: null,
      data: {
        username: info.username,
      },
    },
  });
  if (error) throw new Error(error.message);

  const { error: profileError } = await supabase.from("users").insert([
    {
      userID: data.user.id,
      username: info.username,
    },
  ]);
  if (profileError) throw new Error(profileError.message);

  return data;
}

export async function updateFavouriteItem(item) {
  const { data: res, error } = await supabase
    .from("users")
    .update({ favouriteItem: item.i })
    .eq("userID", item.userID)
    .select();

  if (error)
    throw new Error("There was something wrong with updating favourite item");

  return res;
}

export async function getFavouriteItem(userID) {
  let { data: res, error } = await supabase
    .from("users")
    .select("favouriteItem")
    .eq("userID", userID);

  if (error)
    throw new Error("There was something wrong with setting favourite item");

  return res;
}
