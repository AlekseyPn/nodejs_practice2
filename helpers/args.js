const getArgs = (args) => {
  const res = {};

  const [,, ...rest] = args;

  rest.forEach((value, index, list) => {
    if (value.charAt(0) === '-') {
      if (index === list.length - 1) {
        res[value.substring(1)] = true;
      } else if (list[index + 1].charAt(0) !== '-') {
        res[value.substring(1)] = list[index + 1];
      } else {
        res[value.substring(1)] = true;
      }
    }
  })

  return res;
};

export {
  getArgs,
}
