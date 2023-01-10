import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsBell } from "react-icons/bs";
import { Dropdown } from "antd";
import { useDispatch } from "react-redux";
import "./adminLayout.scss";
import Sidebar from "modules/Admin/components/Sidebar";
import avatar from "assets/images/user-avatar.jpg";
import { logout } from "modules/Auth/slices/authSlice";
import { toast } from "react-toastify";
import toastMessage from "components/Toast/toastMessage";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!user || user?.maLoaiNguoiDung !== "GV") {
    toast.warning(
      toastMessage(
        "Truy cập thất bại",
        "Bạn không có quyền truy cập vào hệ thống Quản trị"
      )
    );
    return <Navigate to="/" />;
  }

  if (user && window.innerWidth < 992) {
    toast.warn(
      toastMessage(
        "Truy cập thất bại",
        "Vui lòng sử dụng thiết bị có độ phân giải lớn hơn để có trải nghiệm tốt nhất"
      )
    );

    return <Navigate to="/" />;
  }

  return (
    <div className="admin">
      <div className="wrapper">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="content">
          <div className="head-info">
            <div className="left"></div>
            <div className="right">
              <Dropdown
                overlay={
                  <div className="account-dropdown">
                    <div className="item" onClick={() => navigate("/")}>
                      Về trang chủ
                    </div>
                    <div
                      className="item"
                      onClick={() => {
                        dispatch(logout());
                        toast.success(toastMessage("Đăng xuất thành công!"));
                        navigate("/");
                      }}
                    >
                      Đăng xuất
                    </div>
                  </div>
                }
                placement="bottom"
              >
                <div className="account">
                  <div className="avatar">
                    <img src={avatar} alt="avatar" />
                  </div>

                  <p className="name">{user?.hoTen}</p>
                </div>
              </Dropdown>

              <Dropdown
                overlay={
                  <div className="alert-dropdown">
                    <p className="item">Chào mừng {user.hoTen} đến đây!</p>
                  </div>
                }
                placement="bottomRight"
              >
                <div className="alert">
                  <BsBell />
                </div>
              </Dropdown>
            </div>
          </div>
          <div className="main">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
