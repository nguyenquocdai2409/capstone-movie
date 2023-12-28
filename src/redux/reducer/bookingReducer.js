import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  danhSachGheDangDat: [],
  isDisabled: true,
  classBtnBuyTicket: "bg-zinc-500 cursor-no-drop",
  radioValue: 0,
  isStatusBtnCountinue: true,
  classBtnCountinue: "bg-zinc-500 cursor-no-drop",
};

const bookingReducer = createSlice({
  name: "bookingReducer",
  initialState,
  reducers: {
    addTicket: (state, action) => {
      let index = state.danhSachGheDangDat.findIndex((item) => {
        return item.maGhe === action.payload.maGhe;
      });

      if (index !== -1) {
        //Nếu tìm thấy ghế được chọn trong mảng thì click vào là xoá đi
        state.danhSachGheDangDat.splice(index, 1);
        if (state.danhSachGheDangDat.length === 0) {
          state.radioValue = 0;
          state.isDisabled = true;
          state.classBtnBuyTicket = "bg-zinc-500 cursor-no-drop";
          state.isStatusBtnCountinue = true;
          state.classBtnCountinue = "bg-zinc-500 cursor-no-drop";
        }
      } else {
        state.danhSachGheDangDat.push(action.payload);
        state.danhSachGheDangDat.sort((a, b) => {
          return parseFloat(a.tenGhe - b.tenGhe);
        });
        if (state.danhSachGheDangDat.length !== 0) {
          state.isDisabled = false;
          state.isStatusBtnCountinue = false;
          state.classBtnCountinue = "bg-orange-500 hover:bg-orange-600";
        }
      }
    },
    clearThongTinDatVe: (state, action) => {
      state.danhSachGheDangDat = [];
      state.isDisabled = true;
      state.classBtnBuyTicket = "bg-zinc-500 cursor-no-drop";
      state.radioValue = 0;
      state.classBtnCountinue = "bg-zinc-500 cursor-no-drop";
    },
    handlePayments: (state, action) => {
      state.radioValue = action.payload;
      if (state.radioValue === 0) {
        state.isDisabled = true;
        state.classBtnBuyTicket = "bg-zinc-500 cursor-no-drop";
      } else {
        state.isDisabled = false;
        state.classBtnBuyTicket = "bg-orange-500 hover:bg-orange-600";
      }
    },
  },
});
export const {
  addTicket,
  setThongTinDatVe,
  clearThongTinDatVe,
  handlePayments,
} = bookingReducer.actions;
export default bookingReducer.reducer;
