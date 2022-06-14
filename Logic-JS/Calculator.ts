
// Getting All Elements
// Main
const container: any = document.querySelector('.container')
const input: any = document.querySelector('.input__result')

// Memory
const mc: any = document.querySelector('.mc')
const mr: any = document.querySelector('.mr')
const mp: any = document.querySelector('.mp')
const mm: any = document.querySelector('.mm')
const ms: any = document.querySelector('.ms')
const letterM: any = document.querySelector('.letter-m')
let memorySum = 0

// Default Operations
const percent: any = document.querySelector('.percent')
const pow: any = document.querySelector('.pow')
const multiply: any = document.querySelector('.multiply')
const minus: any = document.querySelector('.minus')
const plus: any = document.querySelector('.plus')
const divide: any = document.querySelector('.divide')
const dot: any = document.querySelector('.dot-btn')
const equal: any = document.querySelector('.equal')
let isResult = false

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
const expAnyLastNumber = /(\d+)$|(\d+\.\d+)$|(-\d+)$|(-\d+\.\d+)$/
const expLastNum = /(\d+)$/
const expPosNum = /(\d+\.\d+)$|(\d+)$/
const expNegNum = /(-\d+)$/
// Pow Expression
const expLastPow = /(□ \d+)$/
// Space Expression
const expLastSpace = /(\s)$/


// Zero Function
function checkLastZero(value: string, key: string) {
    /^(0)$|(\s0)$/.test(value) ? input.value = value.substring(0, value.length - 1) + key : input.value = value + key
}

// Check Input Length Function
function checkInpLength(value: string): boolean {
    const numbers = value.match(/\d+/g)
    let numbersSum = 0
    if (numbers) {
        for (const number of numbers) {
            numbersSum += number.length
        }
        if (numbersSum >= 10) return true
    }
}

// Pow Functions
function countingPow(value: string) {
    if (expLastPow.test(value)) {
        const exp = value.match(/((\d+|\d+\.\d+) (□) (\d+))$/)
        input.value = value.substring(0, value.length - exp[0].length) + Number(exp[2]) ** Number(exp[4])
    }
}

function checkLastPow(value: string): boolean {
    if (expLastPow.test(value)) return true
}

// Memory Functions
function countingMemory(sign: string, value: string) {
    if (expAnyLastNumber.test(value)) {
        const exp = value.match(expAnyLastNumber)
        const expNum = Number(exp[0])
        sign === '+' ? memorySum += expNum : memorySum -= expNum
    }
}

function saveMemoryHelper(value: string) {
    if (checkInpLength(input.value)) return
    const exp = value.match(expAnyLastNumber)
    memorySum = Number(exp[0])
    letterM.style.display = 'block'
}

// Last Number Operations Function
function checkResLength(valueLength: number, res: number) {
    const currentValueLength = input.value.length
    res < 1 ? input.value = input.value.substring(0, currentValueLength - valueLength) + res.toFixed(3) : input.value = input.value.substring(0, currentValueLength - valueLength) + Math.round(res)
}

// Keyboard Functions
function checkLastNum(value: string): boolean {
    if (value.length === 0 || expLastSpace.test(value)) return true
}

function enteringSignKeyboardHelper(sign: string): boolean {
    input.value = input.value + ' ' + sign + ' '
    isResult = false
    return true
}


// Equal Function
function sortEqualArrays(signs: RegExpMatchArray, numbers: RegExpMatchArray, sign: string) {
    const index = signs.indexOf(sign)
    const firstNum = Number(numbers[index])
    const secondNum = Number(numbers[index + 1])
    let operationRes = 0

    if (sign === '□') operationRes = Math.pow(firstNum, secondNum)
    if (sign === '×') operationRes = firstNum * secondNum
    if (sign === '/') operationRes = firstNum / secondNum
    if (sign === '%') operationRes = firstNum / 100 * secondNum
    if (sign === '+') operationRes = firstNum + secondNum
    if (sign === '- ') operationRes = firstNum - secondNum

    numbers.splice(index, 2)
    signs.splice(index, 1)
    numbers.splice(index, 0, operationRes.toString())
}


// Event Listeners
// Main Operations
container.onclick = (e) => {
    if (checkInpLength(input.value) || isResult) return
    if (e.target.classList.contains('num_btn')) checkLastZero(input.value, e.target.innerText)
}

function enteringDot() {
    if (checkLastPow(input.value) || isResult) return
    if (expLastNum.test(input.value) && !/(\d+\.\d+)$|(\d+\.)$/.test(input.value)) input.value = input.value + '.'
}

dot.onclick = enteringDot

// Memory Buttons
function clearMemory() {
    memorySum = 0
    letterM.style.display = 'none'
}

mp.onclick = () => {
    if (expAnyLastNumber.test(input.value) && getComputedStyle(letterM).display === 'none') saveMemoryHelper(input.value)
    countingMemory('+', input.value)
}

ms.onclick = () => {
    if (expAnyLastNumber.test(input.value)) saveMemoryHelper(input.value)
}

mc.onclick = clearMemory
mr.onclick = () => input.value = memorySum.toString().substring(0, 15)
mm.onclick = () => countingMemory('-', input.value)

// Default Operations
function enteringSign(e, sign: string = null) {
    if (checkInpLength(input.value)) return
    if (expLastNum.test(input.value) && input.value.length > 0) {
        countingPow(input.value)
        const value = input.value
        sign ? input.value = value + ' ' + sign + ' ' : input.value = value + ' ' + e.target.innerText + ' '
        isResult = false
    }
}

