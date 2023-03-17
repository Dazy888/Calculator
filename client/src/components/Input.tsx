import React from "react"
import { useAppSelector } from "@/hooks/redux"

const InputComponent = () => {
    const { value } = useAppSelector(state => state.calculatorReducer)
    return <input className={'pr-4 rounded-sm text-right text-5xl'} readOnly={true} value={value} />
}

export const Input = React.memo(InputComponent)
