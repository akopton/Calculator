const currentOperandElement = document.querySelector('.calculator__result'); // value handler (main display)
const previousOperandElement = document.querySelector('.display__value-handler'); // value handler (small display)
const valueButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]:not([data-operation=equal])');
const clearAllButton = document.querySelector('[data-clear-all]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-operation=equal]')

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete() {

    }

    appendNumber(number) {
        if (number === '.' && this.currentOperandElement.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand
    }
}

const calculator = new Calculator(previousOperandElement, currentOperandElement);

valueButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText);
        calculator.updateDisplay();
    })
})