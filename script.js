const numbers = document.querySelectorAll(".number")
const calculatorScreen = document.querySelector(".calculator-screen")
const operators = document.querySelectorAll(".operator")
const equalSign = document.querySelector(".equal-sign")
const clearBtn = document.querySelector(".all-clear")
const decimal = document.querySelector(".decimal")
const percentage = document.querySelector(".percentage")

const updateScreen = (number) => {
    calculatorScreen.value = number
}

let prevNumber = ''
let calculationOperator = ''
let currentNumber = 0

const inputNumber = (number) => {
    if (currentNumber == "0") {
        currentNumber = number
    } else {
        currentNumber += number
    }
}
numbers.forEach((number) => {
    number.addEventListener("click",(event)=>{
        inputNumber(event.target.value)
        updateScreen(currentNumber)
    })
})

operators.forEach((operator) => {
    operator.addEventListener("click", (event)=>{
        inputOperator(event.target.value)
        equalSign.disabled = false
    })
})
const inputOperator = (operator) => {
    if (calculationOperator === '') {
        prevNumber = currentNumber
    }
    calculationOperator = operator
    currentNumber = ''
}

const calculate = ()=>{
    let result
    switch (calculationOperator) {
        case "+":
            result = parseFloat(prevNumber) + parseFloat(currentNumber)
            break;
        case "-":
            result = parseFloat(prevNumber) - parseFloat(currentNumber)
            break;
        case "*":
            result = parseFloat(prevNumber) * parseFloat(currentNumber)
            break;
        case "/":
            result = parseFloat(prevNumber) / parseFloat(currentNumber)
            break;
        case "":
            result = parseFloat(currentNumber)
            break;
        default:
            break;
    }
    currentNumber = result
    calculationOperator = ''
}
equalSign.addEventListener('click',()=>{
    if (currentNumber !== '0'){
        calculate()
        updateScreen(currentNumber)
        equalSign.disabled = true
    } else {
        updateScreen('0')
    }
    
})

percentage.addEventListener('click', ()=>{
    updateScreen(currentNumber/100)
})

clearBtn.addEventListener("click",()=>{
    clearAll()
    updateScreen(currentNumber)
    equalSign.disabled = false
})
const clearAll = () => {
    prevNumber = ''
    calculationOperator = ''
    currentNumber = '0'
}

decimal.addEventListener("click", (event)=> {
    inputDecimal(event.target.value)
    updateScreen(currentNumber)
})
const inputDecimal = (dot) => {
    if (currentNumber.includes('.')){
        return
    }
    currentNumber += dot
}
