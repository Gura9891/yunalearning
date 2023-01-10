import React, { useState, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Space, Tooltip } from "antd";
import { BiEdit } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { ImBin } from "react-icons/im";
import "./coursesAdmin.scss";
import useRequest from "hooks/useRequest";
import courseAPI from "apis/courseAPI";
import confirm from "utils/confirmAlert";
import { toast } from "react-toastify";
import toastMessage from "components/Toast/toastMessage";
import Spinner from "components/Spinner";

import defaultImg1 from "assets/images/defaultImg1.png";
import defaultImg2 from "assets/images/defaultImg2.png";
import defaultImg3 from "assets/images/defaultImg3.png";
import defaultImg4 from "assets/images/defaultImg4.png";
import defaultImg5 from "assets/images/defaultImg5.png";

const defaultImg = [
  defaultImg1,
  defaultImg2,
  defaultImg3,
  defaultImg4,
  defaultImg5,
];

const CoursesAdmin = () => {
  const [value, setValue] = useState("");
  const [x, forceUpdate] = useReducer((x) => x + 1, 0);
  const onReload = () => {
    forceUpdate();
  };

  const { data: courses, isLoading } = useRequest(
    () => courseAPI.getCourses(value),
    { deps: [x] }
  );
  const navigate = useNavigate();

  // Table column
  const columns = [
    {
      title: "Mã khoá học",
      dataIndex: "maKhoaHoc",
      key: "maKhoaHoc",
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (_, record) => (
        <div style={{ width: "50px", height: "50px" }}>
          <img
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src={record.hinhAnh}
            alt="movieImg"
            onError={(event) => {
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
      width: "20%",
      render: (text) => <p style={{ color: "blue" }}>{text}</p>,
    },

    {
      title: "Danh mục",
      dataIndex: "danhMuc",
      key: "danhMuc",
    },
    {
      title: "Người tạo",
      dataIndex: "nguoiTao",
      key: "nguoiTao",
      render: (text) => <p style={{ color: "purple" }}>{text}</p>,
    },

    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Chỉnh sửa" placement="top">
            <button
              onClick={() => handleEdit(record.courseInfo)}
              style={{ background: "transparent", cursor: "pointer" }}
            >
              <BiEdit size="18px" color="blue" />
            </button>
          </Tooltip>
          <Tooltip title="Xoá" placement="top">
            <button
              onClick={() => handleRemove(record.maKhoaHoc)}
              style={{ background: "transparent", cursor: "pointer" }}
            >
              <ImBin size="18px" color="red" />
            </button>
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "courseInfo",
      dataIndex: "courseInfo",
      key: "courseInfo",
      hidden: true,
    },
  ].filter((item) => !item.hidden);

  // table data
  const data = courses?.map((course, index) => {
    return {
      key: index,
      maKhoaHoc: course?.maKhoaHoc,
      hinhAnh: course?.hinhAnh,
      tenKhoaHoc: course?.tenKhoaHoc,
      danhMuc: course?.danhMucKhoaHoc.tenDanhMucKhoaHoc,
      nguoiTao: course?.nguoiTao.hoTen,
      courseInfo: course,
    };
  });

  //Search func
  const handleSearchCourseChange = (e) => {
    setValue(e.target.value);
  };

  const handleEnterToSearch = (e) => {
    if (e.key !== "Enter") return;
    onReload();
  };

  const handleSearchByClick = () => {
    onReload();
  };

  const handleEdit = (course) => {
    navigate(`/admin/courses/update/${course.maKhoaHoc}`, { state: course });
  };

  // delete course
  const handleRemove = (courseId) => {
    confirm(
      "Xoá khoá học",
      "Bạn có chắc chắn muốn xoá khoá học này",
      async () => {
        try {
          await courseAPI.removeCourse(courseId);
          toast.success(toastMessage("Xoá thành công"));
          onReload();
        } catch (error) {
          toast.error(toastMessage("Xoá thất bại", error));
        }
      }
    );
  };

  return (
    <div className="admin__courses">
      <div className="head">
        <p className="title">Quản lý khoá học</p>
        <div className="course__tool">
          <div className="search">
            <input
              value={value}
              type="text"
              placeholder="Tìm kiếm..."
              className="search-input"
              spellCheck={false}
              onChange={handleSearchCourseChange}
              onKeyDown={handleEnterToSearch}
            />
            <div className="search-icon" onClick={handleSearchByClick}>
              <BsSearch />
            </div>
          </div>

          <div>
            <button
              className="addCourse__btn"
              onClick={() => navigate("/admin/courses/add")}
            >
              Thêm khoá học
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

export default CoursesAdmin;
