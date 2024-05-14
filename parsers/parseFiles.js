import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
import path from 'node:path';

const getExtension = (filePath) => {
  const separetedPath = filePath.split('.');
  return separetedPath[1];
};

const getParsedFileByExtention = (extention, data) => {
  if (extention === 'json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

const parseFiles = (f1, f2) => {
  const resolvedPath1 = path.resolve(process.cwd(), '__tests__', f1);
  const resolvedPath2 = path.resolve(process.cwd(), '__tests__', f2);
  const extFile1 = getExtension(f1);
  const extFile2 = getExtension(f2);
  const data1 = readFileSync(resolvedPath1);
  const data2 = readFileSync(resolvedPath2);
  const result1 = getParsedFileByExtention(extFile1, data1);
  const result2 = getParsedFileByExtention(extFile2, data2);
  return { result1, result2 };
};
export default parseFiles;
