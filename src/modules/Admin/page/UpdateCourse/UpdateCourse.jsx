import CourseForm from "modules/Admin/components/CourseForm";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./updateCourse.scss";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const { state: course } = useLocation();
  return (
    <div className="admin__course__update">
      <div className="head">
        <p className="title">Cập nhật thông tin</p>
        <div className="course__tool">
          <div>
            <button
              className="back__btn"
              onClick={() => navigate("/admin/courses")}
            >
              Danh sách khoá học
            </button>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <CourseForm course={course} />
      </div>
    </div>
  );
};

export default UpdateCourse;