percent.onclick = enteringSign
divide.onclick = enteringSign
minus.onclick = enteringSign
plus.onclick = enteringSign
pow.onclick = () => enteringSign(null, '□')
multiply.onclick = () => enteringSign(null, '×')

// Last Numbers Operations
square.onclick = () => {
    if (checkLastPow(input.value)) return
    if (expPosNum.test(input.value)) {
        const exp = input.value.match(expAnyLastNumber)
        if (Number(exp[0]) < 0) return
        checkResLength(exp[0].length, Math.sqrt(Number(exp[0])))
    }
}

invprop.onclick = () => {
    if (checkLastPow(input.value)) return
    if (expPosNum.test(input.value)) {
        const exp = input.value.match(expPosNum)
        checkResLength(exp[0].length, 1 / Number(exp[0]))
    }
}

changeSign.onclick = () => {
    if (checkLastPow(input.value)) return
    if (expPosNum.test(input.value)) {
        const exp = input.value.match(expAnyLastNumber)
        const valueLength = input.value.length
        const expLength = exp[0].length
        const res = Number(exp[0])
        Number(exp[0]) > 0 ? input.value = input.value.substring(0, valueLength - expLength) + (res * -1) : input.value = input.value.substring(0, valueLength - expLength) + Math.abs(res)
    }
}


// Clear Operations
function clearInput() {
    input.value = ''
    isResult = false
}

function clearOneSign() {
    const valueLength = input.value.length
    if (isResult) {
        input.value = ''
        isResult = false
    } else if (expLastSpace.test(input.value)) {
        input.value = input.value.substring(0, valueLength - 3)
    } else if (expNegNum.test(input.value)) {
        const exp: RegExpMatchArray = input.value.match(expNegNum)
        input.value = input.value.substring(0, valueLength - exp[1].length)
    } else {
        input.value = input.value.substring(0, valueLength - 1)
    }
}

ce.onclick = clearInput
c.onclick = () => {
    clearInput()
    if (getComputedStyle(letterM).display === 'block') clearMemory()
}
del.onclick = clearOneSign

// Equal Listener
function equalListener() {
    if (input.value.length === 0 || /^(\d+)$/.test(input.value) || expLastSpace.test(input.value)) return

    const numbers = input.value.match(/(\d+\.\d+)|(-\d+\.\d+)|(\d+)|(-\d+)/g)
    const signs = input.value.match(/(- )|[+%×/□]/g)

    function sortHelper() {
        if (signs.includes('□')) sortEqualArrays(signs, numbers, '□')
        if (signs.includes('×') && !signs.includes('/') || signs.includes('×') && signs.indexOf('×') < signs.indexOf('/')) return sortEqualArrays(signs, numbers, '×')
        if (signs.includes('/') && !signs.includes('×') || signs.includes('/') && signs.indexOf('/') < signs.indexOf('×')) return sortEqualArrays(signs, numbers, '/')
        if (signs.includes('%') && !signs.includes('×') && !signs.includes('/') || signs.includes('%') && signs.indexOf('%') < signs.indexOf('×') && signs.indexOf('/')) return sortEqualArrays(signs, numbers, '%')
        if (signs.includes('+') && !signs.includes('- ') || signs.includes('+') && signs.indexOf('+') < signs.indexOf('- ')) return sortEqualArrays(signs, numbers, '+')
        if (signs.includes('- ') && !signs.includes('+') || signs.includes('- ') && signs.indexOf('- ') < signs.indexOf('+')) return sortEqualArrays(signs, numbers, '- ')
    }

    function sort() {
        for (let i = 0; i <= signs.length + 6; i++) {
            sortHelper()
        }
    }

    sort()
    setTimeout(() => {
        input.value = numbers[0]
        isResult = true
    })
}

equal.onclick = equalListener


// Keyboard
let pressed: any = []

function enteringSignKeyboard(sign: string, value: string) {
    countingPow(value)
    if (pressed.includes('Shift') && pressed.includes('+') || pressed.includes('Shift') && pressed.includes('%') || pressed.includes('Shift') && pressed.includes('*')) {
        return enteringSignKeyboardHelper(sign)
    } else {
        return enteringSignKeyboardHelper(sign)
    }
}

function checkLengthArr() {
    const pressedLength = pressed.length
    if (pressedLength > 0) pressed.length = pressedLength - 1
}

function keyDown(e) {
    if (e.key === 'Backspace') clearOneSign()
    if (e.key === '=' || e.key === 'Enter') {
        if (/^(\d+)$/.test(input.value) || checkLastNum(input.value)) return
        equalListener()
    }

    if (checkInpLength(input.value)) return
    if (!pressed.includes(e.key)) pressed.push(e.key)

    if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9') {
        if (isResult) return
        checkLastZero(input.value, e.key)
    }

    if (checkLastNum(input.value)) return

    if (e.key === '*') return enteringSignKeyboard('×', input.value)
    if (e.key === '+') return enteringSignKeyboard('+', input.value)
    if (e.key === '-') return enteringSignKeyboard('-', input.value)
    if (e.key === '/') return enteringSignKeyboard('/', input.value)
    if (e.key === '+') return enteringSignKeyboard('+', input.value)
    if (e.key === '%') return enteringSignKeyboard('%', input.value)
    if (e.key === '*') return enteringSignKeyboard('×', input.value)

    if (e.key === '.') enteringDot()
}

document.onkeydown = keyDown
document.onkeyup = checkLengthArr