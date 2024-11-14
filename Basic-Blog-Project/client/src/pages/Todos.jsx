import { useLoaderData } from "react-router-dom";

export async function loader() {
  const todosData = await fetch("http://127.0.0.1:3000/todos?_limit=20");
  return await todosData.json();
}

export function Todos() {
  const todosData = useLoaderData();
  console.log(todosData);
  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todosData.map((todo) => {
          return todo.completed ? (
            <li className="strike-through" key={todo.id}>
              {todo.title}
            </li>
          ) : (
            <li key={todo.id}>{todo.title}</li>
          );
        })}
      </ul>
    </>
  );
}
