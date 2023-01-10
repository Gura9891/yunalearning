import React, { useReducer } from "react";
import "./courseInfo.scss";
import defaultImg1 from "assets/images/defaultImg1.png";
import defaultImg2 from "assets/images/defaultImg2.png";
import defaultImg3 from "assets/images/defaultImg3.png";
import defaultImg4 from "assets/images/defaultImg4.png";
import defaultImg5 from "assets/images/defaultImg5.png";
import { Empty, Skeleton } from "antd";
import { toast } from "react-toastify";
import toastMessage from "components/Toast/toastMessage";
import courseAPI from "apis/courseAPI";
import useRequest from "hooks/useRequest";
import confirm from "utils/confirmAlert";
import authAPI from "apis/authAPI";

const defaultImg = [
  defaultImg1,
  defaultImg2,
  defaultImg3,
  defaultImg4,
  defaultImg5,
];

const CourseInfo = () => {
  const [x, forceUpdate] = useReducer((x) => x + 1, 0);
  const onReload = () => {
    forceUpdate();
  };
  const { data: user, isLoading } = useRequest(() => authAPI.getProfile(), {
    deps: [x],
  });

  const courses = user?.chiTietKhoaHocGhiDanh;

  const { data: handleCancelRegisterCourse } = useRequest(
    (value) => courseAPI.CancelRegisterCourse(value),
    { isManual: true }
  );

  const handleCancelCourse = (courseId) => {
    confirm(
      "Huỷ ghi danh",
      "Bạn có chắc chắn muốn huỷ khoá học này?",
      async () => {
        const values = {
          taiKhoan: user?.taiKhoan,
          maKhoaHoc: courseId,
        };
        try {
          await handleCancelRegisterCourse(values);
          toast.success(
            toastMessage(
              "Huỷ ghi danh thành công",
              "Rất tiếc không được đồng hành cùng bạn!"
            )
          );
          onReload();
        } catch (error) {
          toast.error(toastMessage("Huỷ ghi danh thất bại", error));
        }
      }
    );
  };

  return (
    <div className="course__info">
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="course__info__wrapper">
          {courses && courses.length > 0 ? (
            courses?.map((course, index) => (
              <div key={index} className="col col-2">
                <div className="item">
                  <div className="image">
                    <img
                      src={course.hinhAnh}
                      alt="courseImg"
                      onError={(event) => {
                        event.target.src =
                          defaultImg[Math.floor(Math.random() * 5)];
                        event.onerror = null;
                      }}
                    />
                  </div>

                  <div className="main">
                    <p className="name">{course?.tenKhoaHoc}</p>
                    <StudenCount courseId={course?.maKhoaHoc} />
                  </div>
                  <button
                    className="register-cancel-btn"
                    onClick={() => handleCancelCourse(course?.maKhoaHoc)}
                  >
                    Huỷ ghi danh
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div style={{ width: "100%", textAlign: "center" }}>
              <Empty description="Bạn chưa đăng ký khoá học nào!" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const StudenCount = ({ courseId }) => {
  const { data } = useRequest(() => courseAPI.getCourseStudents(courseId));
  const count = data?.lstHocVien?.length;

  return (
    <>
      <p className="course-count">
        <span style={{ color: "blue", fontWeight: "500" }}>Đã đăng ký:</span>
        {` ${count} học viên`}
      </p>
    </>
  );
};

export default CourseInfo;
