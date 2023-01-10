import React, { useState } from "react";
import { Drawer } from "antd";
import { BsSearch } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./mobileSearch.scss";
import Search from "../Search";
import { useRef } from "react";

const MobileSearch = () => {
  const resInputRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpenChange = (open) => {
    if (open === true) {
      resInputRef.current.focus();
    }
  };

  return (
    <>
      <div className="search-responsive-icon" onClick={handleOpen}>
        <BsSearch />
      </div>
      <Drawer
        height={50}
        placement="top"
        closable={false}
        onClose={() => setOpen(false)}
        open={open}
        autoFocus={true}
        afterOpenChange={handleOpenChange}
        className="searchs-responsive-drawer"
      >
        <div className="search-box">
          <div className="back-icon" onClick={() => setOpen(false)}>
            <IoMdArrowRoundBack />
          </div>
          <Search resInputRef={resInputRef} setOpen={setOpen} />
        </div>
      </Drawer>
    </>
  );
};

export default MobileSearch;
