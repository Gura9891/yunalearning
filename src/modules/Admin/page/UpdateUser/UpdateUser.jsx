import UserForm from "modules/Admin/components/UserForm";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./updateUser.scss";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { state: user } = useLocation();

  return (
    <div className="admin__user__update">
      <div className="head">
        <p className="title">Cập nhật thông tin</p>
        <div className="user__tool">
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
        <UserForm user={user} />
      </div>
    </div>
  );
};

export default UpdateUser;
