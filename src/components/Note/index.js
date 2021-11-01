import { useState } from "react";
import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import rehypeHighlight from "rehype-highlight";

import { decrementDates } from "../../features/note/noteDateSlice";
import { decrementNotes } from "../../features/note/noteContentSlice";

import EditIcon from "../../images/edit-icon.svg";
import TrashIcon from "../../images/trash-icon.svg";

import "./styles.scss";
import "./highlight-dracula.css";

export function Note({ id, date, content }) {
  let [editMode, setEditMode] = useState(false);
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
        style={{ height: content.length - 60 }}
      ></textarea>
    );
  }

  return (
    <section className="note-container">
      <div className="note-header">
        <span className="note-date">{date}</span>
        <div className="note-options">
          <button
            onClick={() => {
              setEditMode((editMode = !editMode));
              returnDivOrTextarea();
            }}
          >
            <img src={EditIcon} alt="Edit this note" />
          </button>

          <button
            onClick={() => {
              dispatch(decrementNotes(id));
              dispatch(decrementDates(id));
            }}
          >
            <img src={TrashIcon} alt="Remove this note" />
          </button>
        </div>
      </div>
      {returnDivOrTextarea()}
    </section>
  );
}

/* 

<ReactMarkdown
  className="note-content-div"
  children={content}
  remarkPlugins={[remarkGfm, remarkToc]}
  rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
/> 

<textarea
  className="note-content-textarea"
  defaultValue={content}
  style={{ height: content.length - 60 }}
></textarea>

*/
