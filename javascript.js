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
        if(appendingNegativeSign){
            // bigText.textContent += "";
        } else if(!appendingNumber){
            bigText.textContent += "  ";
        }
        bigText.textContent += number.id;
        appendingNumber = true;
        operatorActive = false;
        appendingNegativeSign = false;
    });
});

operations.forEach(operation => {
    operation.addEventListener('click', ()=> {
        if(appendingNumber) {
            bigText.textContent += "  " + operation.textContent;
        } else if ((operation.id === 'subtract') && !appendingNegativeSign) {
            if(operatorActive) {
                bigText.textContent += "  ";
            }
            appendingNegativeSign = true;
            bigText.textContent += operation.textContent;

        }

        appendingNumber = false;
        operatorActive = true;

    });
});

clear.addEventListener('click', () => {
    bigText.textContent = "";
    smallText.textContent = "";
    appendingNumber = false;
    operatorActive = false;
    appendingNegativeSign = false;
});

equals.addEventListener('click', () => {
    bigText.textContent = bigText.textContent.trimStart();
    const bigTextArray = bigText.textContent.split("  ");
    const valuesArray = bigTextArray.map(alterValuesArray);
    console.table(valuesArray);

    while (valuesArray.length > 1) {
       let newValue = operate(valuesArray[0], valuesArray[1], valuesArray[2]);
       valuesArray.shift();
       valuesArray.shift();
       valuesArray[0] = newValue;
    }

    smallText.textContent = bigText.textContent;
    bigText.textContent = valuesArray[0];
    appendingNumber = true;
    appendingNegativeSign = false;

});

dot.addEventListener('click', () => {
    if(checkIfAbleToAddDecimalPoint()) {
        bigText.textContent += ".";
    }
});

backspace.addEventListener('click', () => {
    bigText.textContent = bigText.textContent.trimEnd();
    bigText.textContent = bigText.textContent.slice(0, -1);
    bigText.textContent = bigText.textContent.trimEnd();

    resetAppendingNumberVariable();
});

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

function checkIfAbleToAddDecimalPoint() {
    let activeNumbers = bigText.textContent.split("  ");
    let finalNumber = "" + activeNumbers[activeNumbers.length -1];
    console.log(finalNumber);
    if(!appendingNumber) {
        bigText.textContent += "  0";
        appendingNumber = true;
        return true;
    } else if (bigText.textContent === ""){
        return false;
    } else if (finalNumber.includes(".")){
        return false;
    } else {
        return true;
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