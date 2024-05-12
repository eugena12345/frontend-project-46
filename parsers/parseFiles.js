import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

const getExtension = (filePath) => {
  const separetedPath = filePath.split('.');
  return separetedPath[1];
};

const getParsedFileByExtention = (extention, data) => {
  let result;
  if (extention === 'json') {
    result = JSON.parse(data);
  }
  if (extention === 'yaml') {
    result = yaml.load(data);
  }
  return result;
};

const parseFiles = (f1, f2) => {
  const resolvedPath1 = path.resolve(process.cwd(), '__tests__', f1);
  const resolvedPath2 = path.resolve(process.cwd(), '__tests__', f2);
  // console.log(`resolvedPath1 ${resolvedPath1}`);
  // console.log(`resolvedPath2 ${resolvedPath2}`);

  const extFile1 = getExtension(f1);
  const extFile2 = getExtension(f2);
  const data1 = readFileSync(resolvedPath1);
  const data2 = readFileSync(resolvedPath2);
  console.log(data1);
  console.log(data2);

  const result1 = getParsedFileByExtention(extFile1, data1);
  const result2 = getParsedFileByExtention(extFile2, data2);

  return { result1, result2 };
};
export default parseFiles;
