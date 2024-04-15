export default function getRandomInt(min, max) {
  const minNumber = Math.ceil(min);
  const maxNumber = Math.floor(max);
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}

export function getRandomWizzard(arr) {
  const randomNum = Math.random() * arr.length;
  const randomIndex = Math.floor(randomNum);
  return arr[randomIndex];
}
