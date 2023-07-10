import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CalculatorState {
    value: string,
    isMemorized: boolean
}

let initialState: CalculatorState = {
    value: '',
    isMemorized: false
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setValue(state, action: PayloadAction<string>) {
            state.value = action.payload
        },
        setIsMemorized(state, action: PayloadAction<boolean>) {
            state.isMemorized = action.payload
        }
    }
})

export const { setValue, setIsMemorized } = calculatorSlice.actions
export const calculatorReducer = calculatorSlice.reducer
