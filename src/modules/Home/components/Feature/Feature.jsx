import React from "react";
import { GrCertificate } from "react-icons/gr";
import { BsSpeedometer } from "react-icons/bs";
import { MdOndemandVideo } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { GiGiftOfKnowledge, GiTeacher } from "react-icons/gi";
import "./feature.scss";

const Feature = () => {
  return (
    <div className="feature">
      <div className="container wrapper">
        <div className="title">
          <p>Những điều bạn có thể mong đợi từ khóa học</p>
        </div>
        <div className="main">
          <div className="col col-2">
            <div className="item">
              <div className="icon">
                <GiTeacher />
              </div>
              <div className="content">
                <h3>Học từ những giảng viên chuyên nghiệp</h3>
                <p>
                  Tìm hiểu các phương pháp và kỹ thuật giá trị được giải thích
                  bởi các giảng viên hàng đầu trong lĩnh vực công nghệ.
                </p>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="item">
              <div className="icon">
                <BsSpeedometer />
              </div>
              <div className="content">
                <h3>Học theo tốc độ của bạn</h3>
                <p>
                  Thưởng thức học ở nhà mà không cần lịch trình với một phương
                  pháp dễ làm theo. Bạn có thể tự thiết lập tốc độ học của riêng
                  bạn.
                </p>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="item">
              <div className="icon">
                <MdOndemandVideo />
              </div>
              <div className="content">
                <h3>Nhận trải nghiệm tốt nhất</h3>
                <p>
                  Video có chất lượng tốt nhất. Với quyền truy cập không giới
                  hạn, bạn có thể xem chúng nhiều lần nếu cần để hoàn thiện kỹ
                  năng của mình.
                </p>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="item">
              <div className="icon">
                <IoIosPeople />
              </div>
              <div className="content">
                <h3>Chia sẻ kiến thức và kinh nghiệm</h3>
                <p>
                  Đặt câu hỏi, phản hồi hoặc đưa ra giải pháp. Chia sẻ kinh
                  nghiệm học tập của bạn với những người khác cùng đam mê trong
                  cộng đồng
                </p>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="item">
              <div className="icon">
                <GiGiftOfKnowledge />
              </div>
              <div className="content">
                <h3>Kiến thức đầu ra đảm bảo</h3>
                <p>
                  Mỗi chuyên gia đều dạy những gì tốt nhất, với hướng dẫn rõ
                  ràng, niềm đam mê thực sự và cái nhìn sâu sắc chuyên nghiệp
                  trong mỗi bài học.
                </p>
              </div>
            </div>
          </div>
          <div className="col col-2">
            <div className="item">
              <div className="icon">
                <GrCertificate />
              </div>
              <div className="content">
                <h3>Nhận chứng chỉ với mọi khoá học</h3>
                <p>
                  Khi hoàn thành khoá học, bạn sẽ nhận được một chứng chỉ tùy
                  chỉnh do giáo viên của bạn ký cho mỗi khóa học.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
