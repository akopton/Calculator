const currentOperandElement = document.querySelector('.calculator__result') // value handler (main display)
const previousOperandElement = document.querySelector('.display__value-handler') // value handler (small display)
const valueButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]:not([data-operation=equal],[data-operation=percent])')
const percentButton = document.querySelector('[data-operation=percent]')
const clearAllButton = document.querySelector('[data-clear-all]');
const clearCurrentButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-operation=equal]')

class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement
        this.currentOperandElement = currentOperandElement
        this.clear()
    }

    clear() {
        this.previousOperandElement.innerText = ''
        this.currentOperandElement.innerText = '0'
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    clearCurrent() {
        this.currentOperandElement.innerText = '0'
        this.currentOperand = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
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
        this.previousOperandElement.innerText += ` ${this.getDisplayNumber(this.currentOperand)} =`
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    makePercent() {
        let computation
        const current = parseFloat(this.currentOperand)
        computation = current / 100
        this.currentOperand = computation
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
        integerDisplay = ''
        } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
        } else {
        return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.currentOperand == '') {
            this.currentOperandElement.innerText = this.previousOperand
        }
        if (this.currentOperandElement.innerText == '') {
            this.currentOperandElement.innerText = '0'
        }
        if (this.operation != null) {
            this.previousOperandElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        }
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

percentButton.addEventListener('click', () => {
    calculator.makePercent()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

clearCurrentButton.addEventListener('click', () => {
    calculator.clearCurrent()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})

