const numberSymbol = 4;
const numberSymbolForDelete = 2;

const forObjPrintFunc = (object) => {
  const keys = Object.keys(object);
  const result = keys.map((key) => ({
    name: key,
    type: 'unchanged',
    beforeValue: object[key],
    afterValue: object[key],
    children: null,
  }));
  return result;
};

const renderStylish = (differentObj, deep = 1) => {
  let numberRepeatSpace = numberSymbol * deep - numberSymbolForDelete;
  if (numberRepeatSpace < 0) {
    numberRepeatSpace = 0;
  }
  const space = ' '.repeat(numberRepeatSpace);
  const spaceForEnd = ' '.repeat(numberRepeatSpace - numberSymbolForDelete);
  const newDeep = deep + 1;
  const string = differentObj.map((element) => {
    if (element.children) {
      return `${space}  ${element.name}: ${renderStylish(element.children, newDeep)}\n`;
    }
    let correctBeforeValue = element.beforeValue;
    let correctAfterValue = element.afterValue;
    if (typeof (element.beforeValue) === 'object' && element.beforeValue !== null) {
      const objForPrint = forObjPrintFunc(element.beforeValue);
      correctBeforeValue = renderStylish(objForPrint, newDeep);
    }
    if (typeof (element.afterValue) === 'object' && element.afterValue !== null) {
      const objForPrint = forObjPrintFunc(element.afterValue);
      correctAfterValue = renderStylish(objForPrint, newDeep);
    }
    if (element.type === 'removed') {
      return `${space}- ${element.name}: ${correctBeforeValue}\n`;
    }
    if (element.type === 'added') {
      return `${space}+ ${element.name}: ${correctAfterValue}\n`;
    }
    if (element.type === 'unchanged') {
      return `${space}  ${element.name}: ${correctAfterValue}\n`;
    }
    if (element.type === 'changed' && element.children === null) {
      return `${space}- ${element.name}: ${correctBeforeValue}\n${space}+ ${element.name}: ${correctAfterValue}\n`;
    }
    return null;
  }).join('');

  return `{\n${string}${spaceForEnd}}`;
};

export default renderStylish;
