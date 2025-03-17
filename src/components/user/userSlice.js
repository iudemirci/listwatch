import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "Ihsan U.",
  surname: "Demirci",
  lists: [
    {
      list_name: "Watched",
      list_id: 4435340559,
      items: [
        {
          id: 696506,
          title: "Mickey 17",
          userRating: 5,
          posterPath: "/edKpE9B5qN3e559OuMCLZdW1iBZ.jpg",
          createdAt: "2025-03-16T19:03:09.801Z",
        },
      ],
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createList(state, action) {
      if (state.lists.find((list) => list.list_name === action.payload)) return;

      state.lists = [...state.lists, { list_name: action.payload, items: [] }];
    },
    updateListName: {
      prepare(listName, newListName) {
        return {
          payload: {
            listName,
            newListName,
          },
        };
      },
      reducer(state, action) {
        const currList = state.lists.find(
          (list) => list.list_name === action.payload.listName,
        );
        currList.list_name = action.payload.newListName;
      },
    },
    updateRating: {
      prepare(listName, id, newRating) {
        return {
          payload: {
            listName,
            id,
            newRating,
          },
        };
      },
      reducer(state, action) {
        const currItem = state.lists
          .find((list) => list.list_name === action.payload.listName)
          .items.find((item) => item.id === action.payload.id);
        currItem.userRating = action.payload.newRating;
      },
    },
    addToList: {
      prepare(listName, id, posterPath, rating, title) {
        return {
          payload: {
            listName,
            id,
            posterPath,
            rating,
            title,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        const currList = state.lists.find(
          (list) => list.list_name === action.payload.listName,
        );
        currList.items = [
          ...currList.items,
          {
            id: action.payload.id,
            title: action.payload.title,
            userRating: action.payload.rating,
            posterPath: action.payload.posterPath,
            createdAt: action.payload.createdAt,
          },
        ];
      },
    },
    deleteItem: {
      prepare(listName, id) {
        return {
          payload: {
            listName,
            id,
          },
        };
      },
      reducer(state, action) {
        const currItem = state.lists.find(
          (list) => list.list_name === action.payload.listName,
        );

        currItem.items = currItem.items.filter(
          (item) => item.id !== action.payload.id,
        );
      },
    },
  },
});

export const {
  createList,
  addToList,
  updateListName,
  updateRating,
  deleteItem,
} = userSlice.actions;

export default userSlice.reducer;

export const getUsername = (state) => [state.user.name, state.user.surname];
export const getLists = (state) => state.user.lists;
export const getCurrentListIds = (list, id) => (state) =>
  state.user.lists
    .find((l) => l.list_name === list)
    .items.filter((i) => i.id === id);
