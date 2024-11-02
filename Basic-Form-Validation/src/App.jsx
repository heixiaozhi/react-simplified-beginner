import { useEffect, useRef, useMemo, useState } from "react";
import "./styles.css";
import { checkEmail, checkPassword } from "./validate.js";

function App() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [isCheck, setIsCheck] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsCheck(true);
    console.log(emailRef.current.value, passwordRef.current.value);

    setEmailErrors(checkEmail(emailRef.current.value));
    setPasswordErrors(checkPassword(passwordRef.current.value));
    if (
      checkEmail(emailRef.current.value).length === 0 &&
      checkPassword(passwordRef.current.value).length === 0
    ) {
      console.log("success");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        {/*error*/}
        <div className={emailErrors.length ? "form-group error" : "form-group"}>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            type="email"
            id="email"
            ref={emailRef}
            onChange={(e) => {
              isCheck ? setEmailErrors(checkEmail(e.target.value)) : undefined;
            }}
          />
          <div
            className="msg"
            style={{
              display: emailErrors.length ? "block" : "none",
            }}
          >
            {emailErrors.join(",")}
          </div>
        </div>
        <div
          className={passwordErrors.length ? "form-group error" : "form-group"}
        >
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            ref={passwordRef}
            type="password"
            id="password"
            onChange={(e) => {
              isCheck
                ? setPasswordErrors(checkPassword(e.target.value))
                : undefined;
            }}
          />
          <div
            className="msg"
            style={{
              display: passwordErrors.length ? "block" : "none",
            }}
          >
            {passwordErrors.join(",")}
          </div>
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
}

export default App;
