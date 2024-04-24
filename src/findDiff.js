import { _union } from 'lodash';

const findDiff = (obj1, obj2) => {
  const commonKeys = _union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = commonKeys.sort();
  const result = sortedKeys.map((key) => {
    if (!obj2[key]) {
      return {
        name: key,
        type: 'removed',
        beforeValue: obj1[key],
        afterValue: obj2[key],
        children: null,
      };
    }
    if (!obj1[key]) {
      return {
        name: key,
        type: 'added',
        beforeValue: obj1[key],
        afterValue: obj2[key],
        children: null,
      };
    }
    if (obj1[key] === obj2[key]) {
      return {
        name: key,
        type: 'added',
        beforeValue: obj1[key],
        afterValue: obj2[key],
        children: null,
      };
    }
    return key; // убрать потом
  });
  return result;

  // name, type, beforeValue, afterValue, children
};
export default findDiff;
