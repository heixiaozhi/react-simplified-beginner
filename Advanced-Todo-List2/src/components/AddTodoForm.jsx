import { useContext } from "react";
import { TodoContext } from "../App.jsx";
import { useRef } from "react";

export function AddTodoForm() {
  const newTodoNameRef = useRef(null);
  const { addNewTodo } = useContext(TodoContext);

  function handleSubmit(e) {
    // 防止默认提交刷新
    e.preventDefault();
    // 如果提交的是空的则直接返回
    // 否则添加
    if (newTodoNameRef.current.value === "") return;
    addNewTodo(newTodoNameRef.current.value);
    newTodoNameRef.current.value = "";
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)} id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        {/*autoFocus 专注表单元素*/}
        <input autoFocus type="text" id="todo-input" ref={newTodoNameRef} />
        <button>Add Todo</button>
      </form>
    </>
  );
}
