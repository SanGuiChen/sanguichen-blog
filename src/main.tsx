import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css"; // 替换为我们的样式文件
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
