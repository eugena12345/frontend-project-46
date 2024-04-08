import { readFileSync } from 'node:fs';

const parseFiles = (f1, f2) => {
    const data1 = readFileSync(f1);
    const result1 = JSON.parse(data1);
    const data2 = readFileSync(f2);
    const result2 = JSON.parse(data2);
    return {result1, result2}
};
export default parseFiles;
