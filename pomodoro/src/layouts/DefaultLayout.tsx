import { Header } from "../components/Header/Header";
import { Outlet } from "react-router-dom";

export function DefaultLayout() {
  return (
    <div
      style={{
        maxWidth: "74rem",
        height: "calc(100vh - 10rem)",
        margin: "5rem auto",
        padding: "2.5rem",
        backgroundColor: "var(--gray-800)",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
}
