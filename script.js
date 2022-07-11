const result = document.querySelector('.calculator__result');
const buttons = document.querySelectorAll('.button');
const calcBtns = [];


function setButtons() {
    buttons.forEach(btn => {
        calcBtns.push({
            id: btn.id,
            element: btn,
            operation: btn.value ? '' : btn.innerHTML,
            value: btn.value ? btn.value : ''
        })
    })
}
setButtons();







