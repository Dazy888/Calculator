// Getting All Elements
// Main
const inp: any = document.querySelector('input')
const cont: any = document.querySelector('.container')
const zero: any = document.querySelector('.zero')

// Memory
const mc: any = document.querySelector('.mc')
const mr: any = document.querySelector('.mr')
const mp: any = document.querySelector('.mp')
const mm: any = document.querySelector('.mm')
const ms: any = document.querySelector('.ms')
const letterM: any = document.querySelector('.let_m')
let memorySum: number = 0

// Default Operations
const percent: any = document.querySelector('.percent')
const pow: any = document.querySelector('.pow')
const multiply: any = document.querySelector('.multiply')
const minus: any = document.querySelector('.minus')
const plus: any = document.querySelector('.plus')
const divide: any = document.querySelector('.divide')
const dot: any = document.querySelector('.dot-btn')
const equal: any = document.querySelector('.equal')

// Last Number Operations
const square: any = document.querySelector('.sqrt')
const invprop: any = document.querySelector('.invprop')
const changeSign: any = document.querySelector('.negative')

// Clearing
const ce: any = document.querySelector('.inp-clear')
const c: any = document.querySelector('.clear')
const del: any = document.querySelector('.delete')


// Helping Functions And Variables
// Number Expressions
const expAnyLastNumber: RegExp = /(\d+)$|(\d+\.\d+)$|(-\d+)$|(-\d+\.\d+)$/
const expLastNum: RegExp = /(\d+)$/
const expPosNum: RegExp = /(\d+\.\d+)$|(\d+)$/
const expNegNum: RegExp = /(-\d+)$/
// Pow Expressions
const expPowStr: RegExp = /((\d+|\d+\.\d+) (□) (\d+))$/
const expPow: RegExp = /(□ \d+)$/
// Space Expression
const expLastSpace: RegExp = /(\s)$/
// Zero Expression
const expLastZero: RegExp = /^(0)$|(\s0)$/

// Zero Function
function checkLastZero(e, value: string) {
    if (expLastZero.test(value)) return true
    inp.value = value + e.target.innerText
}

// Memory Functions
function countingMemory(sign: string, value: string) {
    if (expAnyLastNumber.test(value)) {
        const exp: RegExpMatchArray = value.match(expAnyLastNumber)
        const expNum: number = parseFloat(exp[0])
        if (sign === '+') {
            memorySum += expNum
        } else {
            memorySum -= expNum
        }
    }
}

function saveMemoryHelper(value: string) {
    const exp: RegExpMatchArray = value.match(expAnyLastNumber)
    memorySum = parseFloat(exp[0])
    letterM.style.display = 'block'
}

// Pow Function
function countingPow(value: string) {
    if (expPowStr.test(value)) {
        const exp: RegExpMatchArray = value.match(expPowStr)
        inp.value = value.substring(0, value.length - exp[0].length) + Math.pow(parseInt(exp[2]), parseInt(exp[4]))
    }
}

// Last Number Operations Function
function checkResLength(value: string, res: number) {
    const currentValueLength = inp.value.length
    const valueLength = value.length
    if (res.toString().length >= 2) {
        inp.value = inp.value.substring(0, currentValueLength - valueLength) + res.toFixed(2)
    } else {
        inp.value = inp.value.substring(0, currentValueLength - valueLength) + res
    }
}

// Keyboard Function
function checkLastNum(value: string) {
    if (value.length === 0) return true
    if (expLastSpace.test(value)) return true
}


// Event Listeners
// Main Operations
function enteringNum(e) {
    if (inp.value.length >= 16) return true
    if (e.target.classList.contains('num_btn')) checkLastZero(e, inp.value)
}

function enteringZero(e) {
    if (inp.value.length >= 16) return true
    checkLastZero(e, inp.value)
}

function enteringDot() {
    if (inp.value.length >= 16) return true
    if (expPow.test(inp.value)) return true
    if (expLastNum.test(inp.value) && !/(\d+\.\d+)$|(\d+\.)$/.test(inp.value)) inp.value = inp.value + '.'
}

cont.onclick = enteringNum
zero.onclick = enteringZero
dot.onclick = enteringDot

// Memory Buttons
function clearMemory() {
    memorySum = 0
    letterM.style.display = 'none'
}

function plusMemory() {
    if (expAnyLastNumber.test(inp.value) === true && getComputedStyle(letterM).display === 'none') saveMemoryHelper(inp.value)
    countingMemory('+', inp.value)
}

function minusMemory() {
    countingMemory('-', inp.value)
}

function saveMemory() {
    if (expAnyLastNumber.test(inp.value)) saveMemoryHelper(inp.value)
}

function readMemory() {
    inp.value = Math.round(memorySum * 100) / 100
}

mc.onclick = clearMemory
mr.onclick = readMemory
mp.onclick = plusMemory
mm.onclick = minusMemory
ms.onclick = saveMemory

// Default Operations
function enteringSign(sign: string, value: string) {
    if (inp.value.length >= 16) return true
    countingPow(value)
    if (expLastNum.test(value) && value.length > 0) inp.value = inp.value + ' ' + sign + ' '
}

percent.onclick = () => {
    enteringSign('%', inp.value)
}

pow.onclick = () => {
    enteringSign('□', inp.value)
}

divide.onclick = () => {
    enteringSign('÷', inp.value)
}

multiply.onclick = () => {
    enteringSign('×', inp.value)
}

minus.onclick = () => {
    enteringSign('-', inp.value)
}

plus.onclick = () => {
    enteringSign('+', inp.value)
}

// Last Numbers Operations
function countingSquare() {
    if (expPosNum.test(inp.value)) {
        const exp: RegExpMatchArray = inp.value.match(expAnyLastNumber)
        if (parseInt(exp[0]) < 0) return true
        const res: number = Math.sqrt(parseFloat(exp[0]))
        checkResLength(exp[0], res)
    }
}

