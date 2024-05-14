import { test, expect } from '@jest/globals';
import fs from 'fs';
import checkFiles from '../src/checkFiles.js';

const resultStylish = fs.readFileSync('__tests__/__fixtures__/stylishResult', 'utf-8');
const resultPlain = fs.readFileSync('__tests__/__fixtures__/plainResult', 'utf-8');
const fileExtention = ['yaml', 'json'];

fileExtention.forEach((ext) => {
  const pathFile1 = `__fixtures__/file1.${ext}`;
  const pathFile2 = `__fixtures__/file2.${ext}`;

  test(`${ext} test stylish format`, () => {
    expect(checkFiles(pathFile1, pathFile2, { format: 'stylish' })).toEqual(resultStylish);
  });

  test(`${ext} test plain format`, () => {
    expect(checkFiles(pathFile1, pathFile2, { format: 'plain' })).toEqual(resultPlain);
  });
});
