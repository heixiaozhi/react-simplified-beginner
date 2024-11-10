import { useContext, useRef, useState } from "react";
import { MyContext } from "./App.jsx";

export function TodoItem({ id, name, completed }) {
  const { toggleTodo, deleteTodo, editTodo } = useContext(MyContext);
  const inputRef = useRef(null);
  const [edit, setEdit] = useState(false);

  function handleEdit(id) {
    editTodo(id, inputRef.current.value);
    setEdit(false);
  }

  return (
    <li className="list-item">
      {!edit ? (
        <label className="list-item-label">
          <input
            checked={completed}
            type="checkbox"
            data-list-item-checkbox
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          <span data-list-item-text>{name}</span>
        </label>
      ) : (
        <>
          <label className="list-item-label">
            <input type="text" defaultValue={name} ref={inputRef} />
          </label>
          <button data-button-edit onClick={() => handleEdit(id)}>
            Save
          </button>
        </>
      )}
      <button onClick={() => setEdit(true)} data-button-edit>
        Edit
      </button>
      <button onClick={() => deleteTodo(id)} data-button-delete>
        Delete
      </button>
    </li>
  );
}
