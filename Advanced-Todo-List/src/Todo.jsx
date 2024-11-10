import { TodoItem } from "./TodoItem.jsx";
import { useContext } from "react";
import { MyContext } from "./App.jsx";

export default function Todo() {
  const { todos } = useContext(MyContext);
  return (
    <>
      <ul id="list">
        {todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
      </ul>
    </>
  );
}
