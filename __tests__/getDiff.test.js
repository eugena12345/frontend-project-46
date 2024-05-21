import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'node:path';
import checkFiles from '../src/index.js';

const getFilePath = (fileName) => path.resolve(process.cwd(), '__tests__', '__fixtures__', fileName);

const resultStylish = fs.readFileSync(getFilePath('stylishResult'), 'utf-8');
const resultPlain = fs.readFileSync(getFilePath('plainResult'), 'utf-8');
const resultJson = JSON.parse(fs.readFileSync(getFilePath('jsonResult')));// !!!!!!!!!!!!!!!!!!!!!!!!!!
const fileExtention = ['yaml', 'json'];

fileExtention.forEach((ext) => {
  const pathFile1 = getFilePath(`file1.${ext}`);
  const pathFile2 = getFilePath(`file2.${ext}`);

  test(`${ext} test stylish format`, () => {
    expect(checkFiles(pathFile1, pathFile2, { format: 'stylish' })).toEqual(resultStylish);
  });

  test(`${ext} test plain format`, () => {
    expect(checkFiles(pathFile1, pathFile2, { format: 'plain' })).toEqual(resultPlain);
  });

  test(`${ext} test JSON format`, () => {
    expect(checkFiles(pathFile1, pathFile2, { format: 'json' })).toEqual(resultJson);
  });
});
