import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  user: {
    name: string;
    email: string;
    id: string;
  } | null;
  favoriteMasjids: string[]; // Assuming masjid ids are strings
}

const initialState: UserState = {
  token: null,
  user: null,
  favoriteMasjids: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      const { token, user, favoriteMasjids  } = action.payload;
      state.token = token;
      state.user = user;
      state.favoriteMasjids = favoriteMasjids ;
    },

    addFavouriteMasjid: (state, action: PayloadAction<string>) => {
      state.favoriteMasjids.push(action.payload);
    },

    deleteFavouriteMasjid: (state, action: PayloadAction<string>) => {
      state.favoriteMasjids = state.favoriteMasjids.filter(
        (id) => id !== action.payload
      );
    },
    clearUser: (state, action: PayloadAction<boolean>) => {
      state.token = null;
      state.user = null;
      state.favoriteMasjids = [];
    }, // Reset state to initial state
  },
});

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    latitude: null,
    longitude: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});


export const { setUser, addFavouriteMasjid, deleteFavouriteMasjid, clearUser,  } =
  userSlice.actions;
export default userSlice.reducer;