import { createSlice } from "@reduxjs/toolkit";

function addNotesToArray() {
  let localStorageNotes = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(`@jnotes-note/${i}`)) {
      toString(
        localStorageNotes.push(localStorage.getItem(`@jnotes-note/${i}`))
      );
    }
  }

  localStorageNotes.forEach((value, index, array) => {
    if (value === null) array.splice(index, 1);
  });

  return localStorageNotes;
}

export const noteSlice = createSlice({
  name: "notes",
  initialState: {
    allNotes: addNotesToArray(),
  },
  reducers: {
    incrementNotes: (state) => {
      state.allNotes.push(
        "You may use Markdown to write something in this note.\n\nIf you don't know what is <a href='https://www.markdownguide.org/basic-syntax/' target='_blank'>Markdown basic syntax</a>"
      );

      localStorage.setItem(
        `@jnotes-note/${state.allNotes.length - 1}`,
        state.allNotes[state.allNotes.length - 1]
      );
    },
    decrementNotes: (state, actions) => {
      const arrayPosition = actions.payload;

      state.allNotes.splice(arrayPosition, 1);

      localStorage.clear();

      state.allNotes.forEach((value, index) => {
        localStorage.setItem(`@jnotes-note/${index}`, value);
      });
    },
  },
});

export const { incrementNotes, decrementNotes } = noteSlice.actions;
export default noteSlice.reducer;
