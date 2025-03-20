import supabase from "./supabase";

export async function createList(list) {
  const { data, error } = await supabase.from("lists").insert([list]).select();

  if (error)
    throw new Error("There was something wrong with creating the list");

  return data;
}

export async function deletelist(id) {
  const { error } = await supabase.from("lists").delete().eq("id", id);

  if (error)
    throw new Error("There was something wrong with deleting the list");
}

export async function getLists() {
  const data = await supabase.auth.getUser();
  const userID = data.data.user.id;

  const { data: lists, error } = await supabase
    .from("lists")
    .select("*")
    .eq("userID", userID);

  if (error) throw new Error("There was something wrong with getting lists");

  return lists;
}

export async function getListItems(listID) {
  let { data: items, error } = await supabase
    .from("items")
    .select("*")
    .eq("listID", listID);

  if (error)
    throw new Error("There was something wrong with getting list items");

  return items;
}

export async function addItemToList(item) {
  const { data, error } = await supabase.from("items").insert([item]).select();

  if (error)
    throw new Error("There was something wrong with adding item to the list");

  return data;
}

export async function deleteItem(id) {
  const { error } = await supabase.from("items").delete().eq("id", id);

  if (error)
    throw new Error("There was something wrong with deleting the item");
}

export async function updateRating(rating, id) {
  console.log(rating, id);
  const { data, error } = await supabase
    .from("items")
    .update({ userRating: rating })
    .eq("id", id)
    .select();

  if (error)
    throw new Error("There was something wrong with updating the rating");

  return data;
}
