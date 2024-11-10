import { useEffect, useReducer, useState } from "react";
import { ACTION } from "./Action.js";

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.AddNewTodo:
      return [
        ...state,
        {
          name: payload?.name,
          completed: false,
          id: crypto.randomUUID(),
        },
      ];
    case ACTION.ToggleTodo:
      console.log(22);
      return state.map((todo) => {
        if (todo.id === payload?.id)
          return { ...todo, completed: payload?.completed };
        return todo;
      });
    case ACTION.DeleteTodo:
      return state.filter((todo) => todo.id !== payload?.id);
    case ACTION.EditTodo:
      return state.map((todo) => {
        if (todo.id === payload?.id) {
          // 当是保持的时候覆盖name属性
          return { ...todo, name: payload.name };
        }
        return todo;
      });
    default:
      return state;
  }
}

// 自定义 localStorage hook
export default function useLocalStorage(key, InitValue) {
  const [value, dispatch] = useReducer(reducer, InitValue, (InitValue) => {
    const localValue = localStorage.getItem(key);
    if (localValue == null) {
      if (typeof InitValue === "function") {
        return InitValue();
      }
      return InitValue;
    }
    return JSON.parse(localValue);
  });

  useEffect(() => {
    // 当设置为 undefined 清空 localStorage
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      console.log("JSON", JSON.stringify(value));
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, dispatch];
}
