import parseFiles from '../parsers/parseFiles.js';
import findDiff from './findDiff.js';
import render from './formatter/index.js';

const checkFiles = (f1, f2, option = { format: 'stylish' }) => {
  const { result1, result2 } = parseFiles(f1, f2);
  const different = findDiff(result1, result2);
  // let { format } = option;
  // if (!option.format) {
  //   format = 'stylish';
  // }
  // console.log(`option in checkFiles ${option}`);
  // console.log(`option.format in checkFiles ${option.format}`);
  // возвращает 'stylish' #58 буз формата
  console.log(render(different, option.format || option));
  return render(different, option.format || option);
};
export default checkFiles;
