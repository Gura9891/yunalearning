import UserForm from "modules/Admin/components/UserForm";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./addUser.scss";

const AddUser = () => {
  const navigate = useNavigate();
  return (
    <div className="admin__user__add">
      <div className="head">
        <p className="title">Thêm tài khoản</p>
        <div className="course__tool">
          <div>
            <button
              className="back__btn"
              onClick={() => navigate("/admin/users")}
            >
              Danh sách học viên
            </button>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <UserForm />
      </div>
    </div>
  );
};

export default AddUser;
