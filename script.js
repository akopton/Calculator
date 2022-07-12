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
        this.previousOperandElement.innerText = '0'
        this.currentOperandElement.innerText = '0'
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
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.previousOperandElement.innerText = this.currentOperand + ' ' + operation
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case 'x':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default: 
                return
        }
        this.previousOperandElement.innerText = this.previousOperand + ' ' + this.operation + ' ' + this.currentOperand + ' ='
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand
        if (this.currentOperandElement.innerText == '') this.currentOperandElement.innerText = this.previousOperand
    }
}

const calculator = new Calculator(previousOperandElement, currentOperandElement);

valueButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.chooseOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})