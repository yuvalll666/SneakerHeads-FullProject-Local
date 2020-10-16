import React from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;

const price = [
  {
    _id: 1,
    name: "Any",
    array: [],
  },
  {
    _id: 2,
    name: "$0 to $199",
    array: [0, 199],
  },
  {
    _id: 3,
    name: "$200 to $399",
    array: [200, 399],
  },
  {
    _id: 4,
    name: "$400 to $599",
    array: [400, 599],
  },
  {
    _id: 5,
    name: "$600 to $799",
    array: [600, 799],
  },
  {
    _id: 6,
    name: "$800 to $999",
    array: [800, 999],
  },
  {
    _id: 7,
    name: "More then $1000",
    array: [1000, 9999],
  },
];

function RadioBox() {
  return <div></div>;
}

export default RadioBox;
