import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AiFillSetting } from "react-icons/ai";
import { MdAdminPanelSettings, MdLogout } from "react-icons/md";
import { logout } from "modules/Auth/slices/authSlice";
import { toast } from "react-toastify";

import avatar from "assets/images/user-avatar.jpg";
import "./overlayContent.scss";
import toastMessage from "components/Toast/toastMessage";

const OverlayContent = ({ hideDropdown }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const id = toast.loading("Đang đăng xuất...");
    await setTimeout(() => {
      dispatch(logout());
      toast.update(id, {
        render: "Đăng xuất thành công",
        type: "success",
        isLoading: false,
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }, 1300);
  };

  const handleClickInfo = () => {
    navigate("/profile");
    hideDropdown();
  };

  const handleCLickAdmin = () => {
    if (user && user.maLoaiNguoiDung === "GV") {
      navigate("/admin/courses");
    } else {
      toast.warn(
        toastMessage("Truy cập bị từ chối", "Tài khoản không có quyền Quản trị")
      );
    }
  };

  return (
    <div className="overlayContent">
      <div className="wrapper">
        <div className="avatar">
          <div className="avatar-icon">
            <img src={avatar} alt="avatar" />
          </div>
          <p className="name">{user?.hoTen}</p>
        </div>
        <div className="line"></div>

        <div className="profile" onClick={handleClickInfo}>
          <p>Xem trang cá nhân</p>
        </div>

        <div className="main">
          <div className="item" onClick={handleClickInfo}>
            <div className="icon">
              <AiFillSetting size={20} />
            </div>
            <div className="content">Cài đặt & Quyền riêng tư</div>
          </div>
          <div className="item" onClick={handleCLickAdmin}>
            <div className="icon">
              <MdAdminPanelSettings size={20} />
            </div>
            <div className="content">Quyền quản trị</div>
          </div>
          <div className="item" onClick={handleLogout}>
            <div className="icon">
              <MdLogout size={20} />
            </div>
            <div className="content">Đăng xuất</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverlayContent;
