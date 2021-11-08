import { createSlice } from "@reduxjs/toolkit";
import store from "store";

function initialValue() {
  let localStorageNotes = [];
  store.each((value, key) => {
    if (key.includes("@jnotes-note/") && value !== null) {
      localStorageNotes.push(value);
    }
  });

  return localStorageNotes;
}

export const noteContentSlice = createSlice({
  name: "noteContent",
  initialState: {
    notes: initialValue(),
  },
  reducers: {
    incrementNotes: (state) => {
      state.notes.push(
        "You may use Markdown to write something in this note.\n\nIf you don't know what is <a href='https://www.markdownguide.org/basic-syntax/' rel='noreferrer' target='_blank'>Markdown basic syntax</a>"
      );

      store.set(
        `@jnotes-note/${state.notes.length - 1}`,
        state.notes[state.notes.length - 1]
      );
    },
    decrementNotes: (state, actions) => {
      const arrayPosition = actions.payload;

      state.notes.splice(arrayPosition, 1);

      store.clearAll();

      state.notes.forEach((value, index) => {
        store.set(`@jnotes-note/${index}`, value);
      });
    },
    changeNoteContent: (state, actions) => {
      let { id, content } = actions.payload;

      if (content === "") return;

      state.notes[id] = content;
      store.set(`@jnotes-note/${id}`, content);
    },
  },
});

export const { incrementNotes, decrementNotes, changeNoteContent } =
  noteContentSlice.actions;
export default noteContentSlice.reducer;
