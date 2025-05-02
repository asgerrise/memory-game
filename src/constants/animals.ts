/**
* The values match the icon ids from the Noto Emoji pack
* @see https://icones.js.org/collection/noto?category=Animals+%26+Nature
*/

export const animals = [
  "lion",
  "bear",
  "koala",
  "dog-face",
  "owl",
  "fox",
  "frog",
  "hamster",
  "octopus",
  "raccoon",
  "rabbit-face",
  "shark",
  "seal",
  "sloth",
  "snake",
] as const;

export type Animal = typeof animals[number]
