export function TodoItem({ completed, title }) {
  // undfined 和 null 在jsx中渲染为""
  return <li className={completed ? "strike-through" : undefined}>{title}</li>;
}
