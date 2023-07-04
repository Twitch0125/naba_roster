export const scale = (value: number) => {
  //value is on a number on  scale from 0 to 250
  //we need to translate it to a scale from 20 to 80
  const max = 80;
  const min = 20;
  //show the given value adjusted to the scale
  const result = ((value - 0) / (250 - 0)) * (80 - 20) + 20;

  if (result < min) return min;
  if (result > max) return max;
  return Math.ceil(result / 5) * 5;
};
