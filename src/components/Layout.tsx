import React, { type ReactNode } from "react";
import Header from "./Header.tsx";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <div className="container">{children}</div>
      </main>
      <footer>
        <div className="container">
          © {new Date().getFullYear()} SanGuiChen 的博客. 保留所有权利.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
