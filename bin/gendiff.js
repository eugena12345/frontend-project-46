#!/usr/bin/env node

import { program } from 'commander';
import parseFiles from '../src/parseFile.js';

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .arguments('<filepath1>', 'path to the file')
    .arguments('<filepath2>', 'path to the file')
    .option('-f, --format [type]', 'output format')
    .action(parseFiles);

program.parse(); 
