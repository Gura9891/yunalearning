import React from "react";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Comment from "../components/Comment";
import CourseShowing from "../components/CourseShowing";
import Feature from "../components/Feature";
import Statistic from "../components/Statistic";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <Category />
      <CourseShowing />
      <Feature />
      <Statistic />
      <Comment />
    </div>
  );
};

export default Home;
