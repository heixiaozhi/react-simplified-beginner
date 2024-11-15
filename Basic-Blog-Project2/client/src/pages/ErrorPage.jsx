import { useRouteError } from "react-router-dom";

export function ErrorPage() {
  // 路由内部组件发生的错误
  const error = useRouteError();
  return (
    <>
      <h1>Something Error...</h1>
      {/*import.meta.env.MODE 获取vite项目开发模式*/}
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}
