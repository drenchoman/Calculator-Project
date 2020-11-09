// Operation functions

function sum(...args) {
  return args.reduce((totalSum, currentValue) =>
    totalSum + currentValue);

};

function subtract(...args) {
  let result = args.reduce((totalSum, currentValue) =>
    totalSum - currentValue);
  return result;

};

function multiply(...args) {
  let result = args.reduce((totalSum, currentValue) =>
    totalSum * currentValue);
  return result;
}

function divide(...args) {
  let result = args.reduce((totalSum, currentValue) =>
    totalSum / currentValue);
  return result;
}

function operate(operand, ...args) {
  if (operand === "+") {
    return sum(...args)
  } else if (operand === "-") {
    return subtract(...args)
  } else if (operand === "*") {
    return multiply(...args);
  } else if (operand === "/") {
    return divide(...args)
  } else {
    console.log("Something went wrong")
  }

}

// Set variables
let num1 = "";
let num2 = "";
let operand = "";
const keyboardValues = [
  "Backspace", "/", "7", "8", "9", "*", "4", "5", "6", "-",
  "1", "2", "3", "+", "0", ".", "Enter", "c"
];

// Dom selectors
let all = document.querySelectorAll("button");
let nums = document.querySelectorAll(".number");
let op = document.querySelectorAll(".operator");
let eq = document.querySelector(".equals");
let clear = document.querySelector(".clear");
let bSpace = document.querySelector(".backSpace")

//Event Listeners
nums.forEach(function(b) {
  b.addEventListener("click", addNumber);
});

op.forEach(function(o) {
  o.addEventListener("click", operation);
});

eq.addEventListener("click", calculate);

clear.addEventListener("click", clearScreen);

all.forEach(function(b) {
  b.addEventListener("click", addSound);
})

all.forEach(function(b) {
  b.addEventListener("click", addActive)
});

bSpace.addEventListener("click", backSpace);


document.addEventListener("keydown", keyPress);
// Add numbers

function addNumber(e) {
  if (operand === "") {
    if (checkString(num1) === true)
      if (checkDecimal(num1) === false) {
        num1 += e.target.value;
        calculationArea.textContent = num1;
      } else if (checkDecimal(num1) === true && e.target.value != ".") {
      num1 += e.target.value;
      calculationArea.textContent = num1;
    }


  } else if (operand != "") {
    if (checkString(num2) === true)
      if (checkDecimal(num2) === false) {
        num2 += e.target.value;
        calculationArea.textContent = num2;
      } else if (checkDecimal(num2) === true && e.target.value != ".") {
      num2 += e.target.value;
      calculationArea.textContent = num2;
    }
  } else {
    console.log("Something went wrong")
  }
};

// Get and save operator value

function operation(e) {
  if (num1 === "-") {
    console.log("Error")
  } else if (operand === "" && num1 != "") {
    operand = e.target.value;
    calculationArea.textContent = "";
    runningTotal.textContent = num1 + operand;
  } else if (operand != "" && num2 != "") {
    calculate2();
    operand = e.target.value;
  } else if (e.target.value === "-" && num1 === "") {
    num1 += "-"
    calculationArea.textContent = num1;
  }

};

// Calculate result from 2 numbers.

function calculate() {
  if (num1 != "" && num2 != "") {
    runningTotal.textContent = num1 + operand + num2;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    result = operate(operand, num1, num2)
    if (result % 1 !== 0) {
      result = result.toFixed(4)
    };
    calculationArea.textContent = result;
    num1 = result.toString();
    num2 = ""
    operand = ""
    console.log("calc 1 being used")
  } else if (num1 != "" && num2 === "") {
    calculationArea.textContent = num1;
    runningTotal.textContent = ""
  } else if (num1 === "" && num2 != "") {
    calculate();
  } else {
    console.log("Something went wrong")
  }
};

// Calculate function if not using " = " operator

function calculate2() {
  if (num1 != "" && num2 != "") {
    runningTotal.textContent = num1 + operand + num2;
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    result = operate(operand, num1, num2)
    if (result % 1 !== 0) {
      result = result.toFixed(4)
    };
    runningTotal.textContent = result;
    calculationArea.textContent = "";
    num1 = result.toString();
    num2 = ""
    operand = ""
    console.log("calc 2 being used")
  } else {
    console.log("Something went wrong")
  };
};

// Reset calculator

function clearScreen() {
  num1 = "";
  num2 = "";
  operand = "";
  calculationArea.textContent = ""
  runningTotal.textContent = ""
};

//Add sound to buttons

function addSound(e) {
  let sound = new Audio();
  sound.src = "sound/click.mp3";
  sound.play();
}

// Remove last number

function backSpace() {
  if (num1 != "" && num2 != "") {
    num2 = num2.slice(0, -1);
    calculationArea.textContent = num2
  } else if (num1 != "") {
    num1 = num1.slice(0, -1);
    calculationArea.textContent = num1;
  }
  console.log(num1);
}


// Add keyboard support

function keyPress(e) {
  if (keyboardValues.includes(e.key)) {
    const node = document.querySelector(`button[value='${e.key}']`);
    node.click();
  }
};


// Add active class to button

function addActive(e) {
  e.target.classList.add("active");
  setTimeout(function() {
    e.target.classList.remove("active");
  }, 100);
};


//Check string length
function checkString(string) {
  if (string.length < 14) {
    return true
  } else if (string.length > 14) {
    return false
  }
};

//Check for multiple decimals
function checkDecimal(string) {
  if (string.includes(".") === true) {
    return true;
    console.log("Cant add more than 1 decimal")
  }
  return false;
}

// Display screen area

let runningTotal = document.querySelector("#calcSum")
let calculationArea = document.querySelector("#numbers");
calculationArea.textContent = ""
