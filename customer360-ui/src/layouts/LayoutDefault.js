import React from "react";
import Header from "../components/layout/Header";

const LayoutDefault = ({ children }) => (
  <>
    <div className="container" style={{ height: "auto" }}>
      <Header navPosition="right" className="reveal-from-bottom" />
    </div>
    <main className="site-content">{children}</main>
  </>
);

export default LayoutDefault;
