import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  id: string;
  phone_number: string;
  favoriteMasjids: string[]; // Assuming masjid ids are strings
  roles: string[];
  accessMasjids: string[];
}

const initialState: UserState = {
  name: "",
  email: "",
  id: "",
  phone_number: "",
  favoriteMasjids: [],
  roles: [],
  accessMasjids: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return action.payload;
    },
    clearUser: (state) => {
      return initialState;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;