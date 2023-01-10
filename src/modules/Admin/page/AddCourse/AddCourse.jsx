import CourseForm from "modules/Admin/components/CourseForm";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./addCourse.scss";

const AddCourse = () => {
  const navigate = useNavigate();

  return (
    <div className="admin__course__add">
      <div className="head">
        <p className="title">Thêm khoá học</p>
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
        <CourseForm />
      </div>
    </div>
  );
};

export default AddCourse;
