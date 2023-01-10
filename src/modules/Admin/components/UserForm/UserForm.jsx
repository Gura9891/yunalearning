import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { toast } from "react-toastify";
import toastMessage from "components/Toast/toastMessage";
import useRequest from "hooks/useRequest";
import authAPI from "apis/authAPI";
import "./userForm.scss";

const { Option } = Select;

const UserForm = ({ user }) => {
  const [isShowPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { data: handleAddUser, isLoading: addLoading } = useRequest(
    (user) => authAPI.addUser(user),
    { isManual: true }
  );

  const { data: handleUpdateUser, isLoading: updateLoading } = useRequest(
    (user) => authAPI.updateUser(user),
    { isManual: true }
  );

  const { handleSubmit, control } = useForm({
    defaultValues: {
      taiKhoan: user ? user.taiKhoan : "",
      matKhau: user ? "Teishe123" : "",
      hoTen: user ? user.hoTen : "",
      soDT: user ? user.soDt : "",
      maNhom: "GP01",
      email: user ? user.email : "",
      maLoaiNguoiDung: user ? user.maLoaiNguoiDung : "",
    },
    mode: "onTouched",
  });

  const onFinish = async (values) => {
    if (!user) {
      try {
        await handleAddUser(values);
        toast.success(toastMessage("Thêm tài khoản thành công"));
        navigate("/admin/users");
      } catch (error) {
        toast.error(toastMessage("Thêm tài khoản thất bại", error));
      }
    } else {
      try {
        await handleUpdateUser(values);
        toast.success(toastMessage("Cập nhật thành công"));
        navigate("/admin/users");
      } catch (error) {
        toast.error(toastMessage("Cập nhật thất bại", error));
      }
    }
  };

  return (
    <Form
      className="user__form"
      onFinish={handleSubmit(onFinish)}
      labelCol={{ span: 3 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      disabled={addLoading}
    >
      {/* Tài khoản */}
      <Controller
        name="taiKhoan"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Không được để trống",
          },
          maxLength: {
            value: 12,
            message: "Nhập tối đa 12 ký tự",
          },
          minLength: {
            value: 4,
            message: "Tối thiểu 4 ký tự",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Tài khoản"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input type="text" {...field} disabled={!!user} />
          </Form.Item>
        )}
      />
      {/*Mật khẩu  */}
      <Controller
        name="matKhau"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Không được để trống",
          },
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
            message:
              "Mật khẩu phải dài ít nhất 8 ký tự, gồm tối thiểu 1 ký tự hoa, 1 ký tự thường và 1 ký tự số",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Mật khẩu"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <div style={{ position: "relative" }}>
              <Input type={isShowPassword ? "text" : "password"} {...field} />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "15px",
                  transform: "translateY(-50%)",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setShowPassword(!isShowPassword)}
              >
                {isShowPassword ? <BiHide size={18} /> : <BiShow size={18} />}
              </div>
            </div>
          </Form.Item>
        )}
      />
      {/* Tên */}
      <Controller
        name="hoTen"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Không được để trống",
          },
          maxLength: {
            value: 12,
            message: "Nhập tối đa 12 ký tự",
          },
          minLength: {
            value: 4,
            message: "Tối thiểu 4 ký tự",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Họ tên"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input type="text" {...field} id="inputRef" />
          </Form.Item>
        )}
      />
      {/*email  */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Không được để trống",
          },
          pattern: {
            value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Email không hợp lệ",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Email"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input type="text" {...field} />
          </Form.Item>
        )}
      />
      {/*SDT  */}
      <Controller
        name="soDT"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Không được để trống",
          },
          pattern: {
            value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
            message: "Số điện thoại không hợp lệ",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Số điện thoại"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Input type="text" {...field} />
          </Form.Item>
        )}
      />
      {/* Admin */}
      <Controller
        name="maLoaiNguoiDung"
        control={control}
        rules={{
          required: {
            value: true,
            message: "Bạn chưa chọn ô này",
          },
        }}
        render={({ field, fieldState: { error } }) => (
          <Form.Item
            label="Loại người dùng"
            validateStatus={error ? "error" : ""}
            help={error?.message}
          >
            <Select
              {...field}
              defaultValue=""
              style={{
                width: 200,
              }}
            >
              <Option value="">Loại người dùng</Option>
              <Option value="GV">Giáo vụ</Option>
              <Option value="HV">Học viên</Option>
            </Select>
          </Form.Item>
        )}
      />

      <Form.Item label="Thao tác">
        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "160px", borderRadius: "15px", padding: "8px" }}
          >
            {user ? "Cập nhật" : "Thêm"}
          </button>
          <div
            className="btn btn-secondary"
            style={{ padding: "8px", width: "100px", marginLeft: "10px" }}
            onClick={() => navigate("/admin/users")}
          >
            Huỷ
          </div>
        </div>
      </Form.Item>
    </Form>
  );
};

export default UserForm;
