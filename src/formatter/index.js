import renderStylish from './renderStylish.js';
import renderPlain from './renderPlain.js';

const actions = {
  stylish: renderStylish,
  plain: renderPlain,
};

export default (format, different) => actions[format](different);
