import { useSelector, useDispatch } from "react-redux";
import { incrementDates, decrementDates } from "./features/note/noteDateSlice";
import { incrementNotes, decrementNotes } from "./features/note/noteSlice";

import PlusIcon from "./images/plus-icon.svg";
import MoonIcon from "./images/moon-icon.svg";
import EditIcon from "./images/edit-icon.svg";
import TrashIcon from "./images/trash-icon.svg";

import "./styles/global.css";
import "./styles/pages/App.scss";

function App() {
  const dispatch = useDispatch();
  const notesCount = useSelector((state) => state.notes.allNotes);
  const datesCount = useSelector((state) => state.noteDate.dates);

  console.log(notesCount);
  console.log(datesCount);

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
      <ul>
        <li>
          <div className="note-header">
            <span>21 Aug 2021 4:08 PM</span>
            <div className="note-options">
              <button onClick={() => console.log("Edit!")}>
                <img src={EditIcon} alt="Edit this note" />
              </button>

              <button
                onClick={() => {
                  let response = Number(prompt("Which array?"));

                  dispatch(decrementNotes(response));
                  dispatch(decrementDates(response));
                }}
              >
                <img src={TrashIcon} alt="Remove this note" />
              </button>
            </div>
          </div>
          <div className="note-content">
            consectetur adipiscing elit. Vivamus leo ipsum, fermentum rutrum
            faucibus eu, pellentesque at sem. Donec hendrerit, orci ultricies
            laoreet laoreet, neque felis finibus nisi, in sagittis nibh mauris
            sed orci. Phasellus dictum mauris id cursus faucibus. Maecenas
            sapien nibh, mattis a scelerisque quis, pharetra vitae nisi...
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
