import {useEffect, useState} from "react"

export function Child() {
  const [age, setAge] = useState(0)
  const [name, setName] = useState("")

  useEffect(() => {
    console.log("渲染")
    console.log("Hi:")
    return () => {
      console.log("see you")
    }
  }, []);

  useEffect(() => {
    console.log(`My name is ${name}, my age is ${age}`)
  }, [age, name]);

  useEffect(() => {
    document.title = name;
    const timeOut = setTimeout(() => {
      console.log(`My name is ${name}`);
    }, 1000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [name]);

  return (
    <div>
      <input type="text" value={name} onChange={e => setName(e.target.value)}/>
      <br/>
      <br/>
      <button onClick={() => setAge(a => a - 1)}>-</button>
      {age}
      <button onClick={() => setAge(a => a + 1)}>+</button>
      <br/>
      <br/>
      My name is {name} and I am {age} years old.
    </div>
  )
}
