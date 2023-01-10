import React from "react";
import { Breadcrumb } from "antd";
import { Link, useParams } from "react-router-dom";
import "./courseBreadcrumb.scss";
import useRequest from "hooks/useRequest";
import courseAPI from "apis/courseAPI";

const CourseBreadcrumb = ({ categoryId }) => {
  const { data: categories } = useRequest(() => courseAPI.getCategory());
  const { category } = useParams();
  const categoryItem = categories?.find((item) => item.maDanhMuc === category);
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/" className="url">
          Trang chủ
        </Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item>
        <Link to="/courses/" className="url">
          Các khoá học
        </Link>
      </Breadcrumb.Item>
      {categoryId && categoryItem && (
        <Breadcrumb.Item>
          <p className="url">{categoryItem?.tenDanhMuc}</p>
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default CourseBreadcrumb;
