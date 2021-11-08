import { useState } from "react";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

import { decrementDates } from "../../features/note/noteDateSlice";
import {
  decrementNotes,
  changeNoteContent,
} from "../../features/note/noteContentSlice";

import EditIconBlack from "../../images/edit-icon-black.svg";
import EditIconWhite from "../../images/edit-icon-white.svg";

import TrashIconBlack from "../../images/trash-icon-black.svg";
import TrashIconWhite from "../../images/trash-icon-white.svg";

import SaveIconBlack from "../../images/save-icon-black.svg";
import SaveIconWhite from "../../images/save-icon-white.svg";

import "./styles.scss";
import "./highlight-dracula.css";

export function Note({ id, date, content, darkMode }) {
  let [editMode, setEditMode] = useState(false);
  let textareaValue = "";
  const dispatch = useDispatch();

  function returnDivOrTextarea() {
    return editMode === false ? (
      <ReactMarkdown
        className="note-content-div"
        children={content}
        remarkPlugins={[remarkGfm, remarkToc]}
        rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
      />
    ) : (
      <textarea
        className="note-content-textarea"
        defaultValue={content}
        onChange={(event) => {
          textareaValue = event.currentTarget.value;
        }}
        style={{ height: content.length / 4 }}
      ></textarea>
    );
  }

  function changeEditModeButton() {
    return editMode === false ? (
      <button
        onClick={() => {
          setEditMode((editMode = !editMode));
          returnDivOrTextarea();
        }}
      >
        {darkMode ? (
          <img src={EditIconWhite} alt="Edit this note" />
        ) : (
          <img src={EditIconBlack} alt="Edit this note" />
        )}
      </button>
    ) : (
      <button
        onClick={() => {
          if (
            window.confirm("Are you sure you want to change this note?") ===
            false
          )
            return;
          dispatch(changeNoteContent({ id, content: textareaValue }));
          setEditMode((editMode = !editMode));
        }}
      >
        {darkMode ? (
          <img src={SaveIconWhite} alt="Save changes" />
        ) : (
          <img src={SaveIconBlack} alt="Save changes" />
        )}
      </button>
    );
  }

  return (
    <section className="note-container">
      <div className="note-header">
        <span className="note-date">{date}</span>
        <div className="note-options">
          {changeEditModeButton()}
          <button
            onClick={() => {
              if (editMode === true) {
                window.alert("Shutdown edit mode to remove this note.");
                return;
              }

              if (
                window.confirm("Are you sure you want to delete this note?") ===
                false
              )
                return;

              dispatch(decrementNotes(id));
              dispatch(decrementDates(id));
            }}
          >
            {darkMode ? (
              <img src={TrashIconWhite} alt="Remove this note" />
            ) : (
              <img src={TrashIconBlack} alt="Remove this note" />
            )}
          </button>
        </div>
      </div>
      {returnDivOrTextarea()}
    </section>
  );
}
