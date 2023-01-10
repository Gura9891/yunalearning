import React from "react";
import { useNavigate } from "react-router-dom";

import banner from "assets/images/home-banner.jpg";
import "./banner.scss";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="banner">
      <div className="banner__image">
        <img src={banner} alt="banner" />
      </div>

      <div className="banner__content">
        <p className="title">
        Elearning là cộng đồng của những người đam mê lập trình
        </p>
        <p className="content">
          Khám phá hàng trăm khoá học sáng tạo thực hành cùng chúng tôi
        </p>
        <div className="button">
          <button
            className="btn btn-secondary banner-course-btn"
            onClick={() => navigate("/courses")}
          >
            Khám phá khoá học
          </button>
          <a href="tel:+8499999999" className="banner-contact-btn">
            <button className="btn btn-primary">Liên hệ với chúng tôi</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Banner;
