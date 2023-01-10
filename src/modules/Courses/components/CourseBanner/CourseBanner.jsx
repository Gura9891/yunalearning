import React from "react";
import { useParams } from "react-router-dom";
import design from "assets/images/design-img.jpg";
import "./courseBanner.scss";

import backendImg from "assets/images/backend-img.jpg";
import designImg from "assets/images/design-img.jpg";
import frontendImg from "assets/images/frontend-img.jpg";
import phoneImg from "assets/images/phone-img.jpg";
import fullstackImg from "assets/images/fullstack-img.jpg";
import mindImg from "assets/images/mind-img.jpg";
import useRequest from "hooks/useRequest";
import courseAPI from "apis/courseAPI";
import { Skeleton } from "antd";

const backgroundImg = [
  backendImg,
  designImg,
  phoneImg,
  frontendImg,
  fullstackImg,
  mindImg,
];

const CourseBanner = ({ category, title, background }) => {
  const { data: categories, isLoading } = useRequest(() =>
    courseAPI.getCategory()
  );

  const newCategories = categories?.map((category, index) => {
    return { ...category, background: backgroundImg[index] };
  });

  const categoryItem = newCategories?.find(
    (item) => item?.maDanhMuc === category
  );

  return (
    <div className="course__banner">
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <div className="image">
            <img
              src={background ? background : categoryItem?.background}
              alt="photo"
            />
          </div>
          <div className="course__main">
            <p className="title">{`Khoá học ${
              title ? title : categoryItem?.tenDanhMuc
            } Online`}</p>
            <p className="description">
              {`Tìm kiếm những điều thú vị trong Khoá học ${
                title ? title : categoryItem?.tenDanhMuc
              }`}
            </p>
            <button className="btn btn-primary course-btn">
              Khám phá ngay nào
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseBanner;
