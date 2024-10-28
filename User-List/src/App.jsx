import getUsers from "./Users.js";
import { Item } from "./Item.jsx";
import { useEffect, useState } from "react";

function App() {
  // 使用 map state要是一个[]
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect 用于副作用 网络请求
  useEffect(() => {
    // 第一次显示 Loading
    setIsLoading(true);
    // 使用 promise 的值，需要点 then 中使用
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // let jsx;
  // if (isLoading) {
  //   jsx = <h2>Loading...</h2>;
  // } else {
  //   jsx = users.map((user) => {
  //     // key 保持着列表项的唯一性，目的是保持正确的渲染
  //     return <Item key={user.id} name={user.name} />;
  //   });
  // }

  return (
    <>
      <h1>UserList</h1>
      <ul>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          users.map((user) => {
            // key 保持着列表项的唯一性，目的是保持正确的渲染
            return <Item key={user.id} name={user.name} />;
          })
        )}
      </ul>
    </>
  );
}

export default App;
