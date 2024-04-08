import getDiff from './getDiff.js';
import parseFiles from './parseFiles.js';

const checkFiles = (f1, f2) => {
  const { result1, result2 } = parseFiles(f1, f2);
  getDiff(result1, result2);
};
export default checkFiles;
