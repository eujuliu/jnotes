import { createSlice } from "@reduxjs/toolkit";

function addNotesToArray() {
  let localStorageNotes = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(`@jnotes-note/${i}`)) {
      localStorageNotes.push(
        JSON.parse(localStorage.getItem(`@jnotes-note/${i}`))
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
        `You may use Markdown to write something in this note.
        If you don't know what is (Markdown)[https://www.markdownguide.org/basic-syntax/]`
      );

      localStorage.setItem(
        `@jnotes-note/${state.allNotes.length - 1}`,
        JSON.stringify(state.allNotes[state.allNotes.length - 1])
      );
    },
  },
});

export const { incrementNotes, decrementNotes } = noteSlice.actions;
export default noteSlice.reducer;
