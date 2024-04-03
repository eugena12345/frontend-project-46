const getDiff = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  const keys = keys1.concat(keys2);
  const uniqueKeys = [...new Set(keys)].sort();

  let string = uniqueKeys.map((key) => {
    if (keys1.includes(key)) {
      if (keys2.includes(key)) {
        if (file1[key] === file2[key]) {
          return `  ${key}: ${file1[key]}\n`;
        }
        return `- ${key}: ${file1[key]}\n+ ${key}: ${file2[key]}\n`;
      }
      return (`- ${key}: ${file1[key]}\n`);
    }
    return `+ ${key}: ${file2[key]}\n`;
  }).join('');
  string = `{\n${string}}`;
  console.log(string);
  return string;
};

export default getDiff;
