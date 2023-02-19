const numbers = document.querySelectorAll('.number');
const operations = document.querySelectorAll('.operation');
const bigText = document.querySelector('#big-text');
const smallText = document.querySelector('#small-text');
let appendingNumber = true;

numbers.forEach(number => {
    number.addEventListener('click', ()=> {
        if(!appendingNumber){
            bigText.textContent += "  ";
        }
        bigText.textContent += number.id;
        appendingNumber = true;
    });
});

operations.forEach(operation => {
    operation.addEventListener('click', ()=> {
        if(appendingNumber){
            bigText.textContent += "  " + operation.textContent;
        }
        appendingNumber = false;
    });
});

// console.table(Array.from(numbers));




function add(num1, num2){
    return num1 + num2;
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

function operate(operation, num1, num2) {
    return operation(num1, num2);
}
