import React from "react";
import CountUp from "react-countup";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import { MdPlayLesson } from "react-icons/md";
import "./statistic.scss";

const Satistic = () => {
  return (
    <div className="statistic">
      <div className="wrapper">
        <div className="col col-3">
          <div className="item">
            <div className="item-icon">
              <FaChalkboardTeacher className="icon" />
              <p>giảng viên</p>
            </div>
            <div className="value">
              <CountUp start={0} end={34} duration={2} enableScrollSpy />
            </div>
          </div>
        </div>
        <div className="col col-3">
          <div className="item">
            <div className="item-icon">
              <MdPlayLesson className="icon" />
              <p>khoá học</p>
            </div>
            <div className="value">
              <CountUp start={0} end={193} duration={2} enableScrollSpy />
            </div>
          </div>
        </div>
        <div className="col col-3">
          <div className="item">
            <div className="item-icon">
              <FaUserGraduate className="icon" />
              <p>học viên</p>
            </div>
            <div className="value">
              <CountUp start={0} end={1200} duration={2} enableScrollSpy />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Satistic;
