import React, { useEffect, useReducer } from "react";
import { FaUserLock } from "react-icons/fa";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { Tabs, Skeleton } from "antd";
import avatar from "assets/images/user-avatar.jpg";
import ProfileInfo from "../components/ProfileInfo";
import CourseInfo from "../components/CourseInfo";
import useRequest from "hooks/useRequest";
import authAPI from "apis/authAPI";
import ProfileEdit from "../components/ProfileEdit";
import "./profile.scss";

const Profile = () => {
  const [x, forceUpdate] = useReducer((x) => x + 1, 0);
  const onReload = () => {
    forceUpdate();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: user, isLoading } = useRequest(() => authAPI.getProfile(), {
    deps: [x],
  });

  return (
    <>
      <div className="profile">
        <div className="wrapper container">
          <div className="left">
            <div className="image">
              <img src={avatar} alt="avatar" />
            </div>

            <div className="name">
              <p className="account">{user?.taiKhoan}</p>
              <p className="username">{user?.hoTen}</p>
              <ProfileEdit user={user} onReload={onReload} />
            </div>
          </div>

          <div className="right">
            <Tabs
              className="right-tabs"
              defaultActiveKey="1"
              items={[
                {
                  label: (
                    <span className="label">
                      <FaUserLock />
                      <span className="text">Tài khoản</span>
                    </span>
                  ),
                  key: "1",
                  children: isLoading ? (
                    <Skeleton />
                  ) : (
                    <ProfileInfo user={user} onReload={onReload} />
                  ),
                },
                {
                  label: (
                    <span className="label">
                      <BsJournalBookmarkFill />
                      <span className="text">Khoá học đã đăng ký</span>
                    </span>
                  ),
                  key: "2",
                  children: <CourseInfo />,
                },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
