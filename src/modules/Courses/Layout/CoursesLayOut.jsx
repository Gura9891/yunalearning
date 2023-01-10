import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import CourseBreadcrumb from "../components/CourseBreadcrumb";
import { NavLink } from "react-router-dom";
import useRequest from "hooks/useRequest";
import courseAPI from "apis/courseAPI";

const CoursesLayOut = () => {
  const { data: categories, isLoading } = useRequest(() =>
    courseAPI.getCategory()
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { pathname } = useLocation();

  return (
    <>
      <div className="courses">
        <div className="container wrapper">
          {/* breadcrumb */}
          <div className="breadcrumb">
            <CourseBreadcrumb categoryId />
          </div>

          {/* main */}
          <div className="main">
            <div className="courses__sidebar">
              <p className="title">Danh mục</p>
              <div className="inner">
                <NavLink
                  to="/courses/"
                  className={`item ${pathname === "/courses" ? "active" : ""}`}
                >
                  Tất cả khoá học
                </NavLink>
                {categories?.map((item, index) => (
                  <NavLink
                    to={`/courses/${item?.maDanhMuc}`}
                    key={index}
                    className="item"
                  >
                    {item?.tenDanhMuc}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="courses__content">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesLayOut;
