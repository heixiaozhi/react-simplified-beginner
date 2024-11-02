import "./styles.css";
import { checkEmail, checkPassword } from "./validate.js";
import { useMemo, useState } from "react";

export default function UseState() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isCheck, setIsCheck] = useState(false);

  const emailErrors = useMemo(() => {
    return isCheck ? checkEmail(email) : [];
  }, [email, isCheck]);

  const passwordErrors = useMemo(() => {
    return isCheck ? checkPassword(password) : [];
  }, [password, isCheck]);

  function handleSubmit(e) {
    e.preventDefault();
    setIsCheck(true);
    if (!checkEmail(email).length && !checkPassword(password).length) {
      console.log("success");
    }
  }

  return (
    <>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className={`form-group ${emailErrors.length ? "error" : ""}`}>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {emailErrors.length > 0 && (
            <div className="msg">{emailErrors.join(",")}</div>
          )}
        </div>
        <div className={`form-group ${passwordErrors.length ? "error" : ""}`}>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            id="password"
          />
          {passwordErrors.length > 0 && (
            <div className="msg">{passwordErrors.join(",")}</div>
          )}
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}
