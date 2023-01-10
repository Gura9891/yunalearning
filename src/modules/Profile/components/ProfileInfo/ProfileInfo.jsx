import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import "./profileInfo.scss";

const ProfileInfo = ({ user }) => {
  const [isShowPassword, setShowPassword] = useState(false);

  return (
    <div className="profile__info">
      <div className="profile__info__title">
        <p>Bạn có thể sửa mới thông tin cá nhân trong phần Chỉnh sửa</p>
      </div>

      <div className="profile__info__main">
        <div className="item">
          <p className="item__label">Họ tên</p>
          <p className="item__content">{user?.hoTen}</p>
        </div>
        <div className="item">
          <p className="item__label">Email</p>
          <p className="item__content">{user?.email}</p>
        </div>
        <div className="item">
          <p className="item__label">Số điện thoại</p>
          <p className="item__content">{user?.soDT}</p>
        </div>
        <div className="item">
          <p className="item__label">Tài khoản</p>
          <p className="item__content">{user?.taiKhoan}</p>
        </div>
        <div className="item">
          <p className="item__label">Mật khẩu</p>
          <p className="item__content password">
            {isShowPassword ? user.matKhau : "********"}
          </p>
          <div
            className="item__icon"
            onClick={() => setShowPassword(!isShowPassword)}
          >
            {isShowPassword ? <BiHide /> : <BiShow />}
          </div>
        </div>
        <div className="item">
          <p className="item__label">Loại người dùng</p>
          <p className="item__content">
            {user?.maLoaiNguoiDung === "HV" ? "Học viên" : "Giáo vụ"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
