//1
console.log("(1)-----------------------------------------------");
function countOccurrences(arr) {
  const myMap = new Map();
  for (let i = 0; i < arr.length; i++) {
    if (myMap.has(arr[i])) {
      myMap.forEach((value, key) => {
        if (key === arr[i]) {
          myMap.set(key, ++value);
        }
      });
    } else {
      myMap.set(arr[i], 1);
    }
  }
  return myMap;
}

const items = ["apple", "banana", "apple", "orange", "banana", "banana"];
const result = countOccurrences(items);
console.log(result);
// Expected Output: Map(3) { 'apple' => 2, 'banana' => 3, 'orange' => 1 }

//2
console.log("(2)-----------------------------------------------");
function multiply(...args) {
  const mySet = new Set();
  for (let i = 0; i < args.length; i++) {
    mySet.add(args[i]);
  }
  let result = 1;
  mySet.forEach((value) => {
    result *= value;
  });
  return result;
}

console.log(multiply(2, 3, 4)); // 24
console.log(multiply(2, 3, 2, 4)); // 24
console.log(multiply(5, 5, 5, 5, 1)); // 5
console.log(multiply(7, 7, 2)); // 14

//3
console.log("(3)-----------------------------------------------");
function getElement(array, index) {
  try {
    if (!Array.isArray(array)) {
      throw new TypeError("First argument must be an array");
    }
    if (typeof index !== "number") {
      throw new TypeError("Second argument must be a number");
    }
    if (index >= array.length) {
      throw new RangeError("Index out of bounds");
    }
    return array[index];
  } catch (error) {
    if (error instanceof RangeError) {
      return `RangeError: ${error.message}`;
    } else {
      return `TypeError: ${error.message}`;
    }
  }
}
let arr = [1, 2, 3, 4, 5];
console.log(getElement(arr, 2)); // 3
console.log(getElement(arr, 5)); // RangeError: Index out of bounds
console.log(getElement(arr, 10)); // RangeError: Index out of bounds
console.log(getElement(arr, "two")); // TypeError: Second argument must be a number
console.log(getElement("not an array", 2)); // TypeError: First argument must be an array