function countingInvprop() {
    if (expPosNum.test(inp.value)) {
        const exp: RegExpMatchArray = inp.value.match(expPosNum)
        const res: number = 1 / parseInt(exp[0])
        checkResLength(exp[0], res)
    }
}

function changingSign() {
    if (expPosNum.test(inp.value)) {
        const exp: RegExpMatchArray = inp.value.match(expAnyLastNumber)
        const valueLength = inp.value.length
        const expLength = exp[0].length
        if (parseInt(exp[0]) > 0) {
            inp.value = inp.value.substring(0, valueLength - expLength) + (parseFloat(exp[0]) * -1)
        } else if (parseInt(exp[0]) < 0) {
            inp.value = inp.value.substring(0, valueLength - expLength) + Math.abs(parseFloat(exp[0]))
        }
    }
}

square.onclick = countingSquare
invprop.onclick = countingInvprop
changeSign.onclick = changingSign


// Clear Operations
function clearInp() {
    inp.value = ''
}

function clearAll() {
    clearInp()
    if (getComputedStyle(letterM).display === 'block') clearMemory()
}

function clearOneSign() {
    const valueLength = inp.value.length
    if (expLastSpace.test(inp.value)) inp.value = inp.value.substring(0, valueLength - 2)
    if (expNegNum.test(inp.value)) {
        const exp: RegExpMatchArray = inp.value.match(expNegNum)
        inp.value = inp.value.substring(0, valueLength - exp[1].length)
    }
    inp.value = inp.value.substring(0, valueLength - 1)
}

ce.onclick = clearInp
c.onclick = clearAll
del.onclick = clearOneSign


// Equal Listener
function equalListener() {
    if (expLastSpace.test(inp.value)) return true
    countingPow(inp.value)

    const numbers: RegExpMatchArray = inp.value.match(/(\d+\.\d+)|(-\d+\.\d+)|(\d+)|(-\d+)/g)
    const signs: any = inp.value.match(/[-+%×÷]/g)

    function sortHelper(sign1: string, sign2: string, sign3: string = undefined) {

    }
}



// function sortHelper(sign1: string, sign2: string, sign3: string = undefined) {
//     if (sign3) {
//         if (signs.includes(sign1) && !signs.includes(sign2) || signs.includes(sign1) && signs.indexOf(sign1) < signs.indexOf(sign2) < signs.indexOf(sign3)) {
//             const index: number = signs.indexOf(sign1)
//             let operationRes: number = 0
//
//             if (sign1 === '+') {
//                 operationRes = parseFloat(numbers[index]) + parseFloat(numbers[index + 1])
//             }
//             if (sign1 === '-') {
//                 operationRes = parseFloat(numbers[index]) - parseFloat(numbers[index + 1])
//             }
//             if (sign1 === '%') {
//                 operationRes = parseFloat(numbers[index]) / 100 * parseFloat(numbers[index + 1])
//             }
//
//             numbers.splice(index, 2)
//             signs.splice(index, 1)
//             numbers.splice(index, 0, operationRes.toString())
//             return true
//         }
//     }
//     if (signs.includes(sign1) && !signs.includes(sign2) || signs.includes(sign1) && signs.indexOf(sign1) < signs.indexOf(sign2)) {
//         const index: number = signs.indexOf(sign1)
//         let operationRes: number = 0
//
//         if (sign1 === '×') {
//             operationRes = parseFloat(numbers[index]) * parseFloat(numbers[index + 1])
//         }
//         if (sign1 === '÷') {
//             operationRes = parseFloat(numbers[index]) / parseFloat(numbers[index + 1])
//         }
//
//
//         numbers.splice(index, 2)
//         signs.splice(index, 1)
//         numbers.splice(index, 0, operationRes.toString())
//     }
// }
//
// function sort() {
//     for (let i = 0; i <= signs.length; i++) {
//         sortHelper('×', '÷')
//         sortHelper('÷', '×')
//         sortHelper('+', '-', '%')
//         sortHelper('-', '+', '%')
//         sortHelper('%', '+', '-')
//     }
// }
//
//
// sort()
// inp.value = parseFloat(numbers[0])


equal.onclick = equalListener


// Keyboard
let pressed: any = []

function twoKeys(sign: string, value: string) {
    if (checkLastNum(value)) return true
    if (pressed.includes('Shift') && pressed.includes('+') || pressed.includes('%') || pressed.includes('*')) inp.value = value + ' ' + sign + ' '
}

function minusDivide(e, sign: string, value: string) {
    if (e.key === '-' || e.key === '/') {
        if (checkLastNum(value)) return true
        inp.value = value + ' ' + sign + ' '
    }
}

function checkLengthArr() {
    const pressedLength = pressed.length
    if (pressedLength > 0) pressed.length = pressedLength - 1
}

function keyDown(e) {
    if (inp.value.length >= 16) return true
    if (e.key === 'Backspace') clearOneSign()
    if (!pressed.includes(e.key)) pressed.push(e.key);

    if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9') {
        if (expLastZero.test(inp.value)) return true
        inp.value = inp.value + e.key
    }

    if (e.key === '-') minusDivide(e, '-', inp.value)
    if (e.key === '/') minusDivide(e, '÷', inp.value)
    if (e.key === '+') twoKeys('+', inp.value)
    if (e.key === '%') twoKeys('%', inp.value)
    if (e.key === '*') twoKeys('×', inp.value)
    if (e.key === '=' || e.key === 'Enter') equalListener()
    if (e.key === '.') dot()
}

document.onkeydown = keyDown
document.onkeyup = checkLengthArr