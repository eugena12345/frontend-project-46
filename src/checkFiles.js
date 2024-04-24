import parseFiles from '../parsers/parseFiles.js';
import render from './formatter/index.js';

const checkFiles = (f1, f2, option) => {
  const { result1, result2 } = parseFiles(f1, f2);
  console.log(render(option.format, result1, result2));
  return (render(option.format, result1, result2));
};
export default checkFiles;
