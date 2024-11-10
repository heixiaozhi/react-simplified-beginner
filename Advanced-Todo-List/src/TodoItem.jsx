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
          {/*this has one bug
            当button放label里的时候，点击处理编辑切换回的时候 会执行上面label中的toggleTodo
            因为 react dom 比较 label没有变，又因为label绑定了input元素，因此事件冒泡会触发toggleTodo
          */}
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
