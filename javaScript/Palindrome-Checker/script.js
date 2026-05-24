const inputText = document.getElementById("text-input");
const result = document.getElementById("result");
const checkBtn = document.getElementById("check-btn");

function handleOutput() {
  // Assign input value
  const input = inputText.value;

  // Convert into lowerCase
  const lowerCaseInput = input.toLowerCase();

  // Convert into an array
  const splitValue = lowerCaseInput.split("");

  // filter alphanumeric chars
  const clean = splitValue.filter((char) => /[a-z0-9]/i.test(char));


  // convert into string
  const freshCleanJoin = clean.join("");
  console.log("freshClean : ", freshCleanJoin)


  // Reverse array
  const reverseValue = [...clean].reverse();

  //convert array into string value
  const joinValue = reverseValue.join("");
  console.log("JoinValue : ", joinValue)


  //compare values
  if (freshCleanJoin === joinValue) {
    result.innerHTML = `${input} is a palindrome`;
  } else {
    result.innerHTML = `${input} is not a palindrome`;
  }
}

checkBtn.addEventListener("click", () => {
  if (inputText.value.trim() === "") {
    alert("Please input a value");
  } else {
    handleOutput();
  }
});
