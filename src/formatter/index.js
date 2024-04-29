import renderStylish from './renderStylish.js';

const actions = {
  stylish: renderStylish,
};

export default (format, different) => actions[format](different);
