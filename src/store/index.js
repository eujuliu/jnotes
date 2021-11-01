import { configureStore } from "@reduxjs/toolkit";
import noteDateReducer from "../features/note/noteDateSlice";
import noteContentReducer from "../features/note/noteContentSlice";

export default configureStore({
  reducer: {
    noteDate: noteDateReducer,
    noteContent: noteContentReducer,
  },
});
