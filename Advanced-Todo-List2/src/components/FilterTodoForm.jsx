export function FilterTodoForm({
  filterName,
  setFilterName,
  filterComplete,
  setFilterComplete,
}) {
  // checkbox 的值是 checked
  // text 的值是 value
  return (
    <form className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
        />
      </div>
      <label>
        <input
          type="checkbox"
          checked={filterComplete}
          onChange={(e) => setFilterComplete(e.target.checked)}
        />
        Hide Completed
      </label>
    </form>
  );
}
