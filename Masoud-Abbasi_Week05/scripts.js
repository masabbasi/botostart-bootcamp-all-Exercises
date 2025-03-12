const $ = document;
// Start: First Exercise
const submitUsernameButton = $.getElementById("firstExercise__create");
const clearButton = $.getElementById("firstExercise__clear");
const inputElement = $.getElementsByClassName("firstExercise__input")[0];
const outputUsernameElement = $.getElementById("firstExercise__output--item");

submitUsernameButton.addEventListener("click", function () {
  const email = inputElement.value;
  const atSign = email.indexOf("@");
  const userName = email.slice(0, atSign);
  outputUsernameElement.textContent = userName;
});

clearButton.addEventListener("click", function () {
  inputElement.value = null;
  outputUsernameElement.textContent = "____________";
});
// End: First Exercise

// Start: Second Exercise
const outputMobileElement = $.getElementById("secondExercise__output--item");
const submitMobileButton = $.getElementById("secondExercise__create");
const mobileList = [
  "+989393676765",
  "+989393456123",
  "+989393455465",
  "+989393456722",
  "+989393456765",
];

submitMobileButton.addEventListener("click", function () {
  const middleNumberIndex = parseInt(mobileList.length / 2);
  const mobileTarget = mobileList[middleNumberIndex];
  const mobile = mobileTarget.replace("+98", "0");
  outputMobileElement.textContent = mobile;
});

// End: Second Exercise
