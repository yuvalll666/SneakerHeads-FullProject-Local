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

export {
  price,
  brands
}