import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";
const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);

  console.log(Checked);
  const handleToggle = (value) => {
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];

    if (currentIndex  === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);

    props.handleFilters(newChecked);
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Choose a brand" key="1">
          {props.brands.map((brand, index) => (
            <React.Fragment key={index}>
              <Checkbox
                onChange={() => handleToggle(brand._id)}
                type="checkbox"
                checked={Checked.indexOf(brand._id) === -1 ? false : true}
              />
              <span className="ml-1 mr-2">{brand.name}</span>
            </React.Fragment>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
