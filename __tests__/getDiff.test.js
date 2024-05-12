import { test, expect, beforeAll } from '@jest/globals';
import fs from 'fs';
import checkFiles from '../src/checkFiles.js';

// const obj1 = {
//   host: 'hexlet.io',
//   timeout: 50,
//   proxy: '123.234.53.22',
//   follow: false,
// };

// const obj2 = {
//   timeout: 20,
//   verbose: true,
//   host: 'hexlet.io',
// };

// const result = `{
// - follow: false
//   host: hexlet.io
// - proxy: 123.234.53.22
// - timeout: 50
// + timeout: 20
// + verbose: true
// }`;

const result2 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
let resultPlain;
beforeAll(() => {
  resultPlain = fs.readFileSync('__tests__/__fixtures__/plainResult', 'utf-8');
});
// здесь есть пустая строка. нужно ли это исправлять???

const fileExtention = ['yaml', 'json'];
fileExtention.forEach((ext) => {
  const pathFile1 = `__fixtures__/file1.${ext}`;
  const pathFile2 = `__fixtures__/file2.${ext}`;
  // было с папкой тест const pathFile1 = `__tests__/__fixtures__/file1.${ext}`;
  // было с папкой тест const pathFile2 = `__tests__/__fixtures__/file2.${ext}`;

  test(`${ext} test stylish format`, () => {
    expect(checkFiles(pathFile1, pathFile2, { format: 'stylish' })).toEqual(result2);
  });

  test(`${ext} test plain format`, () => {
    expect(checkFiles(pathFile1, pathFile2, { format: 'plain' })).toEqual(resultPlain);
  });
});
