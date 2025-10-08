import { Outlet } from "react-router-dom";

import { Children } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen ">
      <Header />
      <div className="flex flex-col flex-1 ">
        <main className="">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
