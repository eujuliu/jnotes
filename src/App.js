import { useSelector, useDispatch } from "react-redux";

import Note from "./components/note";

import { incrementDates } from "./features/note/noteDateSlice";
import { incrementNotes } from "./features/note/noteSlice";

import PlusIcon from "./images/plus-icon.svg";
import MoonIcon from "./images/moon-icon.svg";

import "./styles/global.css";
import "./styles/pages/App.scss";

function App() {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.allNotes);
  const dates = useSelector((state) => state.noteDate.dates);

  return (
    <div className="container">
      <header>
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
            <button onClick={() => {}}>
              <img src={MoonIcon} alt="DarkMode button" />
            </button>
          </div>
        </div>
      </header>
      <main className="note-list">
        {notes.map((value, index) => {
          return (
            <Note key={index} id={index} date={dates[index]} content={value} />
          );
        })}
      </main>
    </div>
  );
}

export default App;
