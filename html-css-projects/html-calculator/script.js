const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');


const calculate = (n1, operator, n2) => {
    // Perform calculation and return calculated value
    n1 = Number(n1);
    n2 = Number(n2);
    if (operator === 'add') return n1 + n2;

    if (operator === 'subtract') return n1 - n2;

    if (operator === 'multiply') return n1 * n2;

    if (operator === 'divide') return n1 / n2;

}

keys.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;
        const previousKeyType = calculator.dataset.previousKeyType;

        // Releasing all keys if pressed a button
        Array.from(keys.children).forEach(k => k.classList.remove('is-depressed'));

        if (!action) {
            // This must be a number key
            console.log('Number key!');   

            if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = keyContent
            }
            else {
                display.textContent = displayedNum + keyContent;
            }
            calculator.dataset.previousKeyType = 'number';

        }
        else if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
            console.log('operator key');

            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayedNum;

            // If we have first value and also have a operator
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                display.textContent = calculate(firstValue, operator, secondValue);
            }
            
            key.classList.add('is-depressed');
            
            calculator.dataset.firstValue = display.textContent; // updated display value
            // Saving operator
            calculator.dataset.operator = action;
            // Saving previousKeyType
            calculator.dataset.previousKeyType = 'operator';
        }
        else if (action === 'decimal') {
            console.log('decimal key');
            if (!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.';
            }
            else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
                
                display.textContent = '0.';
            }
            calculator.dataset.previousKeyType = action;
        }
        else if (action === 'calculate') {
            console.log('calculate');
            let firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            let secondValue = displayedNum;

            // calling calculate function
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modValue;
                }
                display.textContent = calculate(firstValue, operator, secondValue);
            }
            calculator.dataset.modValue = secondValue;
            calculator.dataset.previousKeyType = action;

        }
        else if (action === 'clear') {
            console.log('clear');
            if (keyContent === 'AC') {
                calculator.dataset.firstValue = '';
                calculator.dataset.modValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
            }
            else {
                display.textContent = '0';
            }
            key.textContent = 'AC';
            calculator.dataset.previousKeyType = action;
        }
        
        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE';
        }
    }
})