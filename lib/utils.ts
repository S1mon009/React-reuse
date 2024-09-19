import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Splits a string into two parts based on the last occurrence of a specified character (":").
 * It returns an array where:
 * - The first element is the part of the string before the last occurrence of the character.
 * - The second element is the part after the character.
 *
 * Both parts are trimmed of any surrounding whitespace.
 *
 * @param {string} text - The input string to be split.
 * @param {string} char - The input splitted char.
 * @returns {string[]} - An array with two elements: the substring before the last char and the substring after it.
 *                       If the character is not found, the second part will be an empty string.
 */
export function splitTextByLastChar(text: string, char: string): string[] {
  const lastCharIndex = text.lastIndexOf(char);
  const firstPart = text.substring(0, lastCharIndex).trim();
  const secondPart = text.substring(lastCharIndex + 1).trim();
  return [firstPart, secondPart];
}

/**
 * Gets the previous and next values for the given item in a two-dimensional array,
 * with edge-case handling across sub-arrays.
 *
 * @param value - The value to search for in the array.
 * @param keysList - The array of arrays to search within.
 * @param categoryList - The array of categories corresponding to the sub-arrays in keysList.
 * @returns An object containing the previous, current, and next values and their corresponding category.
 * If the previous or next value doesn't exist, the function tries to get them from adjacent sub-arrays.
 * If that's not possible, it returns null for that value.
 */
export const getPrevNextValue = (
  value: string,
  keysList: string[][],
  categoryList: string[]
): {
  prev: string | null;
  current: string;
  next: string | null;
  prevCategory: string | null;
  nextCategory: string | null;
} | null => {
  // Find the sub-array and index of the given value
  for (let i = 0; i < keysList.length; i++) {
    const subArray = keysList[i];
    const index = subArray.indexOf(value);

    if (index !== -1) {
      // Get the previous value
      let prev: string | null = null;
      let prevCategory: string | null = null;

      if (index > 0) {
        prev = subArray[index - 1];
        prevCategory = categoryList[i];
      } else if (i > 0) {
        prev = keysList[i - 1][keysList[i - 1].length - 1] || null;
        prevCategory = categoryList[i - 1];
      }

      // Get the next value
      let next: string | null = null;
      let nextCategory: string | null = null;

      if (index < subArray.length - 1) {
        next = subArray[index + 1];
        nextCategory = categoryList[i];
      } else if (i < keysList.length - 1) {
        next = keysList[i + 1][0] || null;
        nextCategory = categoryList[i + 1];
      }

      return {
        prev,
        current: value,
        next,
        prevCategory,
        nextCategory,
      };
    }
  }

  return null; // If the value is not found in any array
};
