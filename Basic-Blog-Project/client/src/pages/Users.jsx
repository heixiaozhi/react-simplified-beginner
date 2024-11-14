import { Link, useLoaderData } from "react-router-dom";

export async function loader() {
  const usersData = await fetch("http://127.0.0.1:3000/users?_limit=10");
  return await usersData.json();
}

export function Users() {
  const usersData = useLoaderData();
  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {usersData.map((user) => {
          return (
            <div key={user.id} className="card">
              <div className="card-header">{user.name}</div>
              <div className="card-body">
                <div>{user.company.name}</div>
                <div>{user.website}</div>
                <div>{user.email}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`/users/${user.id}`}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
