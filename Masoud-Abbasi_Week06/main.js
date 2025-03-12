//1
function isPrime(number) {
  if (typeof number !== "number") return "invalid arguments";
  if (number < 2) return false;
  else if (number === 2 || number === 3) return true;
  else {
    for (let i = 2; i <= Math.sqrt(number); i++) {
      if (number % i === 0) return false;
      else return true;
    }
  }
}
console.log(isPrime(2)); // true
console.log(isPrime(3)); // true
console.log(isPrime(5)); // true
console.log(isPrime(7)); // true
console.log(isPrime("two")); // 'invalid argument'
console.log(isPrime(0)); // false
console.log(isPrime(1)); // false
console.log(isPrime(4)); // false
console.log(isPrime(6)); // false
console.log(isPrime(8)); // false

console.log("_________________________________________________");

//2
function calculate(a, b, operator) {
  if (typeof a !== "number" || typeof b !== "number")
    return "invalid arguments";
  switch (operator) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "/": {
      if (b === 0) return "invalid arguments";
      return a / b;
    }
    case "*":
      return a * b;
    default:
      return "invalid arguments";
  }
}
console.log(calculate(2, 3, "+")); // 5
console.log(calculate(2, 3, "-")); // -1
console.log(calculate(2, 0, "/")); // 'invalid arguments'
console.log(calculate(4, 2, "/")); // 2
console.log(calculate(2, 4, "*")); // 8
console.log(calculate(2, 4, "**")); // 'invalid arguments'
console.log(calculate(2, 4, "n")); // 'invalid arguments'
console.log(calculate(2, "v", "*")); // 'invalid arguments'
console.log(calculate("2", 4, "*")); // 'invalid arguments'
