import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer";
import Header from "components/Header";
import "./defaultLayout.scss";

const DefaultLayout = () => {
  return (
    <>
      <Header />
      <div className="outlet__wrapper">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
