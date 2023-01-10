import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Space, Tooltip } from "antd";
import { BiEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import "./usersAdmin.scss";
import useRequest from "hooks/useRequest";
import confirm from "utils/confirmAlert";
import { toast } from "react-toastify";
import toastMessage from "components/Toast/toastMessage";
import Spinner from "components/Spinner";
import authAPI from "apis/authAPI";

const UsersAdmin = () => {
  const [value, setValue] = useState("");
  const [x, forceUpdate] = useReducer((x) => x + 1, 0);
  const onReload = () => {
    forceUpdate();
  };

  const { data: users, isLoading } = useRequest(() => authAPI.getUsers(value), {
    deps: [x],
  });

  const navigate = useNavigate();

  // Table column
  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
    },

    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: "20%",
      render: (text) => <p style={{ color: "green" }}>{text}</p>,
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },
    {
      title: "SĐT",
      dataIndex: "soDt",
      key: "soDt",
    },
    {
      title: "Loại người dùng",
      dataIndex: "loaiNguoiDung",
      key: "loaiNguoiDung",
    },

    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa" placement="top">
            <button
              onClick={() => handleEdit(record.userInfo)}
              style={{ background: "transparent", cursor: "pointer" }}
            >
              <BiEdit size="18px" color="blue" />
            </button>
          </Tooltip>
          <Tooltip title="Xoá" placement="top">
            <button
              onClick={() => handleRemove(record.taiKhoan)}
              style={{ background: "transparent", cursor: "pointer" }}
            >
              <ImBin size="18px" color="red" />
            </button>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "userInfo",
      dataIndex: "userInfo",
      key: "userInfo",
      hidden: true,
    },
  ].filter((item) => !item.hidden);

  // table data
  const data = users?.map((user, index) => {
    return {
      key: index,
      taiKhoan: user?.taiKhoan,
      hoTen: user?.hoTen,
      email: user?.email,
      soDt: user?.soDt,
      loaiNguoiDung: user?.maLoaiNguoiDung === "GV" ? "Giáo vụ" : "Học viên",
      userInfo: user,
    };
  });

  //Search func
  const handleSearchUserChange = (e) => {
    setValue(e.target.value);
  };

  const handleEnterToSearch = (e) => {
    if (e.key !== "Enter") return;
    onReload();
  };

  const handleSearchByClick = () => {
    onReload();
  };

  const handleEdit = (user) => {
    navigate(`/admin/users/update/${user.taiKhoan}`, { state: user });
  };

  // delete course
  const handleRemove = (taiKhoan) => {
    confirm(
      "Xoá tài khoản",
      "Bạn có chắc chắn muốn xoá tài khoản này",
      async () => {
        try {
          await authAPI.removeUser(taiKhoan);
          toast.success(toastMessage("Xoá thành công"));
          onReload();
        } catch (error) {
          toast.error(toastMessage("Xoá thất bại", error));
        }
      }
    );
  };
  return (
    <div className="admin__users">
      <div className="head">
        <p className="title">Quản lý học viên</p>
        <div className="users__tool">
          <div className="search">
            <input
              value={value}
              type="text"
              placeholder="Tìm kiếm..."
              className="search-input"
              spellCheck={false}
              onChange={handleSearchUserChange}
              onKeyDown={handleEnterToSearch}
            />
            <div className="search-icon" onClick={handleSearchByClick}>
              <BsSearch />
            </div>
          </div>

          <div>
            <button
              className="addUser__btn"
              onClick={() => navigate("/admin/users/add")}
            >
              Thêm tài khoản
            </button>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <div className="movie__table">
          {isLoading ? (
            <Spinner />
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              size="small"
              style={{ color: "blue" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersAdmin;
