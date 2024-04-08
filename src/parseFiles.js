import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

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
  const extFile1 = getExtension(f1);
  const extFile2 = getExtension(f2);
  const data1 = readFileSync(f1);
  const data2 = readFileSync(f2);
  const result1 = getParsedFileByExtention(extFile1, data1);
  const result2 = getParsedFileByExtention(extFile2, data2);

  return { result1, result2 };
};
export default parseFiles;
