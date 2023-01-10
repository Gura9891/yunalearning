import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Spin } from "antd";
import SearchContent from "../SearchContent/SearchContent";
import useRequest from "hooks/useRequest";
import courseAPI from "apis/courseAPI";
import Tippy from "@tippyjs/react/headless";

import "./search.scss";

const Search = ({ resInputRef, setOpen }) => {
  const inputRef = useRef(null);

  const [showResult, setShowResult] = useState(true);
  const [searchCourses, setSearchCourses] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { data: courses } = useRequest(() => courseAPI.getCourses());

  useEffect(() => {
    if (!value.trim()) {
      setSearchCourses([]);
      return;
    }
    const searchValue = courses?.filter((course) =>
      course.tenKhoaHoc.toLowerCase().includes(value.toLowerCase())
    );
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setSearchCourses(searchValue);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [value, courses]);

  const handleClickOutSide = () => {
    setShowResult(false);
  };

  const handleChangeSearch = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(" ")) {
      setValue(searchValue);
    }
  };
  return (
    <div className="header__search">
      <Tippy
        placement="bottom"
        interactive
        visible={value && showResult && searchCourses?.length > 0}
        onClickOutside={handleClickOutSide}
        render={(attrs) => (
          <div
            tabIndex="-1"
            className="search-result"
            {...attrs}
            style={{ margin: 0 }}
          >
            <SearchContent
              searchCourses={searchCourses}
              setValue={setValue}
              setOpen={setOpen}
            />
          </div>
        )}
      >
        <div className="search">
          <SearchIcon className={`search-icon ${value ? "appear" : ""}`} />
          <input
            id="search-input"
            ref={resInputRef ? resInputRef : inputRef}
            type="text"
            placeholder="Hôm nay bạn muốn học gì..."
            spellCheck={false}
            value={value}
            onChange={handleChangeSearch}
            onFocus={() => setShowResult(true)}
          />
          {!!value && !isLoading && (
            <CloseIcon
              className="icon-item"
              fontSize="inherit"
              onClick={() => {
                setValue("");
                resInputRef
                  ? resInputRef.current.focus()
                  : inputRef.current.focus();
              }}
            />
          )}
          {isLoading && !!value && <Spin className="icon-item" />}
        </div>
      </Tippy>
    </div>
  );
};

export default Search;
