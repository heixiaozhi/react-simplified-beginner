import { NavBar } from "../components/NavBar.jsx";
import { Outlet, useNavigation } from "react-router-dom";
import "../assets/styles/styles.css";

export function Root() {
  const { state } = useNavigation();

  return (
    <>
      <NavBar />
      {state === "loading" && <div className="loading-spinner"></div>}
      <div className={`container ${state === "loading" ? "loading" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}
