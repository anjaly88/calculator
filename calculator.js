const calculator = document.querySelector(".calculator");
const keys = document.querySelector("calculator__keys");
const display = document.querySelector('.calculator__display')


document.addEventListener("click", e => {
  if (e.target.matches("button")) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    Array.from(key.parentNode.children)
      .forEach(k => k.classList.remove('is-depressed'))

    if (!action) {
      if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = keyContent;
      }
      else {
        display.textContent = displayedNum + keyContent;
      }
      calculator.dataset.previousKeyType = 'number';

    }

    if (action === 'add' || action === 'subtract' || action === 'divide' || action === 'multiply') {
      const firstValue = calculator.dataset.firstValue;
      const operator = calculator.dataset.operator;
      const secondValue = displayedNum;
      calculator.dataset.previousKeyType = 'operator'
      calculator.dataset.operator = action
      if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
        const calcValue = calculate(firstValue, operator, secondValue)
        display.textContent = calcValue
        calculator.dataset.firstValue = calcValue

      } else {
        calculator.dataset.firstValue = displayedNum

      }
      key.classList.add('is-depressed')

    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {

        display.textContent = displayedNum + '.';
      }
      else if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
        display.textContent = '0.'
      }
      calculator.dataset.previousKeyType = 'decimal'


    }
    if (action === 'calculate') {

      const firstValue = calculator.dataset.firstValue
      const operator = calculator.dataset.operator
      const secondValue = displayedNum

      if (firstValue && previousKeyType !== 'calculate') {
        display.textContent = calculate(firstValue, operator, secondValue)
      }

      calculator.dataset.previousKeyType = 'calculate'

    }
    if (action === 'clear') {
      if (key.textContent === 'AC') {
        calculator.dataset.firstValue = ''
        calculator.dataset.modValue = ''
        calculator.dataset.operator = ''
        calculator.dataset.previousKeyType = ''
      } else {
        key.textContent = 'AC'
      }

      display.textContent = 0
      calculator.dataset.previousKeyType = 'clear'

    }
    if (action !== 'clear') {
      const clearButton = calculator.querySelector('[data-action=clear]')
      clearButton.textContent = 'CE'
    }

  }

})

const calculate = (n1, operator, n2) => {
  const firstNum = parseFloat(n1);
  const secNum = parseFloat(n2);

  if (operator === 'add') return firstNum + secNum;
  if (operator === 'subtract') return firstNum - secNum;
  if (operator === 'multiply') return firstNum * secNum;
  if (operator === 'divide') return firstNum / secNum;

}