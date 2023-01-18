import { combineReducers, createStore } from "redux"
import { calculatorReducer } from "@/store/reducers/calculator-reducer"

let rootReducer = combineReducers({
    calculator: calculatorReducer,
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export default createStore(rootReducer)