const getRandomInt = (min: number, max: number) => {
  const minNumber: number = Math.ceil(min);
  const maxNumber: number = Math.floor(max);
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};

const getRandomWizzard = (arr: Array<number>) => {
  const randomNum: number = Math.random() * arr.length;
  const randomIndex: number = Math.floor(randomNum);
  return arr[randomIndex];
};

export { getRandomInt, getRandomWizzard };
