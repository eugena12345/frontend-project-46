import { test, expect } from '@jest/globals';
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

const resultPlain = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
`;
// здесь есть пустая строка. нужно ли это исправлять???

const pathFile1 = '__tests__/__fixtures__/file1.json';
const pathFile2 = '__tests__/__fixtures__/file2.json';

test('checkFiles', () => {
  expect(checkFiles(pathFile1, pathFile2, { format: 'stylish' })).toEqual(result2);
});

test('test plain', () => {
  expect(checkFiles(pathFile1, pathFile2, { format: 'plain' })).toEqual(resultPlain);
});
