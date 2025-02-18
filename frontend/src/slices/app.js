import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  intimateProducts: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
      state.isLoading = false; // Set loading to false
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIntimateProducts: (state, action) => {
      state.intimateProducts = action.payload;
    },
  },
});

export const { setIsLoggedIn, setLoading, setIntimateProducts } = appSlice.actions;

export default appSlice.reducer;
