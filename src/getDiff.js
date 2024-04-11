const getDiff = (file1, file2, space = '') => {
  const newSpace = space + '..'
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = keys1.concat(keys2);
  const uniqueKeys = [...new Set(keys)].sort();

  let string = uniqueKeys.map((key) => {
    let substring = `${key}: `;
    let keyForPaint1;
    let keyForPaint2;
    if (keys1.includes(key)) {
      if (keys2.includes(key)) {
        if (typeof (file1[key]) === 'object' && typeof (file2[key]) === 'object') {
          return `${space}  ${substring}${getDiff(file1[key], file2[key], newSpace)}\n`
        }
        if (file1[key] === file2[key]) {
          return `${space}  ${substring}${file1[key]}\n`;
        }
        if (typeof (file1[key]) === 'object' && file1[key] !== null) {
          keyForPaint1 = getDiff(file1[key], file1[key], newSpace);
        } else {
          keyForPaint1 = file1[key]
        }
        if (typeof (file2[key]) === 'object' && file2[key] !== null) {
          console.log(`file2[key]${file2[key]}`);
          keyForPaint2 = getDiff(file2[key], file2[key], newSpace);
        } else {
          keyForPaint2 = file2[key]
        }
        return `${space}- ${substring}${keyForPaint1}\n${space}+ ${key}: ${keyForPaint2}\n`;
      }

      if (typeof (file1[key]) === 'object' && file1[key] !== null) {
        keyForPaint1 = getDiff(file1[key], file1[key], newSpace);
      } else {
        keyForPaint1 = file1[key]
      }
      return `${space}- ${substring}${keyForPaint1}\n`;
    }
    if (typeof (file2[key]) === 'object'&& file2[key] !== null) {
      keyForPaint2 = getDiff(file2[key], file2[key], newSpace);
    } else {
      keyForPaint2 = file2[key]
    }
    return `${space}+ ${substring}${keyForPaint2}\n`;
  }).join('');

  //string = `{\n${string}}`;
  // console.log(`${string} \nend------------------`);
  return `{\n${string}${space}}`;


};

export default getDiff;
