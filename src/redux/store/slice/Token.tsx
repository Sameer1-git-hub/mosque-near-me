import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = "";

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      return action.payload;
      
    },
    clearToken: (state) => {
      return initialState;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export default tokenSlice.reducer;