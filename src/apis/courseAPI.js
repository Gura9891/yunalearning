import axiosClient from "./axiosClient";

const courseAPI = {
  getCategory: () => {
    return axiosClient.get("QuanLyKhoaHoc/LayDanhMucKhoaHoc");
  },

  getCourses: (courseName) => {
    return axiosClient.get("QuanLyKhoaHoc/LayDanhSachKhoaHoc", {
      params: {
        MaNhom: "GP01",
        tenKhoaHoc: courseName,
      },
    });
  },

  getCoursesByCategory: (value) => {
    return axiosClient.get("QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc", {
      params: {
        maDanhMuc: value,
        MaNhom: "GP01",
      },
    });
  },

  registerCourse: (value) => {
    return axiosClient.post("QuanLyKhoaHoc/DangKyKhoaHoc", value);
  },

  getCourseStudents: (courseId) => {
    return axiosClient.get("QuanLyKhoaHoc/LayThongTinHocVienKhoaHoc", {
      params: {
        maKhoaHoc: courseId,
      },
    });
  },

  getCourseInfo: (courseId) => {
    return axiosClient.get("QuanLyKhoaHoc/LayThongTinKhoaHoc", {
      params: {
        maKhoaHoc: courseId,
      },
    });
  },

  CancelRegisterCourse: (value) => {
    return axiosClient.post("QuanLyKhoaHoc/HuyGhiDanh", value);
  },

  removeCourse: (courseId) => {
    return axiosClient.delete("QuanLyKhoaHoc/XoaKhoaHoc", {
      params: {
        MaKhoaHoc: courseId,
      },
    });
  },

  addCourse: (course) => {
    return axiosClient.post("QuanLyKhoaHoc/ThemKhoaHoc", course);
  },

  updateCourse: (course) => {
    return axiosClient.put("QuanLyKhoaHoc/CapNhatKhoaHoc", course);
  },
};

export default courseAPI;
