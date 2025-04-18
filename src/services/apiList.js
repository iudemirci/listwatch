import supabase from "./supabase";

export async function createList(list) {
  const data = await supabase.auth.getUser();
  const userID = data.data.user.id;
  const username = data.data.user.user_metadata.username;

  const { data: listData, error } = await supabase.rpc("create_list", {
    list_name: list,
    username: username,
    user_id: userID,
  });

  if (error) throw new Error(error.message);

  return listData;
}

export async function deletelist(id) {
  const { error } = await supabase.from("lists").delete().eq("id", id);

  if (error)
    throw new Error("There was something wrong with deleting the list");
}

export async function getLists(global = false) {
  if (global) {
    const { data: lists, error } = await supabase
      .from("lists")
      .select(
        `
      id,
      listName,
      username,
      items(
        *,
        createdAt
      )
    `,
      )
      .neq("listName", "Watchlist")
      .gt("items_count", 0)
      .order("createdAt", { ascending: false })
      .limit(20)
      .limit(5, { foreignTable: "items" });

    if (error)
      throw new Error("There was something wrong with getting global lists");

    return lists;
  }

  const data = await supabase.auth.getUser();
  const userID = data.data.user.id;

  const { data: lists, error } = await supabase
    .from("lists")
    .select("id, listName, items(*)")
    .eq("userID", userID);

  if (error) throw new Error("There was something wrong with getting lists");

  return lists;
}

export async function getSingleList(id) {
  const { data: list, error } = await supabase
    .from("lists")
    .select("id, listName, username, userID, items(*)")
    .eq("id", id);

  if (error) throw new Error("There was something wrong with getting list");

  return list;
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

export async function addItemToList({ listName, item }) {
  const data = await supabase.auth.getUser();
  const userID = data.data.user.id;

  const { data: list, error } = await supabase
    .from("lists")
    .select("*")
    .eq("userID", userID)
    .eq("listName", listName)
    .single();

  const listID = list.listID;

  const { data: existingItem } = await supabase
    .from("items")
    .select("id")
    .eq("listID", listID)
    .eq("id", item.id)
    .maybeSingle();

  if (existingItem) {
    throw new Error(`Item already in ${listName}`);
  } else if (list) {
    const { error: insertError } = await supabase.from("items").upsert(
      [
        {
          listID: listID,
          ...item,
        },
      ],
      {
        onConflict: "listID,id",
      },
    );

    if (insertError) console.error(insertError);
  }
}

export async function deleteItem(id) {
  const { error } = await supabase.from("items").delete().eq("id", id);

  if (error)
    throw new Error("There was something wrong with deleting the item");
}

export async function updateRating(rating, id) {
  const { data, error } = await supabase
    .from("items")
    .update({ userRating: rating })
    .eq("uuid", id)
    .select();

  if (error)
    throw new Error("There was something wrong with updating the rating");

  return data;
}

export async function updateListName(id, newName) {
  const { error } = await supabase
    .from("lists")
    .update({ listName: newName })
    .eq("id", id);

  if (error) {
    throw new Error("Could not rename the list.");
  }
}
