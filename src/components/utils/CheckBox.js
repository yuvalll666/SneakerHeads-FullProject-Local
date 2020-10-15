import React from "react";
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

function CheckBox() {
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
  };

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header key="1">
          {brands.map((brand, index) => (
            <React.Fragment key={index}>
              <Checkbox
                onChange={() => handleToggle(brand._id)}
                type="checkbox"
                checked
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
