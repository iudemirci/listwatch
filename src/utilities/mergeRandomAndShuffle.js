import { sampleSize, shuffle } from "lodash";

export const mergeRandomAndShuffle = (array1, array2, items = 7) => {
  const randomizedArray1 = sampleSize(array1 || [], items);
  const randomizedArray2 = sampleSize(array2 || [], items);

  return shuffle([...randomizedArray1, ...randomizedArray2]);
};
