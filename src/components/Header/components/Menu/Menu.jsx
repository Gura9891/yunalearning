import React, { useState } from "react";
import { Drawer } from "antd";
import { FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaBloggerB } from "react-icons/fa";
import { MdLogout, MdAdminPanelSettings } from "react-icons/md";
import { BsJournalBookmarkFill } from "react-icons/bs";
import avatar from "assets/images/user-avatar.jpg";
import noneAvatar from "assets/images/none-user-avatar.jpg";
import "./menu.scss";
import { logout, openAuthModal } from "modules/Auth/slices/authSlice";
import { toast } from "react-toastify";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

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
    onClose();
  };
  return (
    <>
      <FiMenu onClick={() => setOpen(!open)} />
      <Drawer
        width="300px"
        className="menu-drawer"
        placement="right"
        closable={false}
        headerStyle={{ display: "none" }}
        onClose={onClose}
        open={open}
      >
        <div className="menu__box">
          <div
            className="avatar"
            onClick={() => {
              if (user) {
                navigate("/profile");
                onClose();
              }
              if (!user) {
                dispatch(openAuthModal());
              }
            }}
          >
            <div className="image">
              {user ? (
                <img src={avatar} alt="avatar" />
              ) : (
                <img src={noneAvatar} alt="unknown" />
              )}
            </div>
            <div className="name">
              <p className="username">{user ? user.hoTen : "Đăng nhập"}</p>
              <p className="description">{user ? "Xem trang cá nhân" : ""}</p>
            </div>
          </div>

          <div className="menu-nav">
            <div
              className="item"
              onClick={() => {
                navigate("/");
                onClose();
              }}
            >
              <div className="icon">
                <AiFillHome />
              </div>
              <div className="main">Trang chủ</div>
            </div>
            <div
              className="item"
              onClick={() => {
                navigate("/courses/");
                onClose();
              }}
            >
              <div className="icon">
                <BsJournalBookmarkFill />
              </div>
              <div className="main">Khoá học</div>
            </div>
            <a
              href="https://topdev.vn/blog/"
              target="_blank"
              className="item"
              onClick={() => onClose()}
            >
              <div className="icon">
                <FaBloggerB />
              </div>
              <div className="main">Blog</div>
            </a>
            <div
              className="item"
              onClick={() => {
                navigate("/admin");
                onClose();
              }}
            >
              <div className="icon">
                <MdAdminPanelSettings />
              </div>
              <div className="main">Quyền quản trị</div>
            </div>
            {user && (
              <div className="item">
                <div className="icon">
                  <MdLogout />
                </div>
                <div className="main" onClick={handleLogout}>
                  Đăng xuất
                </div>
              </div>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Menu;
