import courseAPI from "apis/courseAPI";
import useRequest from "hooks/useRequest";
import CourseItem from "modules/Home/components/CourseShowing/components/CourseItem";
import React from "react";
import { useParams } from "react-router-dom";
import CourseBanner from "../components/CourseBanner";

const status = ["mới", "bán chạy"];

const CourseByCatgory = () => {
  const { category } = useParams();
  const { data, isLoading } = useRequest(
    () => courseAPI.getCoursesByCategory(category),
    { deps: [category] }
  );

  const courses = data?.map((course) => {
    return { ...course, trangThai: status[Math.floor(Math.random() * 2)] };
  });

  return (
    <>
      <div className="title">
        <CourseBanner category={category} />
      </div>

      <div className="item-list">
        <CourseItem courses={courses} showmore filter />
      </div>
    </>
  );
};

export default CourseByCatgory;
