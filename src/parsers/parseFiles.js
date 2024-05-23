// import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';
// import path from 'node:path';

const extentions = {
  json: JSON.parse,
  yaml: yaml.load,
  yml: yaml.load,
};

export default (extention, data) => extentions[extention](data);
