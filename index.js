class Calculator {
    constructor() {
        this.operator = null;
        this.num1 = null;
        this.num2 = null;
        this.result = null;
    }

    add() {
        return this.num1 + this.num2;
    }

    subtract() {
        return this.num1 - this.num2;
    }

    multiply() {
        return this.num1 * this.num2;
    }

    divide() {
        return this.num1 / this.num2;
    }

    operate() {
        if (!this.num1 || !this.num2 || !this.operator) {
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
        // TODO: Number with comma
        if (!this.operator) {
            const currentNum = this.num1 || '';
            
            this.num1 = parseInt(currentNum.toString() + num.toString())
        } else {
            const currentNum = this.num2 || '';
            
            this.num2 = parseInt(currentNum.toString() + num.toString())
        }
    }

    saveOperator(operator) {
        // Check if we're trying to "chain" operations
        // Otherwise, just update the operator
        if (this.num1 && this.num2 && this.operator) {
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

    delete() {
        if (this.num2) {
            const numStr = this.num2.toString();
            this.num2 = numStr.slice(0, numStr.length - 1);
        } else if (this.operator) {
            this.operator = null;
        } else if (this.num1) {
            const numStr = this.num1.toString();
            this.num1 = numStr.slice(0, numStr.length - 1);
        }
    }

    updateDisplay() {
        const display = document.querySelector('#display');

        const displayText = this.result ?
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
        case ',':
            console.log(`Comma`)
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
