import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducer/userReducer";
import bookingReducer from "./reducer/bookingReducer";
import spinnerSlice from "./reducer/spinnerSlice";
import featuresMovieSlice from "./reducer/featuresMovieSlice";

export const store = configureStore({
  reducer: { userReducer, bookingReducer, spinnerSlice, featuresMovieSlice },
});
