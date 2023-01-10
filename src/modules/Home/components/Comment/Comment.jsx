import React from "react";
import "./comment.scss";
import Carousel from "./components/Carousel";

const Comment = () => {
  return (
    <div className="comment">
      <div className="container wrapper">
        <div className="title">
          <p>Phản hồi từ học viên Elearning</p>
          <span>10.000+ người đã theo học trên Elearning</span>
        </div>

        <div className="main">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default Comment;
