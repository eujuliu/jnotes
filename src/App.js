import { useSelector, useDispatch } from "react-redux";
import { increment, decrement } from "./features/note/noteDateSlice";

import PlusIcon from "./images/plus-icon.svg";
import MoonIcon from "./images/moon-icon.svg";
import EditIcon from "./images/edit-icon.svg";
import TrashIcon from "./images/trash-icon.svg";

import "./styles/global.css";
import "./styles/pages/App.scss";

function App() {
  const noteDateCount = useSelector((state) => state.noteDate.dates);

  const dispatch = useDispatch();

  console.log(noteDateCount);
  return (
    <div className="container">
      <header>
        <div className="header-content">
          <h1>jnotes</h1>
          <div className="page-options">
            <button onClick={() => dispatch(increment())}>
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

                  dispatch(decrement(response));
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
