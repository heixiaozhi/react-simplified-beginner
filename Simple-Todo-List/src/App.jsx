import { AddTodo } from "./AddTodo.jsx";
import { TodoItem } from "./TodoItem.jsx";
import "./styles.css";
import { useState } from "react";

function App() {
  const [todoInput, setTodoInput] = useState("");
  const [todoList, setTodoList] = useState([]);

  // 处理输入框的值
  function handleInput(value) {
    setTodoInput(value);
  }

  // 增加 todo
  function handleClick() {
    // 当输入的是空，直接return
    if (todoInput === "") return;
    setTodoList((current) => {
      return [
        ...current,
        { todo: todoInput, checked: false, id: crypto.randomUUID() },
      ];
    });
    setTodoInput("");
  }

  // 复选框更新
  function handleToggle(id, checked) {
    setTodoList((current) => {
      return current.map((item) => {
        if (item.id === id) return { ...item, checked };
        return item;
      });
    });
  }

  // 删除指定item
  function handleDelete(id) {
    setTodoList((current) => {
      return current.filter((item) => item.id !== id);
    });
  }

  return (
    <>
      {todoList.map((item) => {
        return (
          <TodoItem
            key={item.id}
            {...item}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        );
      })}
      <AddTodo
        todoInput={todoInput}
        handleInput={handleInput}
        handleClick={handleClick}
      />
    </>
  );
}

export default App;
