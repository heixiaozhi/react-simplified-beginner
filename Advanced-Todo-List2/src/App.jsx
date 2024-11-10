import { createContext, useEffect, useReducer, useState } from "react";
import "./styles.css";
import { TodoList } from "./components/TodoList.jsx";
import { AddTodoForm } from "./components/AddTodoForm.jsx";
import { ACTION, TODO_LIST_KEY } from "./utils/helpers.js";
import { FilterTodoForm } from "./components/FilterTodoForm.jsx";

export const TodoContext = createContext();

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTION.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];
    case ACTION.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id)
          return { ...todo, completed: payload.completed };
        return todo;
      });
    case ACTION.DELETE:
      return todos.filter((todo) => todo.id !== payload.id);
    case ACTION.UPDATE:
      return todos.map((todo) => {
        if (todo.id === payload.id) return { ...todo, name: payload.name };
        return todo;
      });
    default:
      // 自抛出错误
      throw new Error(`Don't have ${type} type...`);
  }
}

function App() {
  const [filterName, setFilterName] = useState("");
  const [filterComplete, setFilterComplete] = useState(false);
  // useReducer 管理复杂的状态
  // 默认先从 localStorage 读取值
  const [todos, dispatch] = useReducer(reducer, [], (initValue) => {
    const value = localStorage.getItem(TODO_LIST_KEY);
    if (value == null) {
      return initValue;
    }
    return JSON.parse(value);
  });

  // 当 todos 发生改变时，存储到localStorage
  useEffect(() => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(todos));
  }, [todos]);

  // 根据filterName和filterComplete过滤todos
  // 它是普通的JS的代码，每当 state 更新时它会跟着执行
  const filterTodos = todos.filter((todo) => {
    // 当过滤 true时, todo.completed 也为 true 直接 false;
    if (filterComplete && todo.completed) return false;
    // includes("") 为 true
    return todo.name.includes(filterName);
  });

  function addNewTodo(value) {
    // 分发
    dispatch({ type: ACTION.ADD, payload: { name: value } });
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTION.TOGGLE, payload: { id: todoId, completed } });
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTION.DELETE, payload: { id: todoId } });
  }

  function updateTodo(todoId, name) {
    dispatch({ type: ACTION.UPDATE, payload: { id: todoId, name } });
  }

  return (
    <>
      <TodoContext.Provider
        value={{
          todos: filterTodos,
          addNewTodo,
          toggleTodo,
          deleteTodo,
          updateTodo,
        }}
      >
        <FilterTodoForm
          filterName={filterName}
          setFilterName={setFilterName}
          filterComplete={filterComplete}
          setFilterComplete={setFilterComplete}
        />
        <TodoList />
        <AddTodoForm />
      </TodoContext.Provider>
    </>
  );
}

export default App;
