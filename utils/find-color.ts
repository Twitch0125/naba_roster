//@unocss-include
/** @param rating should be a on the 20-80 scale */
export const findColor = (rating: number) => {
  if (rating >= 70) return "text-blue-500";
  if (rating >= 55) return "text-green-500";
  if (rating >= 45) return "text-yellow-500";
  if (rating >= 30) return "text-amber-500";
  if (rating >= 20) return "text-red-500";
  return "text-medium-emphasis";
};
