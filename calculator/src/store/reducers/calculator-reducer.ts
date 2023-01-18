import { InferActionsTypes } from '../store'

let initialState = {
    value: '',
}

type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof calculatorActions>
export const calculatorReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'CALCULATOR/main/SET_VALUE':
            return {
                ...state,
                value: action.value
            }
        default:
            return state
    }
}

export const calculatorActions = {
    setValue: (value: string) => ({type: 'CALCULATOR/main/SET_VALUE', value} as const),
}