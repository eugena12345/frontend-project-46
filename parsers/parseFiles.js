import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

const getExtension = (filePath) => {
  const separetedPath = filePath.split('.');
  return separetedPath[1];
};

const getParsedFileByExtention = (extention, data) => {
  // console.log(result1);
  // console.log(result2);
  let result;
  if (extention === 'json') {
    result = JSON.parse(data);
  }
  if (extention === 'yaml' || extention === 'yml') {
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
  console.log(`extFile1 ${extFile1}`);
  console.log(`extFile2 ${extFile2}`);
  const data1 = readFileSync(resolvedPath1);
  const data2 = readFileSync(resolvedPath2);
  const result1 = getParsedFileByExtention(extFile1, data1);
  const result2 = getParsedFileByExtention(extFile2, data2);
  console.log(result1);
  console.log(result2);

  return { result1, result2 };
};
export default parseFiles;
