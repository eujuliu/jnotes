import { configureStore } from "@reduxjs/toolkit";
import noteDateReducer from "../features/note/noteDateSlice";

export default configureStore({
  reducer: {
    noteDate: noteDateReducer,
  },
});
