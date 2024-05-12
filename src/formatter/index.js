import renderStylish from './renderStylish.js';
import renderPlain from './renderPlain.js';
import renderJson from './renderJson.js';

const actions = {
  stylish: renderStylish,
  plain: renderPlain,
  json: renderJson,
};

export default (format, different) => {
  console.log(`format ${format}`);
  return actions[format](different);
};
