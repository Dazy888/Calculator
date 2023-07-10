import React from "react"
import { useAppSelector } from "@/hooks/redux"

const InputComponent = () => {
    const value = useAppSelector(state => state.calculatorReducer.value)
    return <input className={'pr-4 rounded-sm text-right text-5xl text-black'} readOnly={true} value={value} />
}

export const ResultInput = React.memo(InputComponent)
