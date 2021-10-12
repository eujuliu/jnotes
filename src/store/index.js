import { configureStore } from "@reduxjs/toolkit";
import noteDateReducer from "../features/note/noteDateSlice";
import noteReducer from "../features/note/noteSlice";

export default configureStore({
  reducer: {
    noteDate: noteDateReducer,
    notes: noteReducer,
  },
});
