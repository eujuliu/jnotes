import { createSlice } from "@reduxjs/toolkit";
import store from "store";
import dateFormat from "dateformat";

export const noteDateSlice = createSlice({
  name: "noteDate",
  initialState: {
    dates:
      store.get("@jnotes-notes") === null ? [] : store.get("@jnotes-notes"),
  },
  reducers: {
    incrementDates: (state) => {
      state.dates.push(dateFormat(new Date(), "mmm dd, yyyy hh:MM TT"));
      store.set("@jnotes-notes", state.dates);
    },
    decrementDates: (state, actions) => {
      const arrayPosition = actions.payload;

      state.dates.splice(arrayPosition, 1);
      store.set("@jnotes-notes", state.dates);
    },
  },
});

export const { incrementDates, decrementDates } = noteDateSlice.actions;
export default noteDateSlice.reducer;
