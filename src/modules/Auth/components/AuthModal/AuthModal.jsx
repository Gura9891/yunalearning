import React from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import "./authModal.scss";
import Login from "modules/Auth/page/Login";
import Register from "modules/Auth/page/Register";
import { closeAuthModal } from "modules/Auth/slices/authSlice";

const AuthModal = ({ isLogin, setLogin }) => {
  const { isOpenModal } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Modal
      open={isOpenModal}
      onCancel={() => dispatch(closeAuthModal())}
      footer={false}
      width={450}
      style={{ top: 40 }}
      className="authModal"
      zIndex={1003}
    >
      {isLogin ? (
        <Login setLogin={setLogin} />
      ) : (
        <Register setLogin={setLogin} />
      )}
    </Modal>
  );
};

export default AuthModal;
