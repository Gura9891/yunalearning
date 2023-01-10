import React from "react";
import { useNavigate } from "react-router-dom";
import courseAPI from "apis/courseAPI";
import useRequest from "hooks/useRequest";
import CourseItem from "./components/CourseItem";

import "./courseShowing.scss";

const status = ["mới", "bán chạy"];

const CourseShowing = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useRequest(() => courseAPI.getCourses());

  const courses = data
    ?.map((course) => {
      return { ...course, trangThai: status[Math.floor(Math.random() * 2)] };
    })
    .slice(6, 14);

  return (
    <>
      <div className="showing">
        <div className="container wrapper">
          <p className="title">Những khoá học nổi bật</p>
          <p className="sub-title">
            Các khóa học trực tuyến tốt nhất cho bạn. Tương tác với các chuyên
            gia hàng đầu và khám phá những bí mật được lưu giữ của thế giới công
            nghệ.
          </p>
          <div className="main">
            <div className="course-list">
              <CourseItem courses={courses} courseshowing={8} />
            </div>
          </div>

          <div className="footer-btn">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/courses")}
            >
              Xem thêm nhiều khoá học
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseShowing;
