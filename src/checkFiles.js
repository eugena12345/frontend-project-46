import getDiff from './getDiff.js';
import parseFiles from '../parsers/parseFiles.js';
import render from './formatter/index.js';

const checkFiles = (f1, f2) => {
  const { result1, result2 } = parseFiles(f1, f2);
  console.log(render('stylish', result1, result2));
};
export default checkFiles;
