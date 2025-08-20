import React from "react";
import { Link } from "react-router-dom";

interface BackLinkProps {
  to: string;
  label: string;
}

const BackLink: React.FC<BackLinkProps> = ({ to, label }) => {
  return (
    <div className="mt-8 text-center">
      <Link
        to={to}
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        {label}
      </Link>
    </div>
  );
};

export default BackLink;
