import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

function SearchFeature(props) {
  const [SearchValue, setSearchValue] = useState("");

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);

    props.refreshFunction(e.target.value)
  };

  return (
    <div className="mb-2">
      <Search
        value={SearchValue}
        onChange={onChangeSearch}
        placeHolder="Search..."
      />
    </div>
  );
}

export default SearchFeature;
