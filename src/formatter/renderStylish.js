import isObject from 'lodash/isObject.js';

const numberSymbol = 4;
const numberSymbolForDelete = 2;

const getnumberRepeatSpace = (deep) => {
  const result = numberSymbol * deep - numberSymbolForDelete;
  if (result < 0) {
    return 0;
  }
  return result;
};

const renderValue = (value, deepRS) => {
  if (isObject(value)) {
    const numberRepeatSpaceRS = getnumberRepeatSpace(deepRS);
    const spaceRS = ' '.repeat(numberRepeatSpaceRS);
    const spaceForEndRS = ' '.repeat(numberRepeatSpaceRS - numberSymbolForDelete);
    const newDeepRS = deepRS + 1;
    const keys = Object.keys(value);
    const resultString = keys.map((key) => {
      const lastSign = keys.indexOf(key) === (keys.length - 1) ? '' : '\n';
      const stringForRender = `${spaceRS}  ${key}: ${renderValue(value[key], newDeepRS)}${lastSign}`;
      return stringForRender;
    });
    return `{\n${resultString.join('')}\n${spaceForEndRS}}`;
  }
  return `${value}`;
};

const renderStylish = (differentObj, deep = 1) => {
  const numberRepeatSpace = getnumberRepeatSpace(deep);
  const space = ' '.repeat(numberRepeatSpace);
  const spaceForEnd = ' '.repeat(numberRepeatSpace - numberSymbolForDelete);
  const newDeep = deep + 1;
  const string = differentObj.map((element) => {
    switch (element.type) {
      case 'removed':
        return `${space}- ${element.name}: ${renderValue(element.beforeValue, newDeep)}\n`;
      case 'added':
        return `${space}+ ${element.name}: ${renderValue(element.afterValue, newDeep)}\n`;
      case 'unchanged':
        return `${space}  ${element.name}: ${renderValue(element.afterValue, newDeep)}\n`;
      case 'changed':
        return `${space}- ${element.name}: ${renderValue(element.beforeValue, newDeep)}\n${space}+ ${element.name}: ${renderValue(element.afterValue, newDeep)}\n`;
      default:
        return `${space}  ${element.name}: ${renderStylish(element.children, newDeep)}\n`;
    }
  }).join('');
  return `{\n${string}${spaceForEnd}}`;
};

export default renderStylish;
