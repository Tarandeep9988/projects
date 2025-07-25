const calculator = document.querySelector(".calculator");
const keys = calculator.querySelector(".calculator__keys");
const display = calculator.querySelector(".calculator__display");

const calculate = (n1, operator, n2) => {
    n1 = parseFloat(n1);
    n2 = parseFloat(n2);

    let result = '';
    if (operator === 'add') {
        result = n1 + n2;
    } else if (operator === 'subtract') {
        result = n1 - n2;
    } else if (operator === 'multiply') {
        result = n1 * n2;
    } else if (operator === 'divide') {
        result = n1 / n2
    }

    return result;
}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        // If other key already depressed
        Array.from(keys.children).forEach(k => {
            k.classList.remove("is-depressed");
        })

        // Do something
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (!action) {
            if (displayNum === '0' || previousKeyType === 'operator') {
                display.textContent = keyContent;
            }
            else {
                display.textContent = displayNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }
        else if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide' 
        ) {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayNum;
            
            
            if (firstValue && operator && previousKeyType !== 'operator') {
                display.textContent = calculate(firstValue, operator, secondValue);
            }
            
            key.classList.add('is-depressed');

            // Adding custom attributes
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.firstValue = displayNum;
            calculator.dataset.operator = action;

        }
        else if (action === 'decimal') {
            if (!displayNum.includes(".")) {
                display.textContent = displayNum + "."
            } else if (previousKeyType === 'operator') {
                display.textContent = '0.';
            }

            calculator.dataset.previousKeyType = 'decimal';
        }
        else if (action === 'clear') {
            // console.log('clear');
            display.textContent = '0';
            calculate.dataset = null;

            calculator.dataset.previousKeyType = 'clear';
            
        }
        else if (action === 'calculate') {

            // console.log('equal key');
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayNum;

            // if first value is available
            if (firstValue) {
                display.textContent = calculate(firstValue, operator, secondValue);
            }


            calculator.dataset.previousKeyType = 'calculate';
        }
    }
})