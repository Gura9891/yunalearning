import React, { useEffect } from "react";
import { Form, Input, Button, Spin } from "antd";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "./register.scss";
import useRequest from "hooks/useRequest";
import authAPI from "apis/authAPI";
import toastMessage from "components/Toast/toastMessage";

const Register = ({ setLogin }) => {
  useEffect(() => {
    const input = document.getElementById("inputRef");
    if (input) input?.focus({ preventScroll: true, cursor: "start" });
  }, []);

  const { data: handleRegister, isLoading } = useRequest(
    (user) => authAPI.register(user),
    { isManual: true }
  );

  const { handleSubmit, control } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      soDT: "",
      maNhom: "GP01",
      email: "",
    },
    mode: "onTouched",
  });

  const onFinish = async (values) => {
    try {
      await handleRegister(values);
      toast.success(
        toastMessage("Đăng ký thành công", "Vui lòng đăng nhập để tiếp tục")
      );
      setLogin(true);
    } catch (error) {
      toast.error(toastMessage("Đăng ký thất bại", error));
    }
  };
  return (
    <div className="register">
      <div className="wrapper">
        <div className="title">
          <p>Đăng ký</p>
        </div>

        <div className="main">
          <Form
            onFinish={handleSubmit(onFinish)}
            layout="vertical"
            disabled={isLoading}
          >
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
                  <Input
                    type="text"
                    {...field}
                    id="inputRef"
                    spellCheck={false}
                  />
                </Form.Item>
              )}
            />

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
                  <Input type="text" {...field} spellCheck={false} />
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
                  <Input type="password" {...field} />
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
                  <Input type="text" {...field} spellCheck={false} />
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
                  <Input type="text" {...field} spellCheck={false} />
                </Form.Item>
              )}
            />

            <Form.Item>
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className="submit-btn login-form-button"
              >
                Đăng ký
                {isLoading && <Spin className="spiner__icon" size="large" />}
              </Button>
              Bạn đã có tài khoản{" "}
              <span className="black" onClick={() => setLogin(true)}>
                Đăng nhập ngay!
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
