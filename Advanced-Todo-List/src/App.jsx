import { createContext, useMemo, useState } from "react";
import "./styles.css";
import Todo from "./Todo.jsx";
import useLocalStorage from "./useLocalStorage.js";
import { ACTION } from "./Action.js";
import { Filter } from "./Filter.jsx";

export const MyContext = createContext("");

function App() {
  const [newTodoName, setNewTodoName] = useState("");
  const [todos, dispatch] = useLocalStorage("todo", []);
  const [filterName, setFilterName] = useState("");
  const [hideName, setHideName] = useState(false);

  function addNewTodo() {
    if (newTodoName === "") return;
    // 添加Todo
    dispatch({ type: ACTION.AddNewTodo, payload: { name: newTodoName } });
    setNewTodoName("");
  }

  function toggleTodo(todoId, completed) {
    console.log("toggleTo");
    // 切换Todo
    dispatch({ type: ACTION.ToggleTodo, payload: { id: todoId, completed } });
  }

  function deleteTodo(todoId) {
    // 删除Todo
    dispatch({ type: ACTION.DeleteTodo, payload: { id: todoId } });
  }

  function editTodo(todoId, value) {
    // 编辑Todo
    dispatch({ type: ACTION.EditTodo, payload: { id: todoId, name: value } });
  }

  const filterNameTodo = useMemo(() => {
    return todos.filter(
      (todo) =>
        todo.name.includes(filterName) && (hideName ? !todo.completed : true),
    );
  }, [filterName, hideName, todos]);

  return (
    <>
      <Filter
        filterName={filterName}
        setFilterName={setFilterName}
        hideName={hideName}
        setHideName={setHideName}
      />
      <MyContext.Provider
        value={{ todos: filterNameTodo, toggleTodo, deleteTodo, editTodo }}
      >
        <Todo />
      </MyContext.Provider>
      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          id="todo-input"
          value={newTodoName}
          onChange={(e) => setNewTodoName(e.target.value)}
        />
        <button onClick={addNewTodo}>Add Todo</button>
      </div>
    </>
  );
}

export default App;
