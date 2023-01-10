import React from "react";
import useRequest from "hooks/useRequest";
import courseAPI from "apis/courseAPI";
import CourseBanner from "../components/CourseBanner";
import CourseItem from "modules/Home/components/CourseShowing/components/CourseItem";

import "./courses.scss";
import allcourseImg from "assets/images/allcourse-img.jpg";

const status = ["mới", "bán chạy"];

const CoursesAll = () => {
  const { data, isLoading } = useRequest(() => courseAPI.getCourses());

  const courses = data?.map((course) => {
    return { ...course, trangThai: status[Math.floor(Math.random() * 2)] };
  });

  return (
    <>
      <div className="title">
        <CourseBanner title={"viên"} background={allcourseImg} />
      </div>

      <div className="item-list">
        <CourseItem courses={courses} all showmore filter />
      </div>
    </>
  );
};

export default CoursesAll;
