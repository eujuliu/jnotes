import { createSlice } from "@reduxjs/toolkit";
import dateFormat from "dateformat";

export const noteDateSlice = createSlice({
  name: "noteDate",
  initialState: {
    dates:
      JSON.parse(localStorage.getItem("@jnotes-notes")) === null
        ? []
        : JSON.parse(localStorage.getItem("@jnotes-notes")),
  },
  reducers: {
    increment: (state) => {
      state.dates.push(dateFormat(new Date(), "mmm dd, yyyy hh:MM TT"));
      localStorage.setItem("@jnotes-notes", JSON.stringify(state.dates));
    },
  },
});

export const { increment, decrement } = noteDateSlice.actions;
export default noteDateSlice.reducer;
