import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import logo from "assets/images/logo.png";
import "./footer.scss";

const Footer = () => {
  return (
    <div id="footer">
      <div className="wrapper">
        <div className="logo">
          <Link to="/" className="logo">
            <div className="logo-img">
              <img src={logo} alt="logo" />
            </div>
            <p className="logo-title">Elearning</p>
          </Link>
        </div>

        <div className="row">
          <div className="col col-3">
            <div className="policies">
              <p className="title">Chính sách & quy định</p>
              <a href="#" className="item">
                Thoả thuận sử dụng
              </a>
              <a href="#" className="item">
                Quy chế hoạt động
              </a>
              <a href="#" className="item">
                Chính sách bảo mật
              </a>
              <a href="#" className="item">
                Quyền lợi thành viên
              </a>
            </div>
          </div>
          <div className="col col-3">
            <p className="title">Kết nối</p>
            <div className="item">
              <a
                href="https://www.facebook.com/"
                className="facebook-icon"
                target="_blank"
              >
                <FaFacebookSquare size="24px" />
              </a>
              <a
                href="https://www.youtube.com/channel/UCWc3ASTJcb0FeO2oFfX8IDQ"
                className="youtube-icon"
                target="_blank"
              >
                <FaYoutube size="28px" />
              </a>
            </div>
          </div>
          <div className="col col-3 contact">
            <p className="title">Liên hệ</p>
            <a href="mailto:hoangthu7331@gmail.com" className="item">
              <div className="icon">
                <AiOutlineMail />
              </div>
              <div className="content">info@cybersoft.edu.vn</div>
            </a>
            <a href="tel:+84961051014" className="item">
              <div className="icon">
                <AiOutlinePhone />
              </div>
              <div className="content">096 105 10 14</div>
            </a>
            <div className="item">
              <div className="icon">
                <GoLocation />
              </div>
              <div className="content">
112 Cao Thắng, Quận 3, HCM, Ho Chi Minh City, Vietnam</div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p>Coppyright @ 2022 Elearning</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
