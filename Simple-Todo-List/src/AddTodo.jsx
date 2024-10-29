export function AddTodo({ todoInput, handleInput, handleClick }) {
  return (
    <div id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input
        type="text"
        id="todo-input"
        value={todoInput}
        onChange={(e) => handleInput(e.target.value)}
      />
      <button onClick={handleClick}>Add Todo</button>
    </div>
  );
}
