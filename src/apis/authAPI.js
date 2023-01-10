import axiosClient from "./axiosClient";

const authAPI = {
  login: (user) => {
    return axiosClient.post("QuanLyNguoiDung/DangNhap", user);
  },

  register: (user) => {
    return axiosClient.post("QuanLyNguoiDung/DangKy", user);
  },

  getProfile: () => {
    return axiosClient.post("QuanLyNguoiDung/ThongTinTaiKhoan");
  },

  updateProfile: (values) => {
    return axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", values);
  },

  getUsers: (name) => {
    return axiosClient.get("QuanLyNguoiDung/LayDanhSachNguoiDung", {
      params: {
        MaNhom: "GP01",
        tuKhoa: name || null,
      },
    });
  },

  removeUser: (nameId) => {
    return axiosClient.delete("QuanLyNguoiDung/XoaNguoiDung", {
      params: {
        TaiKhoan: nameId,
      },
    });
  },

  addUser: (user) => {
    return axiosClient.post("QuanLyNguoiDung/ThemNguoiDung", user);
  },

  updateUser: (user) => {
    return axiosClient.put("QuanLyNguoiDung/CapNhatThongTinNguoiDung", user);
  },
};

export default authAPI;
