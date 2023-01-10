import React from "react";
import { useNavigate } from "react-router-dom";
import "./category.scss";
import backendImg from "assets/images/backend-img.jpg";
import designImg from "assets/images/design-img.jpg";
import frontendImg from "assets/images/frontend-img.jpg";
import phoneImg from "assets/images/phone-img.jpg";
import fullstackImg from "assets/images/fullstack-img.jpg";
import mindImg from "assets/images/mind-img.jpg";
import useRequest from "hooks/useRequest";
import courseAPI from "apis/courseAPI";

const backgroundImg = [
  backendImg,
  designImg,
  phoneImg,
  frontendImg,
  fullstackImg,
  mindImg,
];
const Category = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useRequest(() => courseAPI.getCategory());
  const categories = data?.map((category, index) => {
    return { ...category, image: backgroundImg[index] };
  });

  return (
    <div className="category">
      <div className="container wrapper">
        <p className="title">Danh mục khoá học</p>
        <div className="main">
          <div className="list">
            {categories?.map((category, index) => (
              <div
                key={index}
                className="col col-6"
                onClick={() => navigate(`/courses/${category?.maDanhMuc}`)}
              >
                <div className="item">
                  <div className="item-bg">
                    <img src={category.image} alt="ảnh" />
                  </div>
                  <div className="content">
                    <p className="item-content">{category.tenDanhMuc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
