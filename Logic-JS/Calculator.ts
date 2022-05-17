// Getting All Elements

// Main Elements
const inp: any = document.querySelector('input')
const cont: any = document.querySelector('.container')
const zero: any = document.querySelector('.zero')

// Memory Buttons
const mc: any = document.querySelector('.mc')
const mr: any = document.querySelector('.mr')
const mp: any = document.querySelector('.mp')
const mm: any = document.querySelector('.mm')
const ms: any = document.querySelector('.ms')
const letterM: any = document.querySelector('.let_m')
let memorySum: number = 0

// Default Operations Elements
const percent: any = document.querySelector('.percent')
const pow: any = document.querySelector('.pow')
const multiply: any = document.querySelector('.multiply')
const minus: any = document.querySelector('.minus')
const plus: any = document.querySelector('.plus')
const divide: any = document.querySelector('.divide')
const dot: any = document.querySelector('.dot-btn')
const equal: any = document.querySelector('.equal')

// Elements For Last Number Operations
const sqrt: any = document.querySelector('.sqrt')
const invprop: any = document.querySelector('.invprop')
const negative: any = document.querySelector('.negative')

// Clear operations variables
const ce: any = document.querySelector('.inp-clear')
const c: any = document.querySelector('.clear')
const del: any = document.querySelector('.delete')


// Helping Functions And Variables
const expAnyLastNumber: any = /(\d+)$|(\d+\.\d+)$|(-\d+)$|(-\d+\.\d+)$/
const expSquare: any = /(□ \d+)$/
const expLastZero: any = /^(0)$|(\s0)$/

function checkInputLength(): boolean { if (inp.value.length >= 17) { return true } }
function checkLastNum(): boolean { return /(\d+)$/.test(inp.value) }
function checkSquare(): boolean { if (expSquare.test(inp.value)) { return true } }


function checkLastZero(e) {
    if (expLastZero.test(inp.value)) { return true }
    inp.value = inp.value + e.target.innerText
}

function countMemory(sign: string) {
    if (checkSquare()) {
        let lastInt = inp.value.match(expAnyLastNumber)
        console.log(lastInt)
        if (sign === '+') {memorySum += parseFloat(lastInt[0])}
        memorySum -= parseFloat(lastInt[0])
    }
}


// Event Listeners

// Main Operations
function enteringNumber(e) {
    checkInputLength()
    if (e.target.classList.contains('num_btn')) { checkLastZero(e) }
}

function enteringZero(e) {
    checkInputLength()
    checkLastZero(e)
}

function enteringDot() {
    checkInputLength()
    if (expSquare.test(inp.value)) { return true }
    if (checkLastNum() && !/(\d+\.\d+)$|(\d+\.)$/.test(inp.value)) { inp.value = inp.value + '.' }
}

cont.onclick = enteringNumber
zero.onclick = enteringZero
dot.onclick = enteringDot

// Memory Buttons
function checkMemory() { if (getComputedStyle(letterM).display === 'none') { letterM.style.display = 'block' } }

function clearMemory() {
    memorySum = 0
    letterM.style.display = 'none'
}

function plusMemory() {
    checkMemory()
    countMemory('+')
}

function minusMemory() {
    checkMemory()
    countMemory('-')
}

function saveMemory() {
    if (getComputedStyle(letterM).display === 'none' && expAnyLastNumber.test(inp.value)) {
        let lastInt = inp.value.match(expAnyLastNumber)
        memorySum = parseFloat(lastInt[0])
        letterM.style.display = 'block'
    }
}

function readMemory() { inp.value = memorySum }

mc.onclick = clearMemory
mr.onclick = readMemory
mp.onclick = plusMemory
mm.onclick = minusMemory
ms.onclick = saveMemory

// Default Operations
function checkLastInt(sign) {
    checkInputLength()

    if (/(\d+)$/.test(inp.value) && inp.value.length > 0) { inp.value = inp.value + ' ' + sign + ' ' }

    if (expSquare.test(inp.value)) {
        let exp: object = inp.value.match(/((\d+|\d+\.\d+) (□) (\d+))$/)
        inp.value = inp.value.substring(0, inp.value.length - exp[0].length) + Math.pow(exp[2], exp[4])
    }
}

percent.onclick = () => {checkLastInt('%')}
pow.onclick = () => {checkLastInt('□')}
divide.onclick = () => {checkLastInt('÷')}
multiply.onclick = () => {checkLastInt('×')}
minus.onclick = () => {checkLastInt('-')}
plus.onclick = () => {checkLastInt('+')}


// Last Numbers Operations
function square() {
    checkInputLength()
    if (expSquare.test(inp.value)) { return true }

    if (/(\d+\.\d+)$|(\d+)$/.test(inp.value)) {
        let sq = inp.value.match(/(\d+)$|(\d+\.\d+)$|(-\d+)$|(-\d+\.\d+)$/);
        if (sq[0] < 0) { return true }
        let sqIntLength = sq[0].length
        inp.value = inp.value.substring(0, inp.value.length - sqIntLength) + Math.sqrt(parseFloat(sq[0]))
    }
}

function invpropFunc() {
    checkInputLength()
    if (expSquare.test(inp.value)) { return true }
    if (/(\d+\.\d+)$|(\d+)$/.test(inp.val())) {
        let prop = inp.value.match(/(\d+\.\d+)$|(\d+)$/)
        let propLength = prop[0].length
        inp.value = inp.value.substring(0, inp.value.length - propLength) + 1 / prop[0]
    }
}

