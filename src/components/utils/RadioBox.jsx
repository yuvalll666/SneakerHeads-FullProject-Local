import React, { useState } from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;

const price = [
  {
    _id: 0,
    name: "Any",
    array: [],
  },
  {
    _id: 1,
    name: "$0 - $199",
    array: [0, 199],
  },
  {
    _id: 2,
    name: "$200 - $399",
    array: [200, 399],
  },
  {
    _id: 3,
    name: "$400 - $599",
    array: [400, 599],
  },
  {
    _id: 4,
    name: "$600 - $799",
    array: [600, 799],
  },
  {
    _id: 5,
    name: "$800 - $999",
    array: [800, 999],
  },
  {
    _id: 6,
    name: "More then $1000",
    array: [1000, 9999],
  },
];

function RadioBox(props) {
  const [Value, setValue] = useState(0);
  const renderRadioBox = () =>
    price.map((value) => (
      <Radio key={value._id} value={value._id}>
        {value.name}
      </Radio>
    ));

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);

    props.handleFilters(value);
  };
  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price range" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
