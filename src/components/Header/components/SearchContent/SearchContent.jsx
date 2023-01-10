import React from "react";
import "./searchContent.scss";
import defaultImg1 from "assets/images/defaultImg1.png";
import defaultImg2 from "assets/images/defaultImg2.png";
import defaultImg3 from "assets/images/defaultImg3.png";
import defaultImg4 from "assets/images/defaultImg4.png";
import defaultImg5 from "assets/images/defaultImg5.png";
import { useNavigate } from "react-router-dom";

const defaultImg = [
  defaultImg1,
  defaultImg2,
  defaultImg3,
  defaultImg4,
  defaultImg5,
];

const SearchContent = ({ searchCourses, setValue, setOpen }) => {
  const navigate = useNavigate();
  const handleSearchCourse = (course) => {
    navigate(`/courses/detail/${course?.maKhoaHoc}`, { state: course });
    setValue("");
    setOpen(false);
  };
  return (
    <div className="header-search">
      <div className="wrapper">
        {searchCourses &&
          searchCourses.length > 0 &&
          searchCourses?.map((course, index) => (
            <div
              onClick={() => handleSearchCourse(course)}
              key={index}
              className="row"
            >
              <div className="item">
                <div className="left">
                  <div className="image">
                    <img
                      src={course?.hinhAnh}
                      alt="Anh"
                      onError={(event) => {
                        event.target.src =
                          defaultImg[Math.floor(Math.random() * 5)];
                        event.onerror = null;
                      }}
                    />
                  </div>
                </div>

                <div className="right">
                  <p className="name">{course?.tenKhoaHoc}</p>
                  <p className="teacher">{course?.nguoiTao.hoTen}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchContent;
