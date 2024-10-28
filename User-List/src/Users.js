// async function getUsers() {
//   let res = await fetch("https://jsonplaceholder.typicode.com/users");
//   return await res.json();
// }

function getUsers() {
  // return fetch is promise
  
  return fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}

export default getUsers;
