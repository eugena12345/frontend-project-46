const getValueForRender = (value) => {
  if (value === null) {
    return null;
  }
  const typeOfValue = typeof (value);
  switch (typeOfValue) {
    case 'string':
      return `'${value}'`;
    case 'boolean':
      return value;
    case 'object':
      return '[complex value]';
    default:
      return value;
  }
};

const renderPlain1 = (different, path = '') => {
  const result = different.map((element) => {
    const newPath = `${path}${element.name}.`;
    const before = getValueForRender(element.beforeValue);
    const after = getValueForRender(element.afterValue);
    if (element.type === 'nested') {
      return renderPlain1(element.children, newPath);
    }
    if (element.type === 'removed') {
      return (`Property '${path}${element.name}' was removed\n`);
    }
    if (element.type === 'added') {
      return (`Property '${path}${element.name}' was added with value: ${after}\n`);
    }
    if (element.type === 'changed') {
      return (`Property '${path}${element.name}' was updated. From ${before} to ${after}\n`);
    }
    return '';// выбросить исключение (throw err)
  }).join('');
  return result;
};

const renderPlain = (different) => {
  const resultString = renderPlain1(different);
  return resultString.trim();
};

export default renderPlain;
