// googleLoginSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GoogleLoginState {
  name: string | null;
  email: string | null;
  photo: string | null;
}

const initialState: GoogleLoginState = {
  name: null,
  email: null,
  photo: null,
};

const googleLoginSlice = createSlice({
  name: 'googleLogin',
  initialState,
  reducers: {
    setGoogleUserData: (state, action: PayloadAction<GoogleLoginState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearGoogleUserData: (state) => {
      state.name = null;
      state.email = null;
    },
  },
});

export const { setGoogleUserData, clearGoogleUserData } = googleLoginSlice.actions;

export default googleLoginSlice.reducer;
