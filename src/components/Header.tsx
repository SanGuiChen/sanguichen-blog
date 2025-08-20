import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header>
      <div className="container">
        <Link to="/" className="logo">
          SanGuiChen 的博客
        </Link>
        <></>
      </div>
    </header>
  );
};

export default Header;
