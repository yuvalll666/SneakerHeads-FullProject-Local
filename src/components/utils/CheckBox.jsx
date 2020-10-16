import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";
const { Panel } = Collapse;

const brands = [
  {
    _id: 1,
    name: "NIKE",
  },
  {
    _id: 2,
    name: "ADIDAS",
  },
  {
    _id: 3,
    name: "VANS",
  },
  {
    _id: 4,
    name: "CONVERS",
  },
  {
    _id: 5,
    name: "NB",
  },
];

function CheckBox({ handleFilters }) {
  const [checked, setChecked] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    handleFilters(newChecked);
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Choose a brand" key="1">
          {brands.map((brand, index) => (
            <React.Fragment key={index}>
              <Checkbox
                onChange={() => handleToggle(brand._id)}
                type="checkbox"
                checked={checked.indexOf(brand._id) === -1 ? false : true}
              />
              <span>{brand.name}</span>
            </React.Fragment>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
