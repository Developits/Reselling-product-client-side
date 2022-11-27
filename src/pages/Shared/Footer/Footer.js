import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer items-center p-4 bg-neutral text-neutral-content">
      <div className="items-center grid-flow-col">
        <p>Logo</p>
        <p>Copyright © 2022 - All right reserved</p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <Link>youtube</Link>
        <Link>Facebook</Link>
        <Link>Twitter</Link>
      </div>
    </footer>
  );
};

export default Footer;
