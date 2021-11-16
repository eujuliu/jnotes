import { createSlice } from "@reduxjs/toolkit";
import store from "store";
import dateFormat from "dateformat";

export const noteDateSlice = createSlice({
  name: "noteDate",
  initialState: {
    dates:
      store.get("@jnotes-dates") === undefined ||
      store.get("@jnotes-dates") === null
        ? []
        : store.get("@jnotes-dates"),
  },
  reducers: {
    incrementDates: (state) => {
      state.dates.push(dateFormat(new Date(), "mmm dd, yyyy hh:MM TT"));
      store.set("@jnotes-dates", state.dates);
    },
    decrementDates: (state, actions) => {
      const arrayPosition = actions.payload;

      state.dates.splice(arrayPosition, 1);
      store.set("@jnotes-dates", state.dates);
    },
  },
});

export const { incrementDates, decrementDates } = noteDateSlice.actions;
export default noteDateSlice.reducer;
