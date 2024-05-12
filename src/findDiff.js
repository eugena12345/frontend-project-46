import union from 'lodash/union.js';
import has from 'lodash/has.js';
// import sortedUniq from 'lodash/sortedUniq';

const findDiff = (obj1, obj2) => {
  const key1 = Object.keys(obj1 ?? {});
  const key2 = Object.keys(obj2 ?? {});
  const commonKeys = union(key1, key2);
  // const sortedKeys1 = sortedUniq(commonKeys);
  // console.log(`sortedKeys1 = ${sortedKeys1}`);
  const sortedKeys = commonKeys.sort();
  console.log(`sortedKeys = ${sortedKeys}`);
  const result = sortedKeys.map((key) => {
    if (!has(obj2, key)) {
      return {
        name: key,
        type: 'removed',
        beforeValue: obj1[key],
        afterValue: obj2[key],
        children: null,
      };
    }
    if (!has(obj1, key)) {
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
        type: 'changed', // nested
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
