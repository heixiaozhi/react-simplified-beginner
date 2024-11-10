import { useContext, useRef, useState } from "react";
import { TodoContext } from "../App.jsx";

export function TodoItem({ id, name, completed }) {
  const { toggleTodo, deleteTodo, updateTodo } = useContext(TodoContext);
  const [isEdit, setIsEdit] = useState(false);
  const editRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    // dispatch
    if (editRef.current.value === "") return;
    updateTodo(id, editRef.current.value);
    setIsEdit(false);
  }

  return (
    <>
      <li className="list-item">
        {isEdit ? (
          <form onSubmit={handleSubmit}>
            <input autoFocus type="text" defaultValue={name} ref={editRef} />
            <button data-button-edit>Save</button>
          </form>
        ) : (
          <>
            <label className="list-item-label">
              <input
                checked={completed}
                type="checkbox"
                data-list-item-checkbox
                onChange={(e) => toggleTodo(id, e.target.checked)}
              />
              <span data-list-item-text>{name}</span>
            </label>
            <button onClick={() => setIsEdit(true)} data-button-edit>
              Edit
            </button>
            <button onClick={() => deleteTodo(id)} data-button-delete>
              Delete
            </button>
          </>
        )}
      </li>
    </>
  );
}
