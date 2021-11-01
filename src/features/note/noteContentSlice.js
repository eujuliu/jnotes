import { createSlice } from "@reduxjs/toolkit";

function initialValue() {
  let localStorageNotes = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(`@jnotes-note/${i}`)) {
      localStorageNotes.push(localStorage.getItem(`@jnotes-note/${i}`));
    }
  }

  localStorageNotes.forEach((value, index, array) => {
    if (value === null) array.splice(index, 1);
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
        "You may use Markdown to write something in this note.\n\nIf you don't know what is <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Markdown basic syntax</a>"
      );

      localStorage.setItem(
        `@jnotes-note/${state.notes.length - 1}`,
        state.notes[state.notes.length - 1]
      );
    },
    decrementNotes: (state, actions) => {
      const arrayPosition = actions.payload;

      state.notes.splice(arrayPosition, 1);

      localStorage.clear();

      state.notes.forEach((value, index) => {
        localStorage.setItem(`@jnotes-note/${index}`, value);
      });
    },
  },
});

export const { incrementNotes, decrementNotes } = noteContentSlice.actions;
export default noteContentSlice.reducer;
