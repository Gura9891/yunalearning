import React from "react";
import logo from "assets/images/logo.png";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { FaUserCog } from "react-icons/fa";
import "./sidebar.scss";
import { Link, NavLink } from "react-router-dom";

const items = [
  { title: "Khoá học", icon: <BsJournalBookmarkFill />, path: "courses" },
  { title: "Học viên", icon: <FaUserCog />, path: "users" },
];

const Sidebar = () => {
  return (
    <div className="sidebar__wrapper">
      <Link to="/" className="logo">
        <div className="image">
          <img src={logo} alt="logo" />
        </div>
        <p className="name">Elearning</p>
      </Link>

      <div className="sidebar__nav">
        {items.map((item, index) => (
          <NavLink to={item.path} key={index} className="item">
            <div className="icon">{item.icon}</div>

            <p className="title">{item.title}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
