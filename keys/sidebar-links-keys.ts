const keysList: string[][] = [
  ["introduction", "typesafe", "quality"],
  [
    "useclipboard",
    "usechatgpt",
    "usepromiseall",
    "usehover",
    "useclickoutside",
    "usedebounce",
    "usesort",
    "usemediaquery",
    "usekeyboardshortcup",
    "usecounter",
    "uselocalstorage",
    "usesearch",
    "useinterval",
    "usescrollintoview",
  ],
  ["show", "each", "delay"],
];

/**
 * Sorts the sub-arrays of a two-dimensional array, skipping the first sub-array.
 * The first sub-array remains unchanged, while subsequent sub-arrays are sorted in alphabetical order.
 *
 * @param {string[][]} array - A two-dimensional array of strings where each sub-array represents a list of strings.
 * @returns {string[][]} - A new two-dimensional array where all sub-arrays, except the first, are sorted in ascending order.
 */
const sortArraySkippingFirst = (array: string[][]): string[][] => {
  const result = array.map((subArray) => [...subArray]);

  for (let i = 1; i < result.length; i++) {
    result[i].sort((a, b) => a.localeCompare(b));
  }

  return result;
};

export const keys: string[][] = sortArraySkippingFirst(keysList);
