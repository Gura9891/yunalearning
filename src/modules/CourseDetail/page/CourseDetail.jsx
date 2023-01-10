import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { Tooltip } from "antd";
import { AiOutlineEye } from "react-icons/ai";
import { GoCalendar } from "react-icons/go";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Import file css cho carousel
// import required modules
import { Pagination, Autoplay, Keyboard } from "swiper";
import { useDispatch, useSelector } from "react-redux";
import "./courseDetail.scss";
import defaultImg1 from "assets/images/defaultImg1.png";
import defaultImg2 from "assets/images/defaultImg2.png";
import defaultImg3 from "assets/images/defaultImg3.png";
import defaultImg4 from "assets/images/defaultImg4.png";
import defaultImg5 from "assets/images/defaultImg5.png";
import useRequest from "hooks/useRequest";
import courseAPI from "apis/courseAPI";
import { useEffect } from "react";
import { addCourses } from "components/Cart/slices/cartSlice";
import confirm from "utils/confirmAlert";
import { openAuthModal } from "modules/Auth/slices/authSlice";
import { toast } from "react-toastify";
import toastMessage from "components/Toast/toastMessage";

const defaultImg = [
  defaultImg1,
  defaultImg2,
  defaultImg3,
  defaultImg4,
  defaultImg5,
];
const CourseDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { state: course } = useLocation();
  const categoryId = course?.danhMucKhoaHoc?.maDanhMucKhoahoc;
  const { data: courses } = useRequest(
    () => courseAPI.getCoursesByCategory(categoryId),
    { deps: [course] }
  );

  const { data: handleRegisterCourse } = useRequest(
    (value) => courseAPI.registerCourse(value),
    { isManual: true }
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [course]);

  const handleClickRegister = () => {
    if (user) {
      confirm(
        "Ghi danh",
        "Bạn có chắc chắn muốn ghi danh khoá học?",
        async () => {
          const value = {
            maKhoaHoc: course?.maKhoaHoc,
            taiKhoan: user?.taiKhoan,
          };
          try {
            await handleRegisterCourse(value);
            toast.success(
              toastMessage(
                "Ghi danh thành công",
                "Bạn có thể xem các khoá học đã đăng ký ở Trang cá nhân"
              )
            );
          } catch (error) {
            toast.error(toastMessage("Ghi danh thất bại", error));
          }
        }
      );
    }
    if (!user) {
      confirm("Bạn chưa đăng nhập", "Đăng nhập để đăng ký khoá học?", () => {
        dispatch(openAuthModal());
      });
    }
  };

  return (
    <>
      <div className="course-detail">
        <div className="wrapper container">
          <div className="breadcrumb">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/" className="course-url">
                  Trang chủ
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to="/courses/" className="course-url">
                  Các khoá học
                </Link>
              </Breadcrumb.Item>

              <Breadcrumb.Item>
                <p className="course-url">{course?.tenKhoaHoc}</p>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="main">
            <div className="image">
              <img
                src={course?.hinhAnh}
                alt="hinhAnh"
                onError={(event) => {
                  event.target.src = defaultImg[Math.floor(Math.random() * 5)];
                  event.onerror = null;
                }}
              />
            </div>

            <div className="content">
              <div className="item">
                <div className="name">
                  <p>{course?.tenKhoaHoc}</p>
                </div>

                <div className="author">
                  <div className="avatar">
                    <img
                      src="https://nld.mediacdn.vn/sKb9EZSQLZblqgVZUilshbE7HvXloc/Image/2012/11/1_6c107.jpg"
                      alt="avatar"
                    />
                  </div>

                  <div className="author-name">
                    <p>{`${course?.nguoiTao?.hoTen} - ${course?.nguoiTao?.tenLoaiNguoiDung}`}</p>
                  </div>
                </div>
              </div>

              <div className="footer-btn">
                <button
                  className="btn btn-primary register-btn"
                  onClick={handleClickRegister}
                >
                  Ghi danh
                </button>
                <button
                  className="btn btn-secondary cart-add-btn"
                  onClick={() => dispatch(addCourses(course))}
                >
                  Thêm giỏ hàng
                </button>
              </div>
            </div>
          </div>

          <div className="course-info">
            <div className="course-bg">
              <div className="title">
                <p>Chi tiết khoá học</p>
              </div>

              <div className="info">
                <div className="info-item desciption">
                  <div className="inner">
                    <p>{course?.moTa}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="label">
                    <p>Người tạo:</p>
                  </div>
                  <div className="inner">
                    <p>{`${course?.nguoiTao?.hoTen} - ${course?.nguoiTao?.tenLoaiNguoiDung}`}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="label">
                    <p>Ngày tạo:</p>
                  </div>
                  <div className="inner">
                    <p>{course?.ngayTao}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="label">
                    <p>Lượt xem:</p>
                  </div>
                  <div className="inner">
                    <p>{`${course?.luotXem} lượt xem`}</p>
                  </div>
                </div>
                <div className="info-item">
                  <div className="label">
                    <p>Số lượng học viên:</p>
                  </div>
                  <div className="inner">
                    <p>{`${Math.floor(Math.random() * 3000)} người`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="related-course">
            <div className="title">
              <p>Khoá học liên quan</p>
            </div>

            <div className="inner">
              <Swiper
                breakpoints={{
                  0: {
                    slidesPerView: 1.5,
                  },

                  576: {
                    slidesPerView: 2.5,
                  },
                  768: {
                    slidesPerView: 3.5,
                  },
                  992: {
                    slidesPerView: 5.5,
                  },
                }}
                keyboard={{
                  enabled: true,
                }}
                speed={1000}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                }}
                slidesPerView={5}
                slidesPerGroupSkip={1}
                spaceBetween={10}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                modules={[Pagination, Autoplay, Keyboard]}
                className="mySwiper"
              >
                {courses?.map((course, index) => (
                  <SwiperSlide key={index}>
                    <div className="item">
                      <div
                        className="image"
                        onClick={() =>
                          navigate(`/courses/detail/${course.maKhoaHoc}`, {
                            state: course,
                          })
                        }
                      >
                        <img
                          className="img"
                          src={course?.hinhAnh}
                          alt="Anh"
                          onError={(event) => {
                            event.target.src =
                              defaultImg[Math.floor(Math.random() * 5)];
                            event.onerror = null;
                          }}
                        />
                      </div>

                      <div className="content">
                        <div className="head">
                          <div className="statis">
                            <Tooltip title="Người xem" placement="topLeft">
                              <div className="left">
                                <div className="icon">
                                  <AiOutlineEye />
                                </div>
                                <span>{course?.luotXem}</span>
                              </div>
                            </Tooltip>
                            <Tooltip title="Ngày tạo" placement="topRight">
                              <div className="right">
                                <div className="icon">
                                  <GoCalendar />
                                </div>
                                <span>{course?.ngayTao}</span>
                              </div>
                            </Tooltip>
                          </div>
                          <span
                            className="item-title"
                            onClick={() =>
                              navigate(`/courses/detail/${course.maKhoaHoc}`, {
                                state: course,
                              })
                            }
                          >
                            <span className="value">{course?.tenKhoaHoc}</span>
                          </span>
                        </div>
                        <p className="mid">{course?.moTa}</p>
                        <div className="foot">
                          <p className="author">{`Bởi ${course?.nguoiTao?.hoTen}`}</p>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
