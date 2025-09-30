export const capitalize = (text: string): string =>
  !text ? text : text.charAt(0).toUpperCase() + text.slice(1);

export const splitTextByLastChar = (text: string, char: string): string[] => {
  const lastCharIndex = text.lastIndexOf(char);
  const firstPart = text.substring(0, lastCharIndex).trim();
  const secondPart = text.substring(lastCharIndex + 1).trim();
  return [firstPart, secondPart];
};
