import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input, Spin } from "antd";
import { useForm, Controller } from "react-hook-form";
import { FaUserAlt } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { closeAuthModal, login } from "modules/Auth/slices/authSlice";
import toastMessage from "components/Toast/toastMessage";
import "./login.scss";

const Login = ({ setLogin }) => {
  useEffect(() => {
    const input = document.getElementById("inputRef");
    if (input) input?.focus({ preventScroll: true, cursor: "start" });
  }, []);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);
  const { handleSubmit, control } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "onTouched",
  });
  const onFinish = async (values) => {
    try {
      await dispatch(login(values)).unwrap();
      toast.success(toastMessage("Đăng nhập thành công"));
      dispatch(closeAuthModal());
    } catch (error) {
      toast.error(toastMessage("Đăng nhập thất bại", error));
    }
  };

  return (
    <div className="login">
      <div className="wrapper">
        <div className="title">Đăng nhập</div>
        <div className="main">
          <Form
            disabled={isLoading}
            name="normal_login"
            className="login-form"
            size="large"
            initialValues={{
              remember: true,
            }}
            onFinish={handleSubmit(onFinish)}
          >
            {/* tài khoản */}
            <Controller
              name="taiKhoan"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Không được để trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Input
                    prefix={<FaUserAlt size={18} />}
                    placeholder="Tài khoản"
                    {...field}
                    id="inputRef"
                    spellCheck={false}
                  />
                </Form.Item>
              )}
            />

            {/* mật khẩu */}
            <Controller
              name="matKhau"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Không được để trống",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <Form.Item
                  validateStatus={error ? "error" : ""}
                  help={error?.message}
                >
                  <Input
                    prefix={<AiFillLock size={18} />}
                    type="password"
                    placeholder="Mật khẩu"
                    {...field}
                    spellCheck={false}
                  />
                </Form.Item>
              )}
            />

            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Ghi nhớ tài khoản</Checkbox>
              </Form.Item>

              <p className="black login-form-forgot" href="">
                Forgot password
              </p>
            </Form.Item>

            <Form.Item>
              <Button
                disabled={isLoading}
                type="primary"
                htmlType="submit"
                className="submit-btn login-form-button"
              >
                Đăng nhập
                {isLoading && <Spin className="spiner__icon" size="large" />}
              </Button>
              hoặc{" "}
              <span className="black" onClick={() => setLogin(false)}>
                Đăng ký tại đây!
              </span>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
