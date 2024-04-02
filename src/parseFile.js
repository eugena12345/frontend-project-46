import { readFileSync } from 'node:fs';

const parseFiles = (f1, f2) => {
    console.log(`f1 ${f1}, f2 ${f2}`);

    const data1 = readFileSync(f1);
    const result1 = JSON.parse(data1);
    console.log(result1);

    const data2 = readFileSync(f2);
    const result2 = JSON.parse(data2);
    console.log(result2);
}
export default parseFiles;