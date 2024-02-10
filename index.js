const MAX_DIGITS = 12;

class Calculator {
    constructor() {
        this.operator = null;
        this.num1 = null;
        this.num2 = null;
        this.result = null;
    }

    add() {
        const num1 = Number.isInteger(this.num1) ? parseInt(this.num1) : parseFloat(this.num1);
        const num2 = Number.isInteger(this.num2) ? parseInt(this.num2) : parseFloat(this.num2);

        return num1 + num2;
    }

    subtract() {
        const num1 = Number.isInteger(this.num1) ? parseInt(this.num1) : parseFloat(this.num1);
        const num2 = Number.isInteger(this.num2) ? parseInt(this.num2) : parseFloat(this.num2);

        return num1 - num2;
    }

    multiply() {
        const num1 = Number.isInteger(this.num1) ? parseInt(this.num1) : parseFloat(this.num1);
        const num2 = Number.isInteger(this.num2) ? parseInt(this.num2) : parseFloat(this.num2);

        let result = num1 * num2;

        if (!Number.isInteger(result) && result.toString().length > MAX_DIGITS) {
            result = result.toFixed(10);
        }

        return result;
    }

    divide() {
        const num1 = Number.isInteger(this.num1) ? parseInt(this.num1) : parseFloat(this.num1);
        const num2 = Number.isInteger(this.num2) ? parseInt(this.num2) : parseFloat(this.num2);

        let result = num1 / num2;

        if (!Number.isInteger(result) && result.toString().length > MAX_DIGITS) {
            result = result.toFixed(10);
        }

        return result;
    }

    operate() {
        if (this.num1 === null || this.num2 === null || this.operator === null) {
            return;
        }

        let result;

        switch (this.operator) {
            case '+':
                result = this.add();
                break;
            case '-':
                result = this.subtract();
                break;
            case '*':
                result = this.multiply();
                break;
            case '/':
                result = this.divide();
                break;
        }

        this.result = result;
    }

    saveNumber(num) {
        if (this.operator === null) {
            const currentNum = this.num1 || '';
            
            this.num1 = currentNum + num
        } else {
            const currentNum = this.num2 || '';
            
            this.num2 = currentNum + num
        }
    }

    saveOperator(operator) {
        // Check if we're trying to "chain" operations
        // Otherwise, just update the operator
        if (this.num1 !== null && this.num2 !== null && this.operator !== null) {
            this.operate();
            
            // Set num1 as current result
            this.num1 = this.result;
            this.num2 = null;
            this.operator = operator;
            this.result = null;
        } else {
            this.operator = operator;
        }
    }

    addDot() {
        if (this.num2 !== null) {
            let numStr = this.num2;

            if (numStr.indexOf('.') === -1) {
                numStr += '.';
                this.num2 = numStr;
            }
        } else if (this.num1 !== null) {
            let numStr = this.num1;

            if (numStr.indexOf('.') === -1) {
                numStr += '.';
                this.num1 = numStr;
            }
        }
    }

    delete() {
        if (this.num2 !== null) {
            const numStr = this.num2;
            this.num2 = numStr.slice(0, numStr.length - 1);
        } else if (this.operator !== null) {
            this.operator = null;
        } else if (this.num1 !== null) {
            const numStr = this.num1;
            this.num1 = numStr.slice(0, numStr.length - 1);
        }
    }

    updateDisplay() {
        const display = document.querySelector('#display');

        const displayText = this.result !== null ?
            `${this.result}` :
            `${this.num1 || ''}${this.operator || ''}${this.num2 || ''}`;

        display.textContent = displayText;
    }

    clearCalculator() {
        this.operator = null;
        this.num1 = null;
        this.num2 = null;
        this.result = null;
    }
}

const handleCalculatorButtonClick = (event) => {
    const buttonText = event.target.textContent;

    switch(buttonText) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            calculator.saveNumber(parseInt(buttonText));
            calculator.updateDisplay();
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            calculator.saveOperator(buttonText);
            calculator.updateDisplay();
            break;
        case '=':
            calculator.operate();
            calculator.updateDisplay();
            break;
        case '⌫':
            calculator.delete()
            calculator.updateDisplay();
            break;
        case '.':
            calculator.addDot();
            calculator.updateDisplay();
            break;
        case 'AC':
            calculator.clearCalculator();
            calculator.updateDisplay();
            break;
}
}

const main = () => {
    const calculatorButtons = document.querySelectorAll('.calculator-button');

    calculatorButtons.forEach((button) => {
        button.addEventListener('click', handleCalculatorButtonClick);
    })
}

let calculator = new Calculator();

main();
