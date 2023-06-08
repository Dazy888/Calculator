import { setValue } from "@/store/reducers/CalculatorSlice"

export const Calculator = {
    expAnyLastNumber : /(\d+)$|(\d+\.\d+)$|(-\d+)$|(-\d+\.\d+)$/,
    expLastNum : /(\d+)$/,
    expPosNum : /(\d+\.\d+)$|(\d+)$/,
    expNegNum : /(-\d+)$/,
    expLastPow : /(□ \d+)$/,
    expLastSpace : /(\s)$/,
    memoryValue : 0,
    inpValue : '',
    isResult : false,
    pressed : [''],

    dispatchRes(value: string, dispatch: any, isResult?: boolean) {
        this.inpValue = value
        dispatch(setValue(this.inpValue))
        if (isResult !== undefined) this.isResult = isResult
    },

    checkLastZero(key: string, dispatch: any) {
        if (/^(0)$|(\s0)$/.test(this.inpValue)) {
            this.dispatchRes(this.inpValue.substring(0, this.inpValue.length - 1) + key, dispatch)
        } else {
            this.dispatchRes(this.inpValue + key, dispatch)
        }
    },

    checkInpLength(): true | void {
        const integers: any = this.inpValue.match(/\d+/g)
        if (integers && integers[0].length >= 10) return true
    },

    countingPow(dispatch: any) {
        if (this.expLastPow.test(this.inpValue)) {
            const exp: any = this.inpValue.match(/((\d+|\d+\.\d+) (□) (\d+))$/)
            this.dispatchRes(this.inpValue.substring(0, this.inpValue.length - exp[0].length) + Number(exp[2]) ** Number(exp[4]), dispatch)
        }
    },

    checkLastPow(): true | void {
        if (this.expLastPow.test(this.inpValue)) return true
    },

    countingMemory(sign: string) {
        if (this.expAnyLastNumber.test(this.inpValue)) {
            const exp: any = this.inpValue.match(this.expAnyLastNumber)
            const expNum = Number(exp[0])
            if (sign === '+') {
                this.memoryValue += expNum
            } else {
                this.memoryValue -= expNum
            }
        }
    },

    saveMemoryHelper(letterM: any) {
        if (this.checkInpLength()) return
        const exp: any = this.inpValue.match(this.expAnyLastNumber)
        this.memoryValue = Number(exp[0])
        letterM.style.display = 'block'
    },

    checkResLength(valueLength: number, res: number, dispatch: any) {
        const currentValueLength = this.inpValue.length
        if (res < 1 || !Number.isInteger(res)) {
            this.dispatchRes(this.inpValue.substring(0, currentValueLength - valueLength) + res.toFixed(2), dispatch)
        } else {
            this.dispatchRes(this.inpValue.substring(0, currentValueLength - valueLength) + Math.round(res), dispatch)
        }
    },

    checkLastNum(): true | void {
        if (this.inpValue.length === 0 || this.expLastSpace.test(this.inpValue)) return true
    },

    enteringSignKeyboardHelper(sign: string, dispatch: any): boolean {
        this.dispatchRes(this.inpValue + ' ' + sign + ' ', dispatch)
        return true
    },

    containerListener(e: any, dispatch: any) {
        if (this.checkInpLength()) return
        const value = e.target.getAttribute('value')
        if (value && this.isResult) return this.dispatchRes(value, dispatch, false)
        if (value) this.checkLastZero(value, dispatch)
    },

    dotListener(dispatch: any) {
        if (this.checkLastPow() || this.isResult) return
        if (this.expLastNum.test(this.inpValue) && !/(\d+\.\d+)$|(\d+\.)$/.test(this.inpValue)) this.dispatchRes(this.inpValue + '.', dispatch)
    },

    cleanMemory(letterM: any) {
        this.memoryValue = 0
        letterM.style.display = 'none'
    },

    plusMemory(letterM: any) {
        if (this.expAnyLastNumber.test(this.inpValue) && getComputedStyle(letterM).display === 'none') this.saveMemoryHelper(letterM)
        this.countingMemory('+')
    },

    minusMemory() {
        this.countingMemory('-')
    },

    readMemory(dispatch: any) {
        if (this.memoryValue === 0) return
        this.dispatchRes(this.memoryValue.toString().substring(0, 15), dispatch)
    },

    saveMemory(letterM: any) {
        if (this.expAnyLastNumber.test(this.inpValue)) this.saveMemoryHelper(letterM)
    },

    signListener(e: any, sign: string, dispatch: any) {
        if (this.checkInpLength()) return
        if (this.expLastNum.test(this.inpValue) && this.inpValue.length > 0) {
            this.countingPow(dispatch)
            this.dispatchRes(this.inpValue + ' ' + sign + ' ', dispatch, false)
        }
    },

    squareListener(dispatch: any) {
        if (this.checkLastPow()) return
        if (this.expPosNum.test(this.inpValue)) {
            const exp: any = this.inpValue.match(this.expAnyLastNumber)
            if (Number(exp[0]) < 0) return
            this.checkResLength(exp[0].length, Math.sqrt(Number(exp[0])), dispatch)
        }
    },

    invPropListener(dispatch: any) {
        if (this.checkLastPow()) return
        if (this.expPosNum.test(this.inpValue)) {
            const exp: any = this.inpValue.match(this.expPosNum)
            this.checkResLength(exp[0].length, 1 / Number(exp[0]), dispatch)
        }
    },

    changeSign(dispatch: any) {
        if (this.checkLastPow()) return
        if (this.expPosNum.test(this.inpValue)) {
            const exp: any = this.inpValue.match(this.expAnyLastNumber)
            const valueLength = this.inpValue.length
            const expLength = exp[0].length
            const res = Number(exp[0])
            if (Number(exp[0]) > 0 ) {
                this.dispatchRes(this.inpValue.substring(0, valueLength - expLength) + (res * -1), dispatch)
            } else {
                this.dispatchRes(this.inpValue.substring(0, valueLength - expLength) + Math.abs(res), dispatch)
            }
        }
    },

    cleanUpInput(dispatch: any) {
        this.dispatchRes('', dispatch, false)
    },

    deleteListener(dispatch: any) {
        const valueLength = this.inpValue.length
        if (this.isResult) {
            this.dispatchRes('', dispatch, false)
        } else if (this.expLastSpace.test(this.inpValue)) {
            this.dispatchRes(this.inpValue.substring(0, valueLength - 3), dispatch)
        } else if (this.expNegNum.test(this.inpValue)) {
            const exp: any = this.inpValue.match(this.expNegNum)
            this.dispatchRes(this.inpValue.substring(0, valueLength - exp[1].length), dispatch)
        } else {
            this.dispatchRes(this.inpValue.substring(0, valueLength - 1), dispatch)
        }
    },

    fullCleaning(letterM: any, dispatch: any) {
        this.cleanUpInput(dispatch)
        if (getComputedStyle(letterM).display === 'block') this.cleanMemory(letterM)
    },

    equalListener(dispatch: any) {
        if (this.inpValue.length === 0 || /^(\d+)$/.test(this.inpValue) || this.expLastSpace.test(this.inpValue)) return

        const numbers: any = this.inpValue.match(/(\d+\.\d+)|(-\d+\.\d+)|(\d+)|(-\d+)/g)
        const signs: any = this.inpValue.match(/(- )|[+%*/□]/g)

        function sortEqualArrays(signs: RegExpMatchArray, numbers: RegExpMatchArray, sign: string) {
            const index = signs.indexOf(sign)
            const firstNum = Number(numbers[index])
            const secondNum = Number(numbers[index + 1])
            let operationRes = 0

            if (sign === '□') operationRes = Math.pow(firstNum, secondNum)
            if (sign === '*') operationRes = firstNum * secondNum
            if (sign === '/') operationRes = firstNum / secondNum
            if (sign === '%') operationRes = firstNum / 100 * secondNum
            if (sign === '+') operationRes = firstNum + secondNum
            if (sign === '- ') operationRes = firstNum - secondNum

            numbers.splice(index, 2)
            signs.splice(index, 1)
            numbers.splice(index, 0, operationRes.toString())
        }

        function sortHelper() {
            if (signs.includes('□')) return sortEqualArrays(signs, numbers, '□')
            if (signs.includes('*') && !signs.includes('/') || signs.includes('*') && signs.indexOf('*') < signs.indexOf('/')) return sortEqualArrays(signs, numbers, '*')
            if (signs.includes('/') && !signs.includes('*') || signs.includes('/') && signs.indexOf('/') < signs.indexOf('*')) return sortEqualArrays(signs, numbers, '/')
            if (signs.includes('%') && !signs.includes('*') && !signs.includes('/') || signs.includes('%') && signs.indexOf('%') < signs.indexOf('×') && signs.indexOf('/')) return sortEqualArrays(signs, numbers, '%')
            if (signs.includes('+') && !signs.includes('- ') || signs.includes('+') && signs.indexOf('+') < signs.indexOf('- ')) return sortEqualArrays(signs, numbers, '+')
            if (signs.includes('- ') && !signs.includes('+') || signs.includes('- ') && signs.indexOf('- ') < signs.indexOf('+')) return sortEqualArrays(signs, numbers, '- ')
        }

        for (let i = 0; i <= signs.length + 6; i++) sortHelper()
        setTimeout(() => {
            this.dispatchRes(numbers[0], dispatch, true)
        })
    },

    enteringSignKeyboard(sign: string, dispatch: any) {
        this.countingPow(dispatch)
        this.isResult = false
        if (this.pressed.includes('Shift') && this.pressed.includes('+') || this.pressed.includes('Shift') && this.pressed.includes('%') || this.pressed.includes('Shift') && this.pressed.includes('*')) {
            return this.enteringSignKeyboardHelper(sign, dispatch)
        } else {
            return this.enteringSignKeyboardHelper(sign, dispatch)
        }
    },

    checkLengthArr() {
        if (this.pressed) {
            const pressedLength = this.pressed.length
            if (pressedLength > 0) this.pressed.length = pressedLength - 1
        }
    },

    keyDown(e: any, dispatch: any) {
        if (e.key === 'Backspace') this.deleteListener(dispatch)
        if (e.key === '=' || e.key === 'Enter') {
            if (/^(\d+)$/.test(this.inpValue) || this.checkLastNum()) return
            this.equalListener(dispatch)
        }

        if (this.checkInpLength()) return
        if (!this.pressed.includes(e.key)) this.pressed.push(e.key)

        if (e.key === '0' || e.key === '1' || e.key === '2' || e.key === '3' || e.key === '4' || e.key === '5' || e.key === '6' || e.key === '7' || e.key === '8' || e.key === '9') {
            if (this.isResult) this.dispatchRes(e.key, dispatch, false)
            this.checkLastZero(e.key, dispatch)
        }

        if (this.checkLastNum()) return

        if (e.key === '*') return this.enteringSignKeyboard('×', dispatch)
        if (e.key === '+') return this.enteringSignKeyboard('+', dispatch)
        if (e.key === '-') return this.enteringSignKeyboard('-', dispatch)
        if (e.key === '/') return this.enteringSignKeyboard('/', dispatch)
        if (e.key === '+') return this.enteringSignKeyboard('+', dispatch)
        if (e.key === '%') return this.enteringSignKeyboard('%', dispatch)
        if (e.key === '.') this.dotListener(dispatch)
    }
}
