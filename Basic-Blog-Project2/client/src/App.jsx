import "./styles.css";
import { Navbar } from "./layouts/Navbar.jsx";
import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";

export function App() {
  const { state } = useNavigation();
  const isLoading = state === "loading";

  return (
    <>
      <Navbar />
      {/*滚动条回到当前位置*/}
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner"></div>}
      <div className={isLoading ? "container loading" : "container"}>
        <Outlet />
      </div>
    </>
  );
}
