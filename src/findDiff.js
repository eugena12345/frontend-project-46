import union from 'lodash/union.js';

const findDiff = (obj1, obj2) => {
  const key1 = Object.keys(obj1);
  const key2 = Object.keys(obj2);
  const commonKeys = union(key1, key2);
  const sortedKeys = commonKeys.sort();
  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(obj2, key)) { // тогда не обрабатывае !obj2[key] или
      // !Object.prototype.hasOwnProperty.call(obj2, key)
      return {
        name: key,
        type: 'removed',
        beforeValue: obj1[key],
        afterValue: obj2[key],
        children: null,
      };
    }
    if (!Object.hasOwn(obj1, key)) { // !obj1[key] или !obj1.hasOwnProperty(key)
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
        type: 'unchanged',
        beforeValue: obj1[key],
        afterValue: obj2[key],
        children: null,
      };
    }
    if (typeof (obj1[key]) === 'object' && typeof (obj2[key]) === 'object' && obj1[key] !== null && obj1[key] !== null) {
      return {
        name: key,
        type: 'changed',
        beforeValue: obj1[key],
        afterValue: obj2[key],
        children: findDiff(obj1[key], obj2[key]),
      };
    }
    return {
      name: key,
      type: 'changed',
      beforeValue: obj1[key],
      afterValue: obj2[key],
      children: null,
    };
  });
  return result;
};
export default findDiff;
