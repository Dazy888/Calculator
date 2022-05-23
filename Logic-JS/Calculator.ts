// Getting All Elements
// Main
const inp: any = document.querySelector('input')
const cont: any = document.querySelector('.container')

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
let isResult: boolean = false

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
// Pow Expression
const expLastPow: RegExp = /(□ \d+)$/
// Space Expression
const expLastSpace: RegExp = /(\s)$/
// Zero Expression
const expLastZero: RegExp = /^(0)$|(\s0)$/


// Zero Function
function checkLastZero(value: string, key: string) {
    expLastZero.test(value) ? inp.value = inp.value.substring(0, value.length - 1) + key : inp.value = value + key
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

// Pow Function
function countingPow(value: string, delay: boolean = null) {
    if (expLastPow.test(value)) {
        const exp: RegExpMatchArray = value.match(/((\d+|\d+\.\d+) (□) (\d+))$/)
        if (delay) {
            setTimeout(() => {
                inp.value = value.substring(0, value.length - exp[0].length) + Math.pow(parseFloat(exp[2]), parseInt(exp[4]))
            }, 10)
        } else {
            inp.value = value.substring(0, value.length - exp[0].length) + Math.pow(parseFloat(exp[2]), parseInt(exp[4]))
        }
    }
}

// Memory Functions
function countingMemory(sign: string, value: string) {
    if (expAnyLastNumber.test(value)) {
        const exp: RegExpMatchArray = value.match(expAnyLastNumber)
        const expNum: number = parseFloat(exp[0])
        sign === '+' ? memorySum += expNum : memorySum -= expNum
    }
}

function saveMemoryHelper(value: string) {
    if (value.length >= 15) return
    const exp: RegExpMatchArray = value.match(expAnyLastNumber)
    memorySum = parseFloat(exp[0])
    letterM.style.display = 'block'
}

// Last Number Operations Function
function checkResLength(valueLength: number, res: number) {
    const currentValueLength: number = inp.value.length
    res < 1 ? inp.value = inp.value.substring(0, currentValueLength - valueLength) + res.toFixed(3) : inp.value = inp.value.substring(0, currentValueLength - valueLength) + Math.round(res)
}
function defaultChecks(value: string): boolean {
    if (expLastPow.test(value)) return true
    if (isResult) return true
}

// Keyboard Function
function checkLastNum(value: string): boolean {
    if (value.length === 0) return true
    if (expLastSpace.test(value)) return true
}

// Equal Function
function sortEqualArrays(signs: RegExpMatchArray, numbers: RegExpMatchArray, sign: string) {
    const index: number = signs.indexOf(sign)
    let operationRes: number = 0

    if (sign === '×') operationRes = parseFloat(numbers[index]) * parseFloat(numbers[index + 1])
    if (sign === '/') operationRes = parseFloat(numbers[index]) / parseFloat(numbers[index + 1])
    if (sign === '%') operationRes = parseFloat(numbers[index]) / 100 * parseFloat(numbers[index + 1])
    if (sign === '+') operationRes = parseFloat(numbers[index]) + parseFloat(numbers[index + 1])
    if (sign === '-') operationRes = parseFloat(numbers[index]) - parseFloat(numbers[index + 1])

    numbers.splice(index, 2)
    signs.splice(index, 1)
    numbers.splice(index, 0, operationRes.toString())
}


// Event Listeners
// Main Operations
function enteringNum(e) {
    if (checkInpLength(inp.value)) return
    if (isResult) return
    if (e.target.classList.contains('num_btn')) checkLastZero(inp.value, e.target.innerText)
}

function enteringDot() {
    if (defaultChecks(inp.value)) return
    if (expLastNum.test(inp.value) && !/(\d+\.\d+)$|(\d+\.)$/.test(inp.value)) inp.value = inp.value + '.'
}

cont.onclick = enteringNum
dot.onclick = enteringDot

// Memory Buttons
function clearMemory() {
    memorySum = 0
    letterM.style.display = 'none'
}

function plusMemory() {
    if (expAnyLastNumber.test(inp.value) && getComputedStyle(letterM).display === 'none') saveMemoryHelper(inp.value)
    countingMemory('+', inp.value)
}

function minusMemory() {
    countingMemory('-', inp.value)
}

function saveMemory() {
    if (expAnyLastNumber.test(inp.value)) saveMemoryHelper(inp.value)
}

function readMemory() {
    inp.value = memorySum.toString().substring(0, 15)
}

mc.onclick = clearMemory
mr.onclick = readMemory
mp.onclick = plusMemory
mm.onclick = minusMemory
ms.onclick = saveMemory

// Default Operations
function enteringSign(e = null, sign: string = null) {
    if (checkInpLength(inp.value)) return
    if (expLastNum.test(inp.value) && inp.value.length > 0) {
        countingPow(inp.value)
        sign ? inp.value = inp.value + ' ' + sign + ' ' : inp.value = inp.value + ' ' + e.target.innerText + ' '
    }
}

percent.onclick = enteringSign
divide.onclick = enteringSign
minus.onclick = enteringSign
plus.onclick = enteringSign
pow.onclick = () => {
    enteringSign( null, '□',)
}
multiply.onclick = () => {
    enteringSign(null, '×')
}

// Last Numbers Operations
function countingSquare() {
    if (defaultChecks(inp.value)) return
    if (expPosNum.test(inp.value)) {
        const exp: RegExpMatchArray = inp.value.match(expAnyLastNumber)
        if (parseInt(exp[0]) < 0) return
        checkResLength(exp[0].length, Math.sqrt(parseFloat(exp[0])))
    }
}

function countingInvprop() {
    if (defaultChecks(inp.value)) return
    if (expPosNum.test(inp.value)) {
        const exp: RegExpMatchArray = inp.value.match(expPosNum)
        checkResLength(exp[0].length, 1 / parseFloat(exp[0]))
    }
}

function changingSign() {
    if (defaultChecks(inp.value)) return
    if (expPosNum.test(inp.value)) {
        const exp: RegExpMatchArray = inp.value.match(expAnyLastNumber)
        const valueLength: number = inp.value.length
        const expLength: number = exp[0].length
        const res: number = parseFloat(exp[0])

        if (parseFloat(exp[0]) > 0) {
            inp.value = inp.value.substring(0, valueLength - expLength) + (res * -1)
        } else if (parseFloat(exp[0]) < 0) {
            inp.value = inp.value.substring(0, valueLength - expLength) + Math.abs(res)
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
    const valueLength: number = inp.value.length
    if (isResult) {
        clearInp()
        isResult = false
    } else if (expLastSpace.test(inp.value)) {
        inp.value = inp.value.substring(0, valueLength - 3)
    } else if (expNegNum.test(inp.value)) {
        const exp: RegExpMatchArray = inp.value.match(expNegNum)
        inp.value = inp.value.substring(0, valueLength - exp[1].length)
    } else {
        inp.value = inp.value.substring(0, valueLength - 1)
    }
}

ce.onclick = clearInp
c.onclick = clearAll
del.onclick = clearOneSign


// Equal Listener
function equalListener() {
    if (inp.value.length === 0 || /^(\d+)$/.test(inp.value) || expLastSpace.test(inp.value)) return
    if (/^((\d+|\d+\.\d+) (□) (\d+))$/.test(inp.value)) {
        countingPow(inp.value, true)
        return
    }
    countingPow(inp.value)

    const numbers: RegExpMatchArray = inp.value.match(/(\d+\.\d+)|(-\d+\.\d+)|(\d+)|(-\d+)/g)
    const signs: any = inp.value.match(/[-+%×/]/g)

    function sortHelper() {
        if (signs.includes('×') && !signs.includes('/') || signs.includes('×') && signs.indexOf('×') < signs.indexOf('/')) return sortEqualArrays(signs, numbers, '×')
        if (signs.includes('/') && !signs.includes('×') || signs.includes('/') && signs.indexOf('/') < signs.indexOf('×')) return sortEqualArrays(signs, numbers, '/')
        if (signs.includes('%') && !signs.includes('×') && !signs.includes('/') || signs.includes('%') && signs.indexOf('%') < signs.indexOf('×') && signs.indexOf('/')) return sortEqualArrays(signs, numbers, '%')
        if (signs.includes('+') && !signs.includes('-') || signs.includes('+') && signs.indexOf('+') < signs.indexOf('-')) return sortEqualArrays(signs, numbers, '+')
        if (signs.includes('-') && !signs.includes('+') || signs.includes('-') && signs.indexOf('-') < signs.indexOf('+')) return sortEqualArrays(signs, numbers, '-')
    }

    function sort() {
        for (let i = 0; i <= signs.length + 6; i++) {
            sortHelper()
        }
    }

    sort()
    setTimeout(() => {
        inp.value = numbers[0]
    }, 10)
    isResult = true
}

equal.onclick = equalListener


// Keyboard
let pressed: any = []

function twoKeys(sign: string, value: string) {
    countingPow(inp.value)
    if (pressed.includes('Shift') && pressed.includes('+') || pressed.includes('%') || pressed.includes('*')) inp.value = value + ' ' + sign + ' '
}

function oneKey(sign: string, value: string) {
    countingPow(value)
    inp.value = inp.value + ' ' + sign + ' '
}

function checkLengthArr() {
    const pressedLength = pressed.length
    if (pressedLength > 0) pressed.length = pressedLength - 1
}

function keyDown(e) {
    if (e.key === 'Backspace') clearOneSign()
    if (e.key === '=' || e.key === 'Enter') {
        if (/^(\d+)$/.test(inp.value) || checkLastNum(inp.value)) return
        equalListener()
    }

    if (checkInpLength(inp.value)) return
    if (!pressed.includes(e.key)) pressed.push(e.key)

    if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9') {
        if (isResult) return
        checkLastZero(inp.value, e.key)
    }

    if (checkLastNum(inp.value)) return

    if (e.key === '*') oneKey('×', inp.value)
    if (e.key === '+') oneKey('+', inp.value)
    if (e.key === '-') oneKey('-', inp.value)
    if (e.key === '/') oneKey('/', inp.value)
    if (e.key === '+') twoKeys('+', inp.value)
    if (e.key === '%') twoKeys('%', inp.value)
    if (e.key === '*') twoKeys('×', inp.value)
    if (e.key === '.') enteringDot()
}

document.onkeydown = keyDown
document.onkeyup = checkLengthArr