const screen = document.querySelector(".screen > .input > .content");
const answer = document.querySelector(".screen > .input > .answer");

const operations = {"+": (n1, n2) => n1+n2,
    "-": (n1, n2) => n1-n2,
    "*": (n1, n2) => n1*n2,
    "/": (n1, n2) => n1/n2};


function clearScreen () {
  screen.textContent = "";
}

function operate () {
  let expression = screen.textContent;
  expression = expression.replace(/\s/g, "")
  if (expression[0] == "-") {
    expression = "0" + expression;
  }
  if (expression.slice(-1).search(/\d+/)) {
    expression = expression.slice(0,-1);
  }
  operator = expression.match(/[*/]/g);
  if (operator != null) {
    for (let operation of operator) {
      let actualExpression = expression.match("\\-?\\d+\["+operation+"]-?\\d+")[0];
      let n1 = Number(actualExpression.match(/-?\d+/));
      let n2 = Number(actualExpression.match(/-?\d+$/));
      expression = expression.replace(actualExpression,
         operations[operation](n1, n2));
    }
  }

  operator = expression.match(/[+\-]/g);
  if (operator != null) {
    for (let operation of operator) {
      let actualExpression = expression.match("\\-?\\d+\["+operation+"]-?\\d+")[0];
      let n1 = Number(actualExpression.match(/-?\d+/));
      let n2 = Number(actualExpression.match(/-?\d+$/));
      expression = expression.replace(actualExpression,
         operations[operation](n1, n2));
    }
  }
  answer.textContent = expression;
}

function changeScreen () {
  screen.textContent = answer.textContent;
}





for (let button of document.querySelectorAll(".button")) {
  button.addEventListener("click", (e) => {
    let button_value = button.getAttribute("data-value");
    if (button_value == "AC") {
      clearScreen();
    } else if (Object.keys(operations).includes(button_value.trim())) {
      if (screen.textContent != "" &&
          !Object.keys(operations).includes(screen.textContent.slice(-2, -1)) ||
          button_value == " - " && screen.textContent.slice(-2, -1) != "-") {
        screen.textContent += button_value;
      }
    } else if (button_value.trim() == "=") {
      changeScreen();
    } else {
      screen.textContent += button_value;
    }
    operate();
  });
}
