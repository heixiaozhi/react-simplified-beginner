export function FormGroup({errorsMessage = "", children}) {
  return (
    <div className={`form-group ${errorsMessage.length > 0 ? "error" : ""}`}>
      {children}
      {errorsMessage.length > 0 && <div className="msg">{errorsMessage}</div>}
    </div>
  )
}
