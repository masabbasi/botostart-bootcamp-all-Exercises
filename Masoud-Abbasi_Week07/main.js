console.log("(1)-----------------------------------------------");
//1
const numbers = [5, 12, 8, 130, 44];

//1-1
console.log("1-1-----------------------------------------------");
const descSorted = [...numbers].sort((a, b) => b - a);
//Test====>
console.log(numbers); //[5, 12, 8, 130, 44]
console.log(descSorted); //[130, 44, 12, 8, 5]

//1-2
console.log("1-2-----------------------------------------------");
const under30 = [...descSorted].filter((number) => number < 30);
//Test====>
console.log(under30); //[12, 8, 5]

//1-3
console.log("1-3-----------------------------------------------");
const sumAll = numbers.reduce((acc, cur) => (acc += cur), 0);
//Test====>
console.log(sumAll); //199

//1-4
console.log("1-4-----------------------------------------------");
const numToString = numbers.toString().split(",");
//Test====>
console.log(numToString); //['5', '12', '8', '130', '44']

//1-5
console.log("1-5-----------------------------------------------");
const offsetNumbers = numbers.map((number, index) => number - index);
//Test====>
console.log(numbers); //[5, 12, 8, 130, 44]
console.log(offsetNumbers); //[5, 11, 6, 127, 40]

//-----------------------------------------------------------------------
console.log("(2)-----------------------------------------------");
// 2
function getWeekday(date) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (isNaN(date) || date === null) {
    return "Invalid Date";
  } else {
    return days[date.getDay()];
  }
}
//Test====>
console.log(getWeekday(new Date())); // "Sunday”
console.log(getWeekday(new Date("2012-10-10"))); // 'wednesday'
console.log(getWeekday(new Date("Hi"))); // 'Invalid Date'
console.log(getWeekday(undefined)); // "Invalid Date"
console.log(getWeekday(null)); // "Invalid Date"
console.log(getWeekday()); // "Invalid Date"

//-----------------------------------------------------------------------
console.log("(3)-----------------------------------------------");
// 3
function getRandomInt(min, max) {
  if (
    min > max ||
    isNaN(min) ||
    isNaN(max) ||
    min === Infinity ||
    min === -Infinity ||
    max === Infinity ||
    max === -Infinity
  ) {
    return "Invalid Number";
  } else if (typeof min === "number" && typeof max === "number") {
    max = Math.round(max);
    min = Math.round(min);
    return Math.round(Math.random() * (max - min)) + min;
  } else {
    return "Invalid Number";
  }
}

//Test====>
console.log(getRandomInt(1, 10)); // Random integer between 1 and 10
console.log(getRandomInt(8, 10)); // Random integer between 8 and 10
console.log(getRandomInt(5.33, 10.66)); //Random integer between 5 and 11
console.log(getRandomInt(5, 5)); // 5
console.log(getRandomInt("sa", 9)); // Invalid Number
console.log(getRandomInt({}, [])); // Invalid Number
console.log(getRandomInt(30, 9)); // Invalid Number
console.log(getRandomInt(NaN, 10)); // "Invalid Number"
console.log(getRandomInt(5, Infinity)); // "Invalid Number"
console.log(getRandomInt(-Infinity, Infinity)); // "Invalid Number"

//-----------------------------------------------------------------------
console.log("(4)-----------------------------------------------");
// 4
function kebabToPascalCase(sentence) {
  const words = sentence.split(" ");
  const transformedWords = words.map((word) => {
    if (word.includes("-")) {
      const parts = word.split("-");
      const pascalCaseWord = parts
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("");
      return pascalCaseWord;
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
  });
  return transformedWords.join(" ");
}
//Test====>
console.log(kebabToPascalCase("convert kebab-case to pascal-case")); //"Convert KebabCase To PascalCase"
console.log(kebabToPascalCase("background-color font-size padding margin")); //BackgroundColor FontSize Padding Margin
