import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trailer: "",
};

const featuresMovieSlice = createSlice({
  name: "featuresMovieSlice",
  initialState,
  reducers: {
    getTrailer: (state, action) => {
      state.trailer = action.payload;
    },
  },
});

export const { getTrailer } = featuresMovieSlice.actions;

export default featuresMovieSlice.reducer;
