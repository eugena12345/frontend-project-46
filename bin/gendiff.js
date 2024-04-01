#!/usr/bin/env node
//import getOptions from '../src/getOptions.js';

//getOptions();
import { program } from 'commander';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0');

program
    .arguments('<filepath1>', 'path to the file')
    .arguments('<filepath2>', 'path to the file')
    .option('-f, --format [type]', 'output format')
//.option('-a, --arison', 'output the version number')
//   .action((str, options) => {
//     const limit = options.first ? 1 : undefined;
//     console.log(str.split(options.separator, limit));
//   });

program.parse();
