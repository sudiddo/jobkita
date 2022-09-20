import React, { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children?: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col flex-1">
      <Header />
      <div className="mt-12 lg:mt-16 flex flex-1">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
