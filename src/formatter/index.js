import renderStylish from "./renderStylish.js";
const actions = {
    stylish: renderStylish,
  };
  
  export default (format, data1, data2) => actions[format](data1, data2);