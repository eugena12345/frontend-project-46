const getValueForRender = (value) => {
  if (value === null) {
    return null;
  }
  const typeOfValue = typeof (value);
  switch (typeOfValue) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const getAnswerForType = {
  added: (path, elementName, after) => [`Property '${path}${elementName}' was added with value: ${after}`],
  removed: (path, elementName) => [`Property '${path}${elementName}' was removed`],
  changed: (path, elementName, after, before) => [`Property '${path}${elementName}' was updated. From ${before} to ${after}`],
  nested: (children, newPath, renderPlain) => renderPlain(children, newPath),
  unchanged: () => [],
};

const renderPlain = (different, path = '') => {
  const result = different.flatMap((element) => {
    const newPath = `${path}${element.name}.`;
    const before = getValueForRender(element.beforeValue);
    const after = getValueForRender(element.afterValue);
    if (element.type) {
      if (element.type === 'nested') {
        return getAnswerForType[element.type](element.children, newPath, renderPlain);
      }
      return getAnswerForType[element.type](path, element.name, after, before);
    }
    throw Error(`Unknow type ${element.type}`);
  }).join('\n');
  return result;
};

export default renderPlain;