function negativeNum() {
    if (expSquare.test(inp.value)) { return true }
    if (/(\d+)$|(\d+\.\d+)$/.test(inp.value)) {
        let lastNum = inp.value.match(/(\d+)$|(\d+\.\d+)$|(-\d+)$|(-\d+\.\d+)$/)
        if (lastNum[0] > 0) {
            inp.value = inp.value.substring(0, inp.value.length - lastNum[0].length) + (parseFloat(lastNum[0]) * -1)
        } else if (lastNum[0] < 0) {
            inp.value = inp.value.substring(0, inp.val().length - lastNum[0].length) + Math.abs(parseFloat(lastNum[0]))
        }
    }
}

sqrt.onclick = square
invprop.onclick = invpropFunc
negative.onclick = negativeNum


// Clear 0perations
function clearInp() { inp.value = '' }

function clearAll() {
    clearInp()
    if (getComputedStyle(letterM).display === 'block') { clearMemory() }
}

function clearOneSign() {
    if (/(\s)$/.test(inp.value)) { inp.value = inp.value.substring(0, inp.value.length - 2) }

    if (/(-\d+)$/.test(inp.value)) {
        const str = inp.value.match(/(-\d+)$/)
        inp.value = inp.value.substring(0, inp.value.length - str[1].length)
    }

    inp.value = inp.value.substring(0, inp.value.length - 1)
}

ce.onclick = clearInp
c.onclick = clearAll
del.onclick = clearOneSign


// Equal
function equalFunc() {
    if (/(\s)$/.test(inp.value)) { return true }

    if (/'□' \d+/.test(inp.value)) {
        let exp = inp.value.match(/((\d+|\d+\.\d+) (□) (\d+))$/)
        inp.value = inp.value.substring(0, inp.value.length - exp[0].length) + Math.pow(exp[2], exp[4])
    }

    let numbers = inp.value.match(/(\d+\.\d+)|(-\d+\.\d+)|(\d+)|(-\d+)/g)
    let signs = inp.value.match(/[-+%×÷]/g)

    function sortHelper(sign1, sign2, sign3 = null) {
        if (sign3) {
            if (signs.includes(sign1) && !signs.includes(sign2) || signs.includes(sign1) && signs.indexOf(sign1) < signs.indexOf(sign2) < signs.indexOf(sign3)) {
                let index = signs.indexOf(sign1);
                let operationRes: number = 0;

                if (sign1 === '+') {
                    operationRes = parseFloat(numbers[index]) + parseFloat(numbers[index + 1])
                }
                if (sign1 === '-') {
                    operationRes = parseFloat(numbers[index]) - parseFloat(numbers[index + 1])
                }
                if (sign1 === '%') {
                    operationRes = parseFloat(numbers[index]) / 100 * parseFloat(numbers[index + 1])
                }

                numbers.splice(index, 2);
                signs.splice(index, 1);
                numbers.splice(index, 0, operationRes)
                return true;
            }
        }

        if (signs.includes(sign1) && !signs.includes(sign2) || signs.includes(sign1) && signs.indexOf(sign1) < signs.indexOf(sign2)) {
            let index = signs.indexOf(sign1);
            let operationRes = 0;

            if (sign1 === '×') {
                operationRes = parseFloat(numbers[index]) * parseFloat(numbers[index + 1])
            }
            if (sign1 === '÷') {
                operationRes = parseFloat(numbers[index]) / parseFloat(numbers[index + 1])
            }

            numbers.splice(index, 2);
            signs.splice(index, 1);
            numbers.splice(index, 0, operationRes)
        }
    }

    function sort() {
        for (let i = 0; i <= signs.length; i++) {
            sortHelper('×', '÷');
            sortHelper('÷', '×');
            sortHelper('+', '-', '%');
            sortHelper('-', '+', '%');
            sortHelper('%', '+', '-');
        }
    }

    sort();
    inp.value = Math.floor(numbers[0])
}

equal.onclick = equalFunc


// Keyboard code
// function twoKeys(sign) {
//     if (inp.val().length === 0) {
//         return true
//     }
//     if (/(\s)$/.test(inp.val())) {
//         return true
//     }
//
//     if (pressed.includes('Shift') && pressed.includes('+') || pressed.includes('%') || pressed.includes('*')) {
//         inp.val(inp.val() + ' ' + sign + ' ');
//     }
// }
//
// function minusDivide(sign, e) {
//     if (e.key === '-' || e.key === '/') {
//         if (inp.val().length === 0) {
//             return true
//         }
//         if (/(\s)$/.test(inp.val())) {
//             return true
//         }
//         inp.val(inp.val() + ' ' + sign + ' ')
//     }
// }
//
// let pressed = [];
//
// function checkLengthArr() {
//     if (pressed.length > 0) {
//         pressed.length = pressed.length - 1
//     }
// }
//
// function keyDown(e) {
//     if (e.key === 'Backspace') {
//         clearOneSign()
//     }
//     if (inp.val().length >= 17) {
//         return true
//     }
//     if (!pressed.includes(e.key)) {
//         pressed.push(e.key);
//     }
//
//     if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9') {
//         if (/^(0)$|(\s0)$/.test(inp.val())) {
//             return true
//         }
//         inp.val(inp.val() + e.key)
//     }
//
//     if (e.key === '-') {
//         minusDivide('-', e)
//     }
//     if (e.key === '/') {
//         minusDivide('÷', e)
//     }
//     if (e.key === '+') {
//         twoKeys('+')
//     }
//     if (e.key === '%') {
//         twoKeys('%')
//     }
//     if (e.key === '*') {
//         twoKeys('×')
//     }
//     if (e.key === '=') {
//         equal()
//     }
//     if (e.key === '.') {
//         dot()
//     }
// }
//
// document.onkeydown = keyDown
// document.onkeyup = checkLengthArr
