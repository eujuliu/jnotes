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
    incrementDates: (state) => {
      state.dates.push(dateFormat(new Date(), "mmm dd, yyyy hh:MM TT"));
      localStorage.setItem("@jnotes-notes", JSON.stringify(state.dates));
    },
    decrementDates: (state, actions) => {
      const arrayPosition = actions.payload;

      state.dates.splice(arrayPosition, 1);
      localStorage.setItem("@jnotes-notes", JSON.stringify(state.dates));
    },
  },
});

export const { incrementDates, decrementDates } = noteDateSlice.actions;
export default noteDateSlice.reducer;
