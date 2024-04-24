const numberSymbol = 4;
const numberSymbolForDelete = 2;

const renderStylish = (file1, file2, deep = 1) => {
  let numberRepeatSpace = numberSymbol * deep - numberSymbolForDelete;
  if (numberRepeatSpace < 0) {
    numberRepeatSpace = 0;
  }
  const space = ' '.repeat(numberRepeatSpace);
  const spaceForEnd = ' '.repeat(numberRepeatSpace - numberSymbolForDelete);
  const newDeep = deep + 1;
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = keys1.concat(keys2);
  const uniqueKeys = [...new Set(keys)].sort();
  const string = uniqueKeys.map((key) => {
    const substring = `${key}: `;
    let keyForPaint1;
    let keyForPaint2;
    if (keys1.includes(key)) {
      if (keys2.includes(key)) {
        if (typeof (file1[key]) === 'object' && typeof (file2[key]) === 'object') {
          return `${space}  ${substring}${renderStylish(file1[key], file2[key], newDeep)}\n`;
        }
        if (file1[key] === file2[key]) {
          return `${space}  ${substring}${file1[key]}\n`;
        }
        if (typeof (file1[key]) === 'object' && file1[key] !== null) {
          keyForPaint1 = renderStylish(file1[key], file1[key], newDeep);
        } else {
          keyForPaint1 = file1[key];
        }
        if (typeof (file2[key]) === 'object' && file2[key] !== null) {
          console.log(`file2[key]${file2[key]}`);
          keyForPaint2 = renderStylish(file2[key], file2[key], newDeep);
        } else {
          keyForPaint2 = file2[key];
        }
        return `${space}- ${substring}${keyForPaint1}\n${space}+ ${key}: ${keyForPaint2}\n`;
      }

      if (typeof (file1[key]) === 'object' && file1[key] !== null) {
        keyForPaint1 = renderStylish(file1[key], file1[key], newDeep);
      } else {
        keyForPaint1 = file1[key];
      }
      return `${space}- ${substring}${keyForPaint1}\n`;
    }
    if (typeof (file2[key]) === 'object' && file2[key] !== null) {
      keyForPaint2 = renderStylish(file2[key], file2[key], newDeep);
    } else {
      keyForPaint2 = file2[key];
    }
    return `${space}+ ${substring}${keyForPaint2}\n`;
  }).join('');
  return `{\n${string}${spaceForEnd}}`;
};

export default renderStylish;
