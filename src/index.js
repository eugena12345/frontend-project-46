import { readFileSync } from 'node:fs';
import path from 'node:path';
import parseFiles from './parsers/parseFiles.js';
import buildAst from './buildAst.js';
import render from './formatter/index.js';

const getExtension = (filePath) => {
  const separetedPath = filePath.split('.');
  return separetedPath[1];
};

const checkFiles = (f1, f2, option = { format: 'stylish' }) => {
  const resolvedPath1 = path.resolve(process.cwd(), f1);
  const resolvedPath2 = path.resolve(process.cwd(), f2);
  const extFile1 = getExtension(f1);
  const extFile2 = getExtension(f2);
  const data1 = readFileSync(resolvedPath1);
  const data2 = readFileSync(resolvedPath2);
  const result1 = parseFiles(extFile1, data1);
  const result2 = parseFiles(extFile2, data2);
  const different = buildAst(result1, result2);
  console.log(render(different, option.format || option));
  return render(different, option.format || option);
};
export default checkFiles;
