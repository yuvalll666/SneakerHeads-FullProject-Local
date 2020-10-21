import React, { useState } from "react";
import { Input } from "antd";
const { Search } = Input;

function SearchFeature(props) {
  const [SearchValue, setSearchValue] = useState("");

  const onChangeSearch = (e) => {
    setSearchValue(e.target.value);

    props.refreshFunction(e.target.value);
  };

  return (
  
      <Search
        style={{ width: "100%" }}
        size="large"
        value={SearchValue}
        onChange={onChangeSearch}
        placeholder="Search..."
      />
 
  );
}

export default SearchFeature;
