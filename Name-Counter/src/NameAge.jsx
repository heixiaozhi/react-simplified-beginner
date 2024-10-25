import { useState } from "react";

export function NameAge() {
  const [name, setName] = useState("Jane");
  const [age, setAge] = useState(0);

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <br />
      <button onClick={() => setAge((current) => current - 1)}>-</button>
      {age}
      <button onClick={() => setAge((current) => current + 1)}>+</button>
      <br />
      <span>
        My name is {name} and I am {age} years old
      </span>
    </>
  );
}
