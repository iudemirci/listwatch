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

export async function getLastVisited(userID) {
  const { data: res, error } = await supabase
    .from("last_visited")
    .select("*")
    .eq("userID", userID)
    .order("createdAt", { ascending: false })
    .limit(10);

  if (error)
    throw new Error("There was something wrong with fetching last visited");

  return res;
}

export async function addLastVisited(item) {
  // checking if exists
  const { data: existing, error: fetchError } = await supabase
    .from("last_visited")
    .select("id")
    .eq("userID", item.userID)
    .eq("itemID", item.itemID)
    .eq("itemType", item.itemType)
    .limit(1)
    .maybeSingle();

  if (existing?.id) {
    // updating the date
    await supabase
      .from("last_visited")
      .update({ createdAt: new Date().toISOString() })
      .eq("id", existing.id);
    return;
  }

  // inserting if not exists
  const { data, error } = await supabase
    .from("last_visited")
    .insert([item])
    .select();

  if (error)
    throw new Error(
      "There was something wrong with setting adding last visited",
    );

  // checking if more than 10 items
  const { data: allVisits, error: readError } = await supabase
    .from("last_visited")
    .select("id")
    .eq("userID", item.userID)
    .order("createdAt", { ascending: false });

  if (readError) {
    console.error("Failed to fetch all visits:", readError);
    return;
  }

  if (allVisits.length > 10) {
    const idsToDelete = allVisits.slice(10).map((v) => v.id);
    await supabase.from("last_visited").delete().in("id", idsToDelete);
  }
}
