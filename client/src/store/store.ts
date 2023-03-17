import { combineReducers } from "redux"
import { configureStore } from "@reduxjs/toolkit"
import { calculatorReducer } from "@/store/reducers/CalculatorSlice"

const rootReducer = combineReducers({
    calculatorReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
