export function TodoItem({ todo, checked, id, handleToggle, handleDelete }) {
  return (
    <>
      <li className="list-item">
        <label className="list-item-label">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => handleToggle(id, e.target.checked)}
            data-list-item-checkbox
          />
          <span data-list-item-text>{todo}</span>
        </label>
        <button onClick={() => handleDelete(id)} data-button-delete>
          Delete
        </button>
      </li>
    </>
  );
}

// <li className="list-item">
//   <label className="list-item-label">
//     <input type="checkbox" checked data-list-item-checkbox />
//     <span data-list-item-text>Item 2</span>
//   </label>
//   <button data-button-delete>Delete</button>
// </li>;
