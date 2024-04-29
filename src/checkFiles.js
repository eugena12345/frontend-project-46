import parseFiles from '../parsers/parseFiles.js';
import findDiff from './findDiff.js';
import render from './formatter/index.js';

const checkFiles = (f1, f2, option) => {
  const { result1, result2 } = parseFiles(f1, f2);
  const different = findDiff(result1, result2);
  // console.log(render(option.format, result1, result2));
  return console.log((render(option.format, different)));
};
export default checkFiles;
