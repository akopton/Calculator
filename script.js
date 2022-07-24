const currentOperandElement = document.querySelector('.calculator__result') // value handler (main display)
const previousOperandElement = document.querySelector('.display__value-handler') // value handler (small display)
const percentButton = document.querySelector('[data-operation=percent]')
const clearAllButton = document.querySelector('[data-clear-all]');
const clearCurrentButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]');
const equalsButton = document.querySelector('[data-operation=equal]')
const makeNegativeBtn = document.querySelector('[data-operation=negative]')

const operationButtons = [];
const valueButtons = [];

function setAllButtons() {
    document.querySelectorAll('[data-operation]:not([data-operation=negative], [data-operation=percent], [data-operation=equal])').forEach(btn => {
        operationButtons.push({
            id: btn.dataset.operation,
            element: btn,
            value: btn.dataset.operationValue
        })
    }) 
    document.querySelectorAll('[data-number]').forEach(btn => {
        valueButtons.push({
            id: btn.dataset.number,
            element: btn,
            value: btn.dataset.number
        })
    })
}
setAllButtons()

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
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }


    makeNegative() {
        this.currentOperand = this.currentOperand.toString()
        if (this.currentOperand[0] != '-') {
            this.currentOperand = '-' + this.currentOperand
        } else {
            this.currentOperand = this.currentOperand.slice(1)
        }
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



makeNegativeBtn.addEventListener('click', ()=>{
    calculator.makeNegative()
    calculator.updateDisplay()
})


valueButtons.forEach(btn => {
    btn.element.addEventListener('click', () => {
        if (calculator.currentOperand.length < 10) {
            calculator.appendNumber(btn.value)
            calculator.updateDisplay()
        }
    })
})

operationButtons.forEach(btn => {
    btn.element.addEventListener('click', () => {
        calculator.chooseOperation(btn.value)
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

