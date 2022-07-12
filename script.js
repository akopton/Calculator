const display = document.querySelector('.calculator__result');
const valueHandler = document.querySelector('.display__value-handler');
const valueButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]:not([data-operation=equal])');
const clearAllButton = document.querySelector('[data-clear-all]');
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-operation=equal]')

class Calculator {
    constructor(firstOperand, secondOperand) {
        this.firstOperand = firstOperand
        this.secondOperand = secondOperand
        this.clear()
    }

    clear() {

    }

    delete() {

    }

    appendNumber(number) {

    }

    chooseOperation(operation) {

    }

    compute() {

    }

    updateDisplay() {

    }
}