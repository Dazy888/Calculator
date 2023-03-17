import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CalculatorState {
    value: string
}

let initialState: CalculatorState = {
    value: '',
}

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setValue(state, action: PayloadAction<string>) {
            state.value = action.payload
        }
    }
})

export const { setValue } = calculatorSlice.actions
export const calculatorReducer = calculatorSlice.reducer
