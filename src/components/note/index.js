import { useDispatch } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { decrementDates } from "../../features/note/noteDateSlice";
import { decrementNotes } from "../../features/note/noteSlice";

import EditIcon from "../../images/edit-icon.svg";
import TrashIcon from "../../images/trash-icon.svg";

import "./styles.scss";

export default function Note({ id, date, content }) {
  const dispatch = useDispatch();

  return (
    <section className="note-container">
      <div className="note-header">
        <span className="note-date">{date}</span>
        <div className="note-options">
          <button onClick={() => console.log("Edit!")}>
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
      <ReactMarkdown
        className="note-content"
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      />
    </section>
  );
}
