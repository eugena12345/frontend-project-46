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

const getnumberRepeatSpace = (deep) => {
  const result = numberSymbol * deep - numberSymbolForDelete;
  if (result < 0) {
    return 0;
  }
  return result;
};

const renderStylish = (differentObj, deep = 1) => {
  // let numberRepeatSpace = numberSymbol * deep - numberSymbolForDelete; // не нравится let
  // и его переназначение в 19-20 строке
  // if (numberRepeatSpace < 0) {
  //   numberRepeatSpace = 0;
  // }
  const numberRepeatSpace = getnumberRepeatSpace(deep);
  const space = ' '.repeat(numberRepeatSpace);
  const spaceForEnd = ' '.repeat(numberRepeatSpace - numberSymbolForDelete);
  const newDeep = deep + 1;
  const string = differentObj.map((element) => {
    if (element.type === 'removed') {
      if (typeof (element.beforeValue) === 'object' && element.beforeValue !== null) {
        const objForPrint = forObjPrintFunc(element.beforeValue);
        const correctBeforeValue = renderStylish(objForPrint, newDeep);
        return `${space}- ${element.name}: ${correctBeforeValue}\n`;
      }
      return `${space}- ${element.name}: ${element.beforeValue}\n`;
    }
    if (element.type === 'added') {
      if (typeof (element.afterValue) === 'object' && element.afterValue !== null) {
        const objForPrint = forObjPrintFunc(element.afterValue);
        const correctAfterValue = renderStylish(objForPrint, newDeep);
        return `${space}+ ${element.name}: ${correctAfterValue}\n`;
      }
      return `${space}+ ${element.name}: ${element.afterValue}\n`;
    }
    if (element.type === 'unchanged') {
      if (typeof (element.afterValue) === 'object' && element.afterValue !== null) {
        const objForPrint = forObjPrintFunc(element.afterValue);
        const correctUnchangedAfterValue = renderStylish(objForPrint, newDeep);
        return `${space}  ${element.name}: ${correctUnchangedAfterValue}\n`;
      }
      return `${space}  ${element.name}: ${element.afterValue}\n`;
    }
    if (element.type === 'changed') {
      if ((typeof (element.afterValue) === 'object') && (typeof (element.beforeValue) === 'object') && element.afterValue !== null && element.beforeValue !== null) {
        const objForPrintAfter = forObjPrintFunc(element.afterValue);
        const correctUnchangedAfterValue = renderStylish(objForPrintAfter, newDeep);
        const objForPrintBefore = forObjPrintFunc(element.beforeValue);
        const correctUnchangedBeforeValue = renderStylish(objForPrintBefore, newDeep);
        return `${space}- ${element.name}: ${correctUnchangedBeforeValue}\n${space}+ ${element.name}: ${correctUnchangedAfterValue}\n`;
      }
      if (typeof (element.afterValue) === 'object' && element.afterValue !== null) {
        const objForPrintAfter = forObjPrintFunc(element.afterValue);
        const correctUnchangedAfterValue = renderStylish(objForPrintAfter, newDeep);
        // const objForPrintBefore = forObjPrintFunc(element.afterValue);
        // const correctUnchangedBeforeValue = renderStylish(objForPrintBefore, newDeep);
        return `${space}- ${element.name}: ${element.beforeValue}\n${space}+ ${element.name}: ${correctUnchangedAfterValue}\n`;
      }
      if (typeof (element.beforeValue) === 'object' && element.beforeValue !== null) {
        // const objForPrintAfter = forObjPrintFunc(element.afterValue);
        // const correctUnchangedAfterValue = renderStylish(objForPrintAfter, newDeep);
        const objForPrintBefore = forObjPrintFunc(element.beforeValue);
        const correctUnchangedBeforeValue = renderStylish(objForPrintBefore, newDeep);
        return `${space}- ${element.name}: ${correctUnchangedBeforeValue}\n${space}+ ${element.name}: ${element.afterValue}\n`;
      }
      return `${space}- ${element.name}: ${element.beforeValue}\n${space}+ ${element.name}: ${element.afterValue}\n`;
    }

    if (element.type === 'nested') {
      return `${space}  ${element.name}: ${renderStylish(element.children, newDeep)}\n`;
    }
    // if (element.children) {

    // }

    // let correctBeforeValue = element.beforeValue; // не нравится let
    // let correctAfterValue = element.afterValue; // не нравится let
    // if (typeof (element.beforeValue) === 'object' && element.beforeValue !== null) {
    //   const objForPrint = forObjPrintFunc(element.beforeValue);
    //   correctBeforeValue = renderStylish(objForPrint, newDeep);
    // }
    // if (typeof (element.afterValue) === 'object' && element.afterValue !== null) {
    //   const objForPrint = forObjPrintFunc(element.afterValue);
    //   correctAfterValue = renderStylish(objForPrint, newDeep);
    // }

    return null;
  }).join('');

  return `{\n${string}${spaceForEnd}}`;
};

export default renderStylish;
