import { createSlice } from "@reduxjs/toolkit";
import { localService } from "../../Services/localService";

const initialState = {
  info: localService.get(),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    setInfo: (state, action) => {
      state.info = action.payload;
    },
  },
});
export const { setInfo } = userReducer.actions;
export default userReducer.reducer;
