export const replaceIfFalsy = <T>(key: keyof T, value: T[keyof T]) => {
  return (model: T) => {
    if (!model[key]) {
      return {
        ...model,
        [key]: value,
      };
    }
    return model;
  };
};

export const replaceValue = <T>(key: keyof T, value: T[keyof T]) => {
  return (model: T) => ({
    ...model,
    [key]: value,
  });
};

export const pipe = <T>(model: T, ...fns: Array<(model: T) => T>) => {
  return fns.reduce((acc, curr) => curr(acc), model);
};
