import React from "react";
import NavTabs from "./NavTabs";
// import { ReactComponent as Logo } from '@svg/logo.svg';
import "@/styles/Header.scss";

const Header: React.FC = () => {
  return (
    <header>
      <a href="/" className="logo">
        {/* <Logo width="100%" height="100%" /> */}
      </a>
      <div className="nav-area">
        <NavTabs />
      </div>
    </header>
  );
};

export default Header;
