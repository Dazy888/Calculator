import { setIsMemorized, setValue } from "@/store/reducers/CalculatorSlice"
import { AppDispatch } from "@/store/store"

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

    dispatchRes(value: string, dispatch: AppDispatch, isResult?: boolean) {
        this.inpValue = value
        dispatch(setValue(this.inpValue))
        if (isResult !== undefined) this.isResult = isResult
    },

    checkLastZero(key: string, dispatch: AppDispatch) {
        const isLastZero = /^(0)$|(\s0)$/.test(this.inpValue)
        const newValue = `${isLastZero ? this.inpValue.substring(0, this.inpValue.length - 1) : this.inpValue}` + key
        this.dispatchRes(newValue, dispatch)
    },

    checkInpLength() {
        const integers = this.inpValue.match(/\d+/g)
        return integers && integers[0].length >= 10
    },

    countingPow(dispatch: AppDispatch) {
        const matches = this.inpValue.match(/((\d+|\d+\.\d+) (□) (\d+))$/)

        if (matches) {
            const base = Number(matches[2])
            const exponent = Number(matches[4])
            const result = Math.pow(base, exponent)
            this.dispatchRes(this.inpValue.substring(0, this.inpValue.length - matches[0].length) + result, dispatch)
        }
    },

    checkLastPow() {
        return this.expLastPow.test(this.inpValue)
    },

    countingMemory(sign: string) {
        const matchResult = this.expAnyLastNumber.test(this.inpValue) && this.inpValue.match(this.expAnyLastNumber)

        if (matchResult) {
            const expNum = Number(matchResult[0])

            if (sign === '+') {
                this.memoryValue += expNum
            } else {
                this.memoryValue -= expNum
            }
        }
    },

    checkResLength(valueLength: number, res: number, dispatch: AppDispatch) {
        const currentValueLength = this.inpValue.length
        const formattedRes = (res < 1 || !Number.isInteger(res)) ? res.toFixed(2) : Math.round(res)
        this.dispatchRes(this.inpValue.substring(0, currentValueLength - valueLength) + formattedRes, dispatch)
    },

    checkLastNum() {
        return this.inpValue.length === 0 || this.expLastSpace.test(this.inpValue)
    },

    enteringSignKeyboardHelper(sign: string, dispatch: AppDispatch) {
        this.dispatchRes(`${this.inpValue} ${sign} `, dispatch)
    },

    containerListener(e: MouseEvent, dispatch: AppDispatch) {
        const target = e.target as HTMLButtonElement

        if (e.target) {
            if (this.checkInpLength()) return

            const value = target.getAttribute('value')

            if (value && this.isResult) return this.dispatchRes(value, dispatch, false)
            if (value) this.checkLastZero(value, dispatch)
        }
    },

    dotListener(dispatch: AppDispatch) {
        if (this.checkLastPow() || this.isResult) return

        const hasDot = /(\d+\.\d+)$|(\d+\.)$/.test(this.inpValue)
        if (this.expLastNum.test(this.inpValue) && !hasDot) this.dispatchRes(this.inpValue + '.', dispatch)
    },

    saveMemoryHelper(dispatch: AppDispatch) {
        if (this.checkInpLength()) return

        const exp = this.inpValue.match(this.expAnyLastNumber)
        if (exp) this.memoryValue = Number(exp[0])

        dispatch(setIsMemorized(true))
    },

    cleanMemory() {
        this.memoryValue = 0
    },

    readMemory(dispatch: AppDispatch) {
        if (this.memoryValue === 0) return
        this.dispatchRes(this.memoryValue.toString().substring(0, 15), dispatch)
    },

    plusMemory(dispatch: AppDispatch, isMemorized: boolean) {
        if (this.expAnyLastNumber.test(this.inpValue) && !isMemorized) this.saveMemoryHelper(dispatch)
        this.countingMemory('+')
    },

    minusMemory() {
        this.countingMemory('-')
    },

    saveMemory(dispatch: AppDispatch) {
        if (this.expAnyLastNumber.test(this.inpValue)) this.saveMemoryHelper(dispatch)
    },

    signListener(e: MouseEvent, sign: string, dispatch: AppDispatch) {
        if (this.checkInpLength()) return

        if (this.expLastNum.test(this.inpValue) && this.inpValue.length > 0) {
            this.countingPow(dispatch)
            this.dispatchRes(`${this.inpValue} ${sign} `, dispatch, false)
        }
    },

    squareListener(dispatch: AppDispatch) {
        if (this.checkLastPow()) return

        if (this.expPosNum.test(this.inpValue)) {
            const exp = this.inpValue.match(this.expAnyLastNumber)
            if (exp && Number(exp[0]) >= 0) this.checkResLength(exp[0].length, Math.sqrt(Number(exp[0])), dispatch)
        }
    },

    invPropListener(dispatch: AppDispatch) {
        if (this.checkLastPow()) return

        if (this.expPosNum.test(this.inpValue)) {
            const exp = this.inpValue.match(this.expPosNum)
            if (exp) {
                const inverse = 1 / Number(exp[0])
                this.checkResLength(exp[0].length, inverse, dispatch)
            }
        }
    },

    changeSign(dispatch: AppDispatch) {
        if (this.checkLastPow()) return

        if (this.expPosNum.test(this.inpValue)) {
            const exp = this.inpValue.match(this.expAnyLastNumber)

            if (exp) {
                const valueLength = this.inpValue.length
                const expLength = exp[0].length
                const res = Number(exp[0])
                const newValue = (res > 0) ? (res * -1) : Math.abs(res)
                this.dispatchRes(this.inpValue.substring(0, valueLength - expLength) + newValue, dispatch)
            }
        }
    },

    cleanUpInput(dispatch: AppDispatch) {
        this.dispatchRes('', dispatch, false)
    },

    deleteListener(dispatch: AppDispatch) {
        const valueLength = this.inpValue.length

        if (this.isResult) {
            this.dispatchRes('', dispatch, false)
        } else if (this.expLastSpace.test(this.inpValue)) {
            this.dispatchRes(this.inpValue.substring(0, valueLength - 3), dispatch)
        } else if (this.expNegNum.test(this.inpValue)) {
            const exp = this.inpValue.match(this.expNegNum)
            if (exp) this.dispatchRes(this.inpValue.substring(0, valueLength - exp[1].length), dispatch)
        } else {
            this.dispatchRes(this.inpValue.substring(0, valueLength - 1), dispatch)
        }
    },

    fullCleaning(dispatch: AppDispatch) {
        this.cleanUpInput(dispatch)
    },

    equalListener(dispatch: AppDispatch) {
        if (this.inpValue.length === 0 || /^(\d+)$/.test(this.inpValue) || this.expLastSpace.test(this.inpValue)) return

        const numbers = this.inpValue.match(/(\d+\.\d+)|(-\d+\.\d+)|(\d+)|(-\d+)/g)
        const signs = this.inpValue.match(/(- )|[+%*/□]/g)

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
            if (signs && numbers) {
                if (signs.includes('□')) return sortEqualArrays(signs, numbers, '□')
                if (signs.includes('*') && !signs.includes('/') || signs.includes('*') && signs.indexOf('*') < signs.indexOf('/')) return sortEqualArrays(signs, numbers, '*')
                if (signs.includes('/') && !signs.includes('*') || signs.includes('/') && signs.indexOf('/') < signs.indexOf('*')) return sortEqualArrays(signs, numbers, '/')
                if (signs.includes('%') && !signs.includes('*') && !signs.includes('/') || signs.includes('%') && signs.indexOf('%') < signs.indexOf('×') && signs.indexOf('/')) return sortEqualArrays(signs, numbers, '%')
                if (signs.includes('+') && !signs.includes('- ') || signs.includes('+') && signs.indexOf('+') < signs.indexOf('- ')) return sortEqualArrays(signs, numbers, '+')
                if (signs.includes('- ') && !signs.includes('+') || signs.includes('- ') && signs.indexOf('- ') < signs.indexOf('+')) return sortEqualArrays(signs, numbers, '- ')
            }
        }

        if (signs && numbers) {
            for (let i = 0; i <= signs.length + 6; i++) sortHelper()
            setTimeout(() => this.dispatchRes(numbers[0], dispatch, true))
        }
    },

    enteringSignKeyboard(sign: string, dispatch: AppDispatch) {
        this.countingPow(dispatch)
        this.isResult = false
        return this.enteringSignKeyboardHelper(sign, dispatch)
    },

    checkLengthArr() {
        if (this.pressed && this.pressed.length > 0) this.pressed.pop()
    },

    keyDown(e: any, dispatch: any) {
        if (e.key === 'Backspace') this.deleteListener(dispatch)

        if (e.key === '=' || e.key === 'Enter') {
            if (/^(\d+)$/.test(this.inpValue) || this.checkLastNum()) return
            this.equalListener(dispatch)
        }

        if (this.checkInpLength()) return

        if (!this.pressed.includes(e.key)) this.pressed.push(e.key)

        if (/^[0-9]$/.test(e.key)) {
            if (this.isResult) this.dispatchRes(e.key, dispatch, false)
            this.checkLastZero(e.key, dispatch)
        }

        if (this.checkLastNum()) return

        switch (e.key) {
            case '*':
                return this.enteringSignKeyboard('×', dispatch)
            case '+' || '-' || '/' || '%':
                return this.enteringSignKeyboard(e.key, dispatch)
            case '.':
                return this.dotListener(dispatch)
            default:
                break
        }

        if (e.key === '*') return this.enteringSignKeyboard('×', dispatch)
        if (/[+\-\/%]/.test(e.key)) return this.enteringSignKeyboard(e.key, dispatch)
        if (e.key === '.') this.dotListener(dispatch)
    }
}
