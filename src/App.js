import { useState } from "react";
import store from "store";
import { useSelector, useDispatch } from "react-redux";

import { Note } from "./components/Note";

import { incrementDates } from "./features/note/noteDateSlice";
import { incrementNotes } from "./features/note/noteContentSlice";

import PlusIcon from "./images/plus-icon.svg";
import MoonIcon from "./images/moon-icon.svg";
import SunIcon from "./images/sun-icon.svg";

import "./styles/global.css";
import "./styles/pages/App.scss";

function App() {
  let [darkMode, setDarkMode] = useState(store.get("@jnotes-dark-mode"));
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.noteContent.notes);
  const dates = useSelector((state) => state.noteDate.dates);

  if (darkMode) {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }

  if (!store.get("@jnotes-dark-mode")) {
    store.set("@jnotes-dark-mode", false);
  }

  return (
    <div className="container">
      <header className="page-header">
        <div className="header-content">
          <h1>jnotes</h1>
          <div className="page-options">
            <button
              onClick={() => {
                dispatch(incrementDates());
                dispatch(incrementNotes());
              }}
            >
              <img src={PlusIcon} alt="Add new note" />
            </button>
            <button
              onClick={() => {
                setDarkMode(!darkMode);
                store.set("@jnotes-dark-mode", !store.get("@jnotes-dark-mode"));
              }}
            >
              {darkMode ? (
                <img src={SunIcon} alt="Turn on dark mode" />
              ) : (
                <img src={MoonIcon} alt="Turn off dark mode" />
              )}
            </button>
          </div>
        </div>
      </header>
      <main className="note-list">
        {notes.map((value, index) => {
          return (
            <Note
              key={index}
              id={index}
              date={dates[index]}
              content={value}
              darkMode={darkMode}
            />
          );
        })}
      </main>
    </div>
  );
}

export default App;
