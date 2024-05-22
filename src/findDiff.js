import union from 'lodash/union.js';
import has from 'lodash/has.js';
import sortBy from 'lodash/sortBy.js';
import isObject from 'lodash/isObject.js';

const createNode = (obj1, obj2, key, type, children = null) => ({
  name: key,
  type,
  beforeValue: obj1[key],
  afterValue: obj2[key],
  children,
});

const findDiff = (obj1, obj2) => {
  const key1 = Object.keys(obj1 ?? {});
  const key2 = Object.keys(obj2 ?? {});
  const commonKeys = union(key1, key2);
  const sortedKeys1 = sortBy(commonKeys);
  const result = sortedKeys1.map((key) => {
    if (!has(obj2, key)) {
      return createNode(obj1, obj2, key, 'removed');
    }
    if (!has(obj1, key)) {
      return createNode(obj1, obj2, key, 'added');
    }
    if (obj1[key] === obj2[key]) {
      return createNode(obj1, obj2, key, 'unchanged');
    }
    if (isObject(obj1[key]) && isObject(obj2[key])) {
      const children = findDiff(obj1[key], obj2[key]);
      console.log(children);
      return createNode(obj1, obj2, key, 'nested', children);
    }
    return createNode(obj1, obj2, key, 'changed');
  });
  return result;
};
export default findDiff;
