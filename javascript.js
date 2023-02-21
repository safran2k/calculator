const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const bigText = document.querySelector('#big-text');
const smallText = document.querySelector('#small-text');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');
const dot = document.querySelector('#decimal-point');
const backspace = document.querySelector('#backspace');

let appendingNumber = false;
let appendingNegativeSign = false;
let operatorActive = false;

numbers.forEach(number => {
    number.addEventListener('click', ()=> {
        selectNumber(number.id);
    });
});

document.addEventListener('keydown', event => {
    // selectNumber(event.key);
    if(0 <= event.key & event.key <= 9) {
        selectNumber(event.key);
    } else if (event.key === "Backspace"){
        selectBackspace();
    } else if (event.key === "Enter" | event.key === "=") {
        selectEquals();
    } else if (event.key === "Escape" | event.key === "C" | event.key === "c") {
        selectClear();
    } else if (event.key === ".") {
        addDecimalPoint();
    } else if ("/*-+^".includes(event.key)){
        selectOperation(event.key);
    }
});

operations.forEach(operation => {
    operation.addEventListener('click', ()=> {
        selectOperation(operation.textContent);
    });
});

clear.addEventListener('click', () => {
    selectClear();
});

equals.addEventListener('click', () => {
    selectEquals();
});

dot.addEventListener('click', () => {
    addDecimalPoint();
});

backspace.addEventListener('click', () => {
   selectBackspace();
});

function selectNumber(numberSelected){
    if(appendingNegativeSign){
        // bigText.textContent += "";
    } else if(!appendingNumber){
        bigText.textContent += "  ";
    }
    bigText.textContent += numberSelected;
    resetAppendingNumberVariable();
    operatorActive = false;
    appendingNegativeSign = false;
}

function selectBackspace(){
    bigText.textContent = bigText.textContent.trimEnd();
    bigText.textContent = bigText.textContent.slice(0, -1);
    bigText.textContent = bigText.textContent.trimEnd();
    resetAppendingNumberVariable();
}

function selectEquals(){
    bigText.textContent = bigText.textContent.trimStart();
    const bigTextArray = bigText.textContent.split("  ");
    const valuesArray = bigTextArray.map(alterValuesArray);

    if(!appendingNumber) {
        valuesArray.pop();
    }
    while (valuesArray.length > 1) {
       let newValue = operate(valuesArray[0], valuesArray[1], valuesArray[2]);
       valuesArray.shift();
       valuesArray.shift();
       valuesArray[0] = newValue;
    }

    smallText.textContent = bigText.textContent;
    bigText.textContent = valuesArray[0];
    resetAppendingNumberVariable();
    appendingNegativeSign = false;
}

function selectClear(){
    bigText.textContent = "";
    smallText.textContent = "";
    resetAppendingNumberVariable();
    operatorActive = false;
    appendingNegativeSign = false;
}

function selectOperation(operationSelected){
    switch(operationSelected){
        case "/": 
        operationSelected = "÷";
        break;
        
        case "*": 
        operationSelected = "×";
        break;

        case "-": 
        operationSelected = "−";
        break;

        default:
            break;
    }
    if(appendingNumber) {
        bigText.textContent += "  " + operationSelected;
    } else if ((operation.id === 'subtract') && !appendingNegativeSign) {
        if(operatorActive) {
            bigText.textContent += "  ";
        }
        appendingNegativeSign = true;
        bigText.textContent += operationSelected;

    }

    resetAppendingNumberVariable();
    operatorActive = true;
}

function add(num1, num2){
    return +num1 + +num2;
}

function subtract(num1, num2){
    return num1 - num2;
}

function mult(num1, num2){
    return num1 * num2;
}

function divide(num1, num2){
    return num1 / num2;
}

function pow(num1, num2) {
    return Math.pow(num1, num2);
}

function operate(num1, operation, num2) {
    return operation(num1, num2);
}

function alterValuesArray(textValue) {
    textValue = changeOperatorTextToId(textValue);
    textValue = changeNegativeStringsToNums(textValue);
    return textValue;
}

function changeOperatorTextToId(operatorText){
    let operationAsTextOutput = "";
    operations.forEach(operator => {
        switch(operatorText) {
            case "÷":
                operationAsTextOutput = divide;
                break;
            
            case "×":
                operationAsTextOutput = mult;
                break;
            
            case "−":
                operationAsTextOutput = subtract;
                break;
                
            case "+":
                operationAsTextOutput = add;
                break;
            
            case "^":
                operationAsTextOutput = pow;
                break;
            
            default:
                operationAsTextOutput = operatorText;
                break;
        }
        // not sure why if statement wasn't working here #help
        // if(operatorText === operator.textContent) {
        //     operationAsTextOutput = operator.id;
        // } else {
        //     operationAsTextOutput = operatorText;
        // }
    });
    return operationAsTextOutput;
}

function changeNegativeStringsToNums(textValue){
    let negativeNumberOutput = textValue;
    textValue = "" + textValue + "";
    if (textValue.startsWith("−")){
        negativeNumberOutput = textValue.substr(1);
        negativeNumberOutput *= -1;
    }
    return negativeNumberOutput;
}

function addDecimalPoint() {
    let ableToAddDecimalPoint = false;
    let activeNumbers = bigText.textContent.split("  ");
    let finalNumber = "" + activeNumbers[activeNumbers.length -1];
    if(!appendingNumber) {
        bigText.textContent += "  0";
        resetAppendingNumberVariable();
        ableToAddDecimalPoint = true;
    } else if (bigText.textContent === ""){
        ableToAddDecimalPoint = false;
    } else if (finalNumber.includes(".")){
        ableToAddDecimalPoint = false;
    } else {
        ableToAddDecimalPoint = true;
    }

    if(ableToAddDecimalPoint) {
        bigText.textContent += ".";
    }
}

function resetAppendingNumberVariable(){
    activeNumbers = bigText.textContent.split("  ");
    let finalNumber = "" + activeNumbers[activeNumbers.length -1];
    if("÷×−+^".includes(finalNumber)) {
        appendingNumber = false;
    } else {
        appendingNumber = true;
    }
}