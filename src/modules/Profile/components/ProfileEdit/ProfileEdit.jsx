import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Switch } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import toastMessage from "components/Toast/toastMessage";
import useRequest from "hooks/useRequest";
import authAPI from "apis/authAPI";
import confirm from "utils/confirmAlert";
import { BiEdit, BiShow, BiHide } from "react-icons/bi";
import "./profileEdit.scss";
import { logout, openAuthModal } from "modules/Auth/slices/authSlice";

const ProfileEdit = ({ user, onReload }) => {
  const [modalOpen, SetModalOpen] = useState(false);
  //   console.log(user);
  const handleCancel = () => {
    SetModalOpen(false);
    onReload();
  };
  return (
    <div className="profile__edit">
      <button className="profile-btn" onClick={() => SetModalOpen(true)}>
        <BiEdit />
        <p className="text">Chỉnh sửa</p>
      </button>
      <Modal
        className="profile__edit__modal"
        title="Sửa thông tin cá nhân"
        style={{
          top: 20,
        }}
        open={modalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <ModalContent
          user={user}
          SetModalOpen={SetModalOpen}
          onReload={onReload}
        />
      </Modal>
    </div>
  );
};

const ModalContent = ({ user, SetModalOpen, onReload }) => {
  const [isShowPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(false);

  const dispatch = useDispatch();

  const { data: handleUpdateProfile, isLoading } = useRequest(
    (user) => authAPI.updateProfile(user),
    { isManual: true }
  );

  useEffect(() => {
    if (user?.maLoaiNguoiDung === "GV") {
      setChecked(true);
    }
  }, []);

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      taiKhoan: user?.taiKhoan || "",
      matKhau: user?.matKhau || "",
      hoTen: user?.hoTen || "",
      soDT: user?.soDT || "",
      maNhom: "GP01",
      email: user?.email || "",
      maLoaiNguoiDung: user?.maLoaiNguoiDung || "",
    },
    mode: "onTouched",
  });

  const onFinish = async (values) => {
    confirm(
      "Cập nhật thông tin",
      "Bạn cần đăng nhập lại để thay đổi thông tin?",
      async () => {
        try {
          await handleUpdateProfile(values);
          toast.success(toastMessage("Cập nhật thành công"));
          SetModalOpen(false);
          onReload();
          dispatch(logout());
          dispatch(openAuthModal());
        } catch (error) {
          toast.error(toastMessage("Cập nhật thất bại", error));
        }
      }
    );
  };

  const handleCheckAdmin = (checked) => {
    if (checked === true) {
      setValue("maLoaiNguoiDung", "GV");
      setChecked(true);
    } else {
      setValue("maLoaiNguoiDung", "HV");
      setChecked(false);
    }
  };
  return (
    <Form
      className="profile__edit__form"
      onFinish={handleSubmit(onFinish)}
      labelCol={{ span: 5 }}
      wrapperCol={{ span: 19 }}
      layout="horizontal"
      disabled={isLoading}
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
            <Input type="text" {...field} disabled />
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
            <div className="password-form">
              <Input type={isShowPassword ? "text" : "password"} {...field} />
              <div
                className="password-icon"
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
        render={({ field }) => (
          <Form.Item
            label="Quản trị viên"
            validateStatus={checked ? "success" : ""}
            help={checked ? "Bạn đã trở thành Admin" : ""}
          >
            <Switch
              name={field.name}
              ref={field.ref}
              defaultChecked={user.maLoaiNguoiDung === "GV" ? true : false}
              onChange={handleCheckAdmin}
            />
          </Form.Item>
        )}
      />

      <div className="footer-btn">
        <div
          className="btn btn-secondary"
          onClick={() => {
            SetModalOpen(false);
            onReload();
          }}
        >
          Huỷ
        </div>
        <button type="submit" className="btn btn-primary">
          Cập nhật
        </button>
      </div>
    </Form>
  );
};

export default ProfileEdit;
