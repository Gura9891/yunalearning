import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ImBin } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { Drawer, Tooltip, Table } from "antd";
import { openAuthModal } from "modules/Auth/slices/authSlice";
import { toast } from "react-toastify";
import toastMessage from "components/Toast/toastMessage";
import confirm from "utils/confirmAlert";
import {
  closeCart,
  openCart,
  register,
  removeAll,
  removeCourse,
} from "components/Cart/slices/cartSlice";
import "./cart.scss";
import defaultImg1 from "assets/images/defaultImg1.png";
import defaultImg2 from "assets/images/defaultImg2.png";
import defaultImg3 from "assets/images/defaultImg3.png";
import defaultImg4 from "assets/images/defaultImg4.png";
import defaultImg5 from "assets/images/defaultImg5.png";
import useRequest from "hooks/useRequest";
import courseAPI from "apis/courseAPI";
import axios from "axios";

const defaultImg = [
  defaultImg1,
  defaultImg2,
  defaultImg3,
  defaultImg4,
  defaultImg5,
];

const Cart = () => {
  const { cart, isOpen } = useSelector((state) => state.cart);
  const [cartWidth, setCartWidth] = useState("600px");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data: handleRegisterCourse, isLoading } = useRequest(
    (value) => courseAPI.registerCourse(value),
    { isManual: true }
  );

  useEffect(() => {
    if (window.innerWidth < 768) {
      setCartWidth("100%");
    } else {
      setCartWidth("600px");
    }
  }, []);

  const onClose = () => {
    dispatch(closeCart());
  };

  //   Cart list
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      width: "20%",
      render: (_, record) => (
        <div className="image">
          <img
            src={record.hinhAnh}
            alt="courseImg"
            onErrorCapture={(event) => {
              event.target.src = defaultImg[Math.floor(Math.random() * 5)];
              event.onerror = null;
            }}
          />
        </div>
      ),
    },
    {
      title: "Tên khoá học",
      dataIndex: "tenKhoaHoc",
      key: "tenKhoaHoc",
      width: "40%",
      render: (text) => {
        return <p style={{ fontWeight: 600 }}>{text}</p>;
      },
    },
    {
      title: "Mã khoá học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
      hidden: true,
    },
    {
      title: "Tác giả",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
      width: "20%",
    },
    {
      title: "Thao tác",
      key: "action",
      width: "20%",
      render: (_, record) => {
        return (
          <Tooltip title="Xoá" placement="top">
            <button
              onClick={() => handleRemove(record?.maKhoaHoc)}
              style={{ backgroundColor: "transparent", cursor: "pointer" }}
              className="cart-delete-btn"
            >
              <ImBin size="18px" color="red" />
            </button>
          </Tooltip>
        );
      },
    },
  ].filter((item) => !item.hidden);

  const data = cart?.map((cart, index) => {
    return {
      key: index,
      hinhAnh: cart?.hinhAnh,
      tenKhoaHoc: cart?.tenKhoaHoc,
      maKhoaHoc: cart?.maKhoaHoc,
      nguoiTao: cart?.nguoiTao?.taiKhoan,
    };
  });

  const handleRemove = (courseId) => {
    dispatch(removeCourse(courseId));
  };

  const handleClickRegister = () => {
    if (user) {
      confirm(
        "Ghi danh",
        "Bạn có chắc chắn muốn ghi danh khoá học?",
        async () => {
          const courseId = cart.map((course) => course.maKhoaHoc);
          const registerCourses = courseId.map((course) => {
            return { maKhoaHoc: course, taiKhoan: user.taiKhoan };
          });

          try {
            await axios.all(
              registerCourses.map((course) => handleRegisterCourse(course))
            );
            toast.success(
              toastMessage(
                "Ghi danh thành công",
                "Bạn có thể xem các khoá học đã đăng ký ở Trang cá nhân"
              )
            );
            dispatch(register());
          } catch (error) {
            toast.error(toastMessage("Ghi danh thất bại", error));
          }
        }
      );
    }
    if (!user) {
      confirm("Bạn chưa đăng nhập", "Đăng nhập để đăng ký khoá học?", () => {
        dispatch(openAuthModal());
      });
    }
  };
  return (
    <>
      <div className="cart" onClick={() => dispatch(openCart())}>
        <Badge badgeContent={cart?.length} color="secondary">
          <ShoppingCartIcon
            color="action"
            className="cart-icon"
            fontSize="medium"
          />
        </Badge>
      </div>

      {/* Modal */}

      <Drawer
        width={cartWidth}
        title="Giỏ hàng"
        placement="right"
        onClose={onClose}
        open={isOpen}
        className="cart__wrapper"
      >
        <div className="cart-table">
          {cart.length === 0 ? (
            <p className="nothing-cart">Giỏ hàng trống</p>
          ) : (
            <Table columns={columns} dataSource={data} pagination={false} />
          )}
        </div>
        <div className="footer-btn">
          <button
            className={`btn btn-secondary delete-btn ${
              cart.length === 0 ? "disabled" : ""
            }`}
            onClick={() => dispatch(removeAll())}
          >
            Xoá tất cả
          </button>
          <button
            className={`btn btn-primary register-btn ${
              cart.length === 0 ? "disabled" : ""
            }`}
            onClick={handleClickRegister}
          >
            Ghi danh
          </button>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
