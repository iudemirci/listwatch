import toast from "react-hot-toast";
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
  const { data: user, error } = await supabase.auth.signUp({
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

  if (user) {
    const { error: insertWatchlistError } = await supabase
      .from("lists")
      .insert([
        {
          userID: user.user.id,
          listName: "Watchlist",
          username: info.username,
        },
      ]);

    if (insertWatchlistError) console.error(insertWatchlistError);
  }

  return user;
}

export async function setFavouriteItem(item) {
  const data = await supabase.auth.getUser();
  const userID = data.data.user.id;
  if (!userID) return;

  if (item.replace_id) {
    const { error: deleteError } = await supabase
      .from("favourites")
      .delete()
      .eq("userID", userID)
      .eq("id", item.replace_id);

    if (deleteError) {
      toast.dismiss();
      toast.error("Failed to replace favorite item.");
      return;
    }
  }

  const { error } = await supabase.rpc("insert_favorite", {
    p_user_id: userID,
    p_movie_id: item.id,
    p_title: item?.title || item?.name,
    p_poster_path: item.poster_path,
    p_backdrop_path: item.backdrop_path,
    p_type: item?.release_date || item?.release_date === "" ? "movie" : "tv",
  });

  if (error) {
    toast.dismiss();
    toast.error(error.message);
    return;
  }

  toast.dismiss();
  toast.success(`${item.title || item?.name} successfully added`);
}

export async function getFavouriteItems() {
  const data = await supabase.auth.getUser();
  const userID = data.data.user.id;

  const { data: favourites, error } = await supabase
    .from("favourites")
    .select("*")
    .eq("userID", userID);

  if (error)
    throw new Error("There was something wrong with getting favourite items");

  return favourites;
}

export async function deleteFavouriteItem(id) {
  const data = await supabase.auth.getUser();
  const userID = data.data.user.id;

  const { error } = await supabase
    .from("favourites")
    .delete()
    .eq("userID", userID)
    .eq("id", id);

  if (error) toast.error("There was something wrong with removing item");
}
