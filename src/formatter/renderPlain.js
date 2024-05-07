const getValueForRender = (value) => {
  let valueForRender;
  if (value === null) {
    // console.log(value);
    return null;
  }
  // вопрос почему не получается вернуть null без кавычек
  const typeOfValue = typeof (value);
  // console.log(`typeOfValue ${typeOfValue} value =  ${value}`);
  switch (typeOfValue) {
    case 'string':
      valueForRender = `'${value}'`;
      break;
    case 'boolean':
      valueForRender = value;
      break;
    case 'object':
      valueForRender = '[complex value]';
      break;
    default:
      valueForRender = value;
  }
  return valueForRender;
};

const renderPlain1 = (different, path = '') => {
  const result = different.map((element) => {
    const newPath = `${path}${element.name}.`;
    const before = getValueForRender(element.beforeValue);
    const after = getValueForRender(element.afterValue);
    if (element.children) {
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
    if (element.type === 'unchanged') {
      // console.log('hi');
      // вернуть пустую строчку
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
